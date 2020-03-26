<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll';

export default {
  name: 'betterScroll',
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          mouseWheel: true,
          scrollbar: {
            fade: false,
          },
        });
      } else {
        this.scroll.refresh();
      }
    });
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  position: absolute;
  top: 10px;
  left: 10px;
  overflow: hidden;
}
</style>