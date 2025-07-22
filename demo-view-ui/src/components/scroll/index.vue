<template>
  <div class="virtual-table-container">
    <!-- View UI表格组件（仅用于渲染表头） -->
    <Table 
      ref="tableRef"
      :columns="columns" 
      :data="[]" 
      border
      :header-row-style="headerStyle"
    />
    
    <!-- 虚拟滚动区域 -->
    <RecycleScroller
      class="virtual-list"
      :items="flattenedData"
      :item-size="rowHeight"
      key-field="id"
    >
      <template #item="{ item }">
        <div class="virtual-table-row" :style="getRowStyle(item)">
          <!-- 动态生成表格单元格 -->
          <div 
            v-for="column in visibleColumns" 
            :key="column.key"
            :class="['virtual-table-cell', column.align ? `text-${column.align}` : '']"
            :style="getColumnStyle(column, item.level)"
          >
            <!-- 使用插槽或原始内容 -->
            <slot 
              :name="column.key" 
              :row="item" 
              :column="column"
            >
              {{ item[column.key] }}
            </slot>
          </div>
        </div>
      </template>
    </RecycleScroller>
  </div>
</template>

<script>
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { flattenTreeData } from '../../utils'; // 复用之前的树形数据处理工具

export default {
  name: 'VirtualTable',
  components: { RecycleScroller },
  
  props: {
    // 表格列配置
    columns: {
      type: Array,
      required: true
    },
    // 表格数据
    data: {
      type: Array,
      required: true
    },
    // 行高（像素）
    rowHeight: {
      type: Number,
      default: 40
    },
    // 固定列配置
    fixed: {
      type: [String, Boolean],
      default: false
    },
    // 缩进大小（树形表格）
    indentSize: {
      type: Number,
      default: 20
    }
  },
  
  data() {
    return {
      flattenedData: [], // 扁平化后的表格数据
      visibleColumns: [], // 可见列配置
      expandedRowIds: new Set(), // 展开的行ID集合
      tableWidth: 0, // 表格宽度
      scrollLeft: 0 // 滚动位置
    };
  },
  
  computed: {
    // 表头样式
    headerStyle() {
      return {
        height: `${this.rowHeight}px`
      };
    },
    
    // 固定列配置
    fixedLeftColumns() {
      return this.columns.filter(col => col.fixed === 'left' || col.fixed === true);
    },
    
    fixedRightColumns() {
      return this.columns.filter(col => col.fixed === 'right');
    },
    
    scrollableColumns() {
      return this.columns.filter(col => !col.fixed);
    }
  },
  
  watch: {
    // 监听数据变化，更新扁平化数据
    data: {
      handler() {
        this.updateFlattenedData();
      },
      deep: true
    },
    
    // 监听展开状态变化
    expandedRowIds() {
      this.updateFlattenedData();
    }
  },
  
  created() {
    this.updateFlattenedData();
    this.visibleColumns = [...this.columns];
  },
  
  mounted() {
    // 计算表格宽度
    this.$nextTick(() => {
      this.tableWidth = this.$refs.tableRef.$el.offsetWidth;
    });
    
    // 监听窗口大小变化
    window.addEventListener('resize', this.handleResize);
  },
  
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  
  methods: {
    // 更新扁平化数据
    updateFlattenedData() {
      this.flattenedData = flattenTreeData(this.data, 0, this.expandedRowIds);
    },
    
    // 获取行样式
    getRowStyle(row) {
      return {
        height: `${this.rowHeight}px`,
        display: 'flex',
        borderBottom: '1px solid #e8e8e8',
        backgroundColor: row._level % 2 === 0 ? '#fff' : '#fafafa'
      };
    },
    
    // 获取单元格样式
    getColumnStyle(column, level = 0) {
      const style = {
        flex: column.width ? `0 0 ${column.width}px` : '1',
        padding: '0 16px',
        boxSizing: 'border-box',
        borderRight: '1px solid #e8e8e8',
        display: 'flex',
        alignItems: 'center'
      };
      
      // 树形表格缩进
      if (column.key === 'name' && level > 0) {
        style.paddingLeft = `${level * this.indentSize + 16}px`;
      }
      
      // 固定列样式
      if (column.fixed === 'left') {
        style.position = 'sticky';
        style.left = `${this.getLeftOffset(column)}px`;
        style.zIndex = 1;
        style.backgroundColor = '#fff';
      }
      
      if (column.fixed === 'right') {
        style.position = 'sticky';
        style.right = `${this.getRightOffset(column)}px`;
        style.zIndex = 1;
        style.backgroundColor = '#fff';
      }
      
      return style;
    },
    
    // 计算左侧固定列偏移量
    getLeftOffset(column) {
      const index = this.fixedLeftColumns.indexOf(column);
      return this.fixedLeftColumns.slice(0, index).reduce((sum, col) => sum + (col.width || 100), 0);
    },
    
    // 计算右侧固定列偏移量
    getRightOffset(column) {
      const index = this.fixedRightColumns.indexOf(column);
      const rightColumns = [...this.fixedRightColumns].reverse();
      return rightColumns.slice(0, rightColumns.length - index - 1).reduce((sum, col) => sum + (col.width || 100), 0);
    },
    
    // 处理窗口大小变化
    handleResize() {
      this.tableWidth = this.$refs.tableRef.$el.offsetWidth;
    },
    
    // 处理行展开/折叠
    toggleRow(row) {
      if (!row.hasChildren) return;
      
      if (this.expandedRowIds.has(row.id)) {
        this.expandedRowIds.delete(row.id);
      } else {
        this.expandedRowIds.add(row.id);
      }
      
      // 触发展开/折叠事件
      this.$emit('expand-change', row, this.expandedRowIds.has(row.id));
    },
    
    // 处理滚动事件（用于固定列）
    handleScroll(event) {
      this.scrollLeft = event.target.scrollLeft;
    }
  }
};
</script>

<style scoped>
.virtual-table-container {
  height: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid #e8e8e8;
}

.virtual-list {
  flex: 1;
  overflow-y: auto;
  position: relative;
}

.virtual-table-row {
  width: 100%;
}

.virtual-table-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 滚动条样式优化 */
.virtual-list::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.virtual-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.virtual-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.virtual-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>