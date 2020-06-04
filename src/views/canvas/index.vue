<template>
  <div id="my-canvas">
    <custom-create-header :header="createHeader.header"></custom-create-header>
    <div class="canvas-box">
      <circle-progress :percent="95"></circle-progress>
    </div>
  </div>
</template>
<script>
import * as _ from 'lodash';
import CustomCreateHeader from '@/components/customCreateHeader/index.vue';
import CircleProgress from '@/components/circle-progress/index.vue';
export default {
  name: 'myCanvas',
  components: {
    CustomCreateHeader,
    CircleProgress,
  },
  data() {
    return {
      createHeader: {
        header: {
          title: this.$t('tableEdit.title'),
          helpTip: {
            content: this.$t('tableEdit.helpTip'),
            position: 'top-start',
          },
        },
      },
    };
  },
};
</script>
<style lang="less" scoped>
#my-canvas {
  height: 100%;
  .canvas-box {
    height: 200px;
    border: 1px solid #eee;
    position: relative;
  }
}
</style>
