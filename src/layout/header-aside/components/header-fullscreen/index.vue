<template>
  <el-tooltip
    effect="dark"
    :content="isFullscreen ? $t('common.exitFullscreen') : $t('common.fullscreen')"
    placement="bottom"
    :open-delay="500"
  >
    <el-button class="fe-layout-fullscreen-button" type="text" @click="handleToogle">
      <i :class="{ 'fa fa-compress': isFullscreen, 'fa fa-arrows-alt': !isFullscreen }"></i>
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import screenfull from 'screenfull';

export default {
  name: 'header-fullscreen',
  computed: {
    ...mapState('system/layout', ['isFullscreen']),
  },
  methods: {
    ...mapMutations({
      IS_FULL_SCREEN: 'system/layout/IS_FULL_SCREEN',
    }),
    handleToogle() {
      if (!screenfull.isFullscreen) {
        screenfull.request();
        this.IS_FULL_SCREEN(true);
      } else {
        screenfull.exit();
        this.IS_FULL_SCREEN(false);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.fe-layout-fullscreen-button {
  float: right;
  margin: 10px 20px;
  color: @color-text-normal;
  &:hover {
    color: @color-primary;
  }
}
</style>
