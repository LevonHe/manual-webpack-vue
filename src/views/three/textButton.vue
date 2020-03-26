<template>
  <div
    class="text-button"
    :class="{'btn-delete-forbid': modelName === text || !objReady}"
    @click="handleModelNameChange"
  >{{text}}</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'text-button',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState('cms/three', ['modelName', 'objReady']),
  },
  methods: {
    ...mapMutations({
      MODEL_NAME: 'cms/three/MODEL_NAME',
    }),
    handleModelNameChange() {
      if (!this.text) {
        return;
      }
      if (this.modelName === this.text) {
        return;
      }
      this.MODEL_NAME(this.text);
    },
  },
};
</script>
<style lang="less" scoped>
.text-button {
  width: calc(100%- 40px);
  height: 36px;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  font-size: 12px;
  padding: 2px 4px;
  margin: 10px 0;
  text-align: center;
  line-height: 36px;
  user-select: none;
  &:hover {
    border-color: #31b1f5;
  }
}
</style>