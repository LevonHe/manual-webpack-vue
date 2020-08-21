import Vue from 'vue';
import store from '@/store/index.js';

function checkArray(key) {
  let arr = store.state.system.permission.permissionArr;
  if (arr.indexOf(key) > -1) {
    return true;
  }
  return false;
}

// 全局权限指令
Vue.directive('permission', {
  inserted(el, binding) {
    let permission = binding.value;
    if (permission) {
      let hasPermission = checkArray(permission);
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  },
});
