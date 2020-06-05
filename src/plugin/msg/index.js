export default {
  install(Vue) {
    Vue.prototype.$msg = {
      success(success) {
        Vue.prototype.$notify({
          type: 'success',
          title: Vue.prototype.$t('common.success'),
          message: success,
          duration: 3000,
        });
      },
      error(error) {
        let message = '';
        if (error && error.errorCode) {
          message = Vue.prototype.$t(`errorCode.${error.errorCode}`) || Vue.prototype.$t('errorCode.000');
        }
        if (!message && error && error.errorMessage) {
          message = error.errorMessage;
        }
        if (!message && error && error.status) {
          message = Vue.prototype.$t(`errorCode.${error.status}`) || Vue.prototype.$t('errorCode.000');
        }
        if (!message && error && error.message) {
          message = error.message;
        }
        if (!message) {
          message = error;
        }
        if (message.indexOf('<html>') !== -1) {
          message = Vue.prototype.$t('errorCode.000');
        }
        Vue.prototype.$notify({
          type: 'error',
          title: Vue.prototype.$t('common.error'),
          message,
          duration: 3000,
        });
      },
    };
  },
};
