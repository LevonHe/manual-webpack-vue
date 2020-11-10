import Vue from 'vue';
import store from '@/store/index';

function checkArray(key) {
  const arr = store.state.system.permission.permissionArr;
  if (arr.indexOf(key) > -1) {
    return true;
  }
  return false;
}

// 全局权限指令
Vue.directive('permission', {
  inserted(el, binding) {
    const permission = binding.value;
    if (permission) {
      const hasPermission = checkArray(permission);
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  },
});
