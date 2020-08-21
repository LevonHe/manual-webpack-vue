/**
 * 全局弹窗插件
 * @title 弹窗的标题，传国际化之后的字符串
 * @component 弹窗中要打开的组件，普通vue组件
 * @winData 传参，要给组件传的参数对象
 * @widthStyle 弹窗的宽度值，字符串
 * @confirm 弹窗确认后的回调函数
 * @cancel 弹窗取消后的回调函数
 */
export default {
  install(Vue, options) {
    let $vm;
    let $el;
    Vue.prototype._i18n = options.i18n;
    Vue.prototype.$store = options.store;
    Vue.prototype._router = options.router;
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
