// 从 lodash-es 模块中导入防抖函数
import { debounce } from 'lodash-es';

/**
 * 自定义指令对象，用于实现防抖功能
 * <button v-debounce:2000.leading="submit">提交</button>
 */
export default {
  /**
   * 当指令绑定到元素并插入到 DOM 中时调用
   * @param el - 指令绑定的元素
   * @param binding - 包含指令相关信息的对象
   */
  mounted(el: HTMLElement, binding: any) {
    // 从 binding 中解构出指令的值、参数和修饰符
    const { value, arg, modifiers } = binding;

    // 指令值必须是函数
    if (typeof value !== 'function') {
      console.error(`v-debounce 指令的值必须是函数`);
      return;
    }

    // 解析指令参数为数字作为防抖延迟时间，如果解析失败则使用默认值 1500 毫秒
    const delay = parseInt(arg) || 1500;
    // 配置防抖函数的选项
    const options = {
      // 如果没有 trailing 修饰符，则在事件触发时立即执行函数
      leading: !modifiers.trailing,
      // 如果没有 leading 修饰符，则在事件停止触发后执行函数
      trailing: !modifiers.leading,
      // 如果有 immediate 修饰符，则设置最大等待时间为延迟时间
      maxWait: modifiers.immediate ? delay : undefined,
    };

    // 创建防抖函数
    const debounceFn = debounce(value, delay, options);
    // 给元素添加点击事件监听器，触发防抖函数
    el.addEventListener('click', debounceFn);

    // 将防抖函数和事件类型存储在元素的自定义属性中，方便后续解绑事件
    el._vueDebounce_ = {
      handler: debounceFn,
      eventType: 'click',
    };
  },
  /**
   * 当指令绑定的元素从 DOM 中移除时调用
   * @param el - 指令绑定的元素
   */
  unmounted(el) {
    // 检查元素是否存在自定义属性 _vueDebounce_
    if (el._vueDebounce_) {
      // 从自定义属性中解构出事件处理函数和事件类型
      const { handler, eventType } = el._vueDebounce_;
      // 移除元素的事件监听器
      el.removeEventListener(eventType, handler);
      // 取消防抖函数的执行
      handler.cancel();
      // 删除元素的自定义属性
      delete el._vueDebounce_;
    }
  },
};
