export default {
  methods: {
    handleCancel() {
      if (this.options.cancel) {
        this.options.cancel();
      }
      this.$modal.hide();
      this.visible = false;
    },
    handleConfirm(option) {
      if (this.options.confirm) {
        this.options.confirm(option);
      }
      this.$modal.hide();
      this.visible = false;
    },
  },
};
