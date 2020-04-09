<template>
  <span class="valid-input-area">
    <span v-if="isRequired" class="valid-input-item-required">*</span>
    <input
      type="text"
      class="valid-input-item"
      :class="{ 'input-invalid': validateState === 'error' }"
      :value="currentValue"
      :placeholder="placeholder"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <span v-if="validateState === 'error'" class="valid-input-item-message">{{ validateMessage }}</span>
  </span>
</template>
<script>
import Schema from 'async-validator';
import emitter from '@/util/emitter';
export default {
  name: 'valid-input',
  // inject: ['$$parentVm'],
  mixins: [emitter],
  props: {
    value: {
      type: String,
      default: '',
    },
    validation: {
      type: Array,
    },
    prop: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Enter value.',
    },
  },
  data() {
    return {
      currentValue: this.value,
      isRequired: false,
      validateState: '',
      validateMessage: '',
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
  },
  mounted() {
    if (this.prop) {
      this.dispatch('valid-table', 'on-input-item-add', this);
      this.setRules();
    }
  },
  beforeDestroy() {
    this.dispatch('valid-table', 'on-input-item-remove', this);
  },
  methods: {
    handleInput(event) {
      const { value } = event.target;
      this.currentValue = value;
      // 双向绑定所需
      this.$emit('input', value);
      // input组件change事件所需
      this.$emit('change', value);
      if (!value) {
        // input组件clear事件所需
        this.$emit('clear');
      }
      // 执行trigger=change的校验规则
      this.validate('change');
    },
    handleBlur(event) {
      // input组件blur事件所需
      this.$emit('blur', event);
      // 执行trigger=blur的校验规则
      this.validate('blur');
      // this.$$parentVm.validate();
    },
    handleFocus(event) {
      // input组件focus事件所需
      this.$emit('focus', event);
    },
    setRules() {
      const rules = this.getRules();
      if (rules.length) {
        this.isRequired = rules.some((i) => i.required);
      }
    },
    getRules() {
      return this.validation || [];
    },
    getFilteredRules(trigger) {
      const rules = this.getRules();
      return rules.filter((r) => !r.trigger || r.trigger.indexOf(trigger) !== -1);
    },
    validate(trigger, callback = function() {}) {
      const rules = this.getFilteredRules(trigger);
      if (!rules || rules.length === 0) {
        return true;
      }
      this.validateState = 'validating';
      let descriptor = {
        [this.prop]: rules,
      };
      const schema = new Schema(descriptor);
      let model = {
        [this.prop]: this.currentValue,
      };
      schema.validate(model, { firstFields: true }, (errors) => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';
        callback(this.validateMessage);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.valid-input-area {
  display: inline-block;
  position: relative;
  .valid-input-item-required {
    color: #f56c6c;
    vertical-align: middle;
  }
  .valid-input-item-message {
    position: absolute;
    left: 10px;
    top: 45px;
    background-color: #fff;
    border-radius: 4px;
    width: max-content;
    max-width: 400px;
    padding: 2px 6px;
    border: 1px solid #d5d5d5;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    font-size: 12px;
    color: #f56c6c;
    &::after,
    &::before {
      border: solid transparent;
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      left: 0;
    }
    &:before {
      border-width: 9px;
      border-bottom-color: #d5d5d5;
      top: -19px;
      left: 5px;
    }
    &::after {
      border-width: 8px;
      border-bottom-color: #fff;
      top: -16px;
      left: 6px;
    }
  }
  .valid-input-item {
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    appearance: none;
    color: #606266;
    display: inline-block;
    height: 36px;
    line-height: 36px;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: calc(100% - 20px);
    &::placeholder {
      color: #c0c4cc;
    }
    &:hover {
      border-color: #c0c4cc;
    }
    &:focus {
      border-color: #409eff;
      outline: 0;
    }
    &.input-invalid {
      border-color: #f56c6c !important;
      box-shadow: 0 0 0 2px rgba(234, 69, 14, 0.2);
    }
  }
}
</style>
