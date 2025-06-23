import { debounce } from 'lodash-es';

export default {
  mounted(el: HTMLElement, binding: any) {
    const { value, arg, modifiers } = binding;

    // 指令值必须是函数
    if (typeof value !== 'function') {
      console.error(`v-debounce 指令的值必须是函数`);
      return;
    }

    // 指令参数必须是数字
    const delay = parseInt(arg) || 1500;
    const options = {
      leading: !modifiers.trailing,
      trailing: !modifiers.leading,
      maxWait: modifiers.immediate ? delay : undefined,
    };

    // 绑定防抖函数
    const debounceFn = debounce(value, delay, options);
    el.addEventListener('click', debounceFn);

    // 解绑事件
    el._vueDebounce_ = {
      handler: debounceFn,
      eventType: 'click',
    };
  },
  unmounted(el) {
    if (el._vueDebounce_) {
      const { handler, eventType } = el._vueDebounce_;
      el.removeEventListener(eventType, handler);
      handler.cancel();
      delete el._vueDebounce_;
    }
  },
};
