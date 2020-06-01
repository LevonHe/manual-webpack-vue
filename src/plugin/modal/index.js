/**
 * 全局弹窗组件
 * @title 弹窗的标题，传国际化处理后的字符串
 * @component 弹窗中要打开的组件，普通的vue组件
 * @winData 传参，要传给弹窗组件的参数对象，全部挂在该对象的属性中即可
 * @width 弹窗的宽度，字符串，如“500px”
 * @confirm 弹窗组件内范畴，确认按钮点击后的回调函数
 * @cancel 弹窗组件内范畴，取消按钮点击后的回调函数
 */
export default {
  install(Vue, options) {
    let $vm;
    let $el;
    Vue.prototype._i18n = options.i18n;
    Vue.prototype.$store = options.store;
    Vue.prototype.$modal = {
      show(title, component, winData, width, confirm, cancel) {
        if (component) {
          const Modal = Vue.extend(component);
          $vm = new Modal();
          $vm.options = { ...options, title, component, winData, width, confirm, cancel };
          $el = $vm.$mount().$el;
        }
        $el && document.body.appendChild($el);
      },
      hide() {
        $vm && $vm.$destroy();
        $el && document.body.removeChild($el);
      },
    };
  },
};
