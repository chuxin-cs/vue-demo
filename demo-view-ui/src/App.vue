<template>
  <div>
    <Table row-key="id" :columns="columns16" :data="data12" border></Table>

    <VirtualTable :columns="columns16" :data="data12" :row-height="48" :fixed="'left'"
      @expand-change="handleExpandChange">
      <!-- 自定义列内容 -->
      <template #name="{ row }">
        <span v-if="row.hasChildren" class="expand-icon" :class="{ 'expanded': row.expanded }"
          @click.stop="toggleRow(row)">
          {{ row.expanded ? '−' : '+' }}
        </span>
        <span>{{ row.name }}</span>
      </template>
    </VirtualTable>
  </div>
</template>

<script>
import { columns16, data12 } from "./data.js"
import VirtualTable from "./components/scroll/index.vue"

export default {
  components: {
    VirtualTable
  },
  data() {
    return {
      columns16: Object.freeze(columns16),
      data12: Object.freeze(data12)
    }
  },
  methods: {
    toggleRow(row) {
      this.$refs.virtualTable.toggleRow(row);
    },
    handleExpandChange(row, expanded) {
      console.log('Row expanded:', row, expanded);
    }
  }
}
</script>
