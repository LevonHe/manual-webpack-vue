<template>
  <div class="custom-valid-table">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'valid-table',
  data() {
    return {
      inputs: [],
    };
  },
  // provide() {
  //   return {
  //     $$parentVm: this,
  //   };
  // },
  created() {
    this.$on('on-input-item-add', (input) => {
      if (input) {
        this.inputs.push(input);
      }
    });
    this.$on('on-input-item-remove', (input) => {
      if (input.validator && input.validator.length) {
        this.inputs.splice(this.inputs.indexOf(input), 1);
      }
    });
  },
  methods: {
    validate(callback) {
      this.execValid(this.inputs, callback);
    },
    validateField(field, callback = function() {}) {
      const validateInputs = this.inputs.filter((i) => field.indexOf(i.prop) !== -1);
      this.execValid(validateInputs, callback);
    },
    execValid(inputs, callback) {
      return new Promise((resolve) => {
        let valid = true;
        let count = 0;
        inputs.forEach((input) => {
          input.validate('', (errors) => {
            if (errors) {
              valid = false;
            }
            if (++count === inputs.length) {
              resolve(valid);
              if (typeof callback === 'function') {
                callback(valid);
              }
            }
          });
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.custom-valid-table {
  padding: 10px;
  background-color: #fff;
}
</style>
