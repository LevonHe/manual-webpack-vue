<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll';

export default {
  name: 'betterScroll',
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流
     * 2 滚动的时候实时派发scroll事件，不会截流
     * 3 除了实时派发scroll事件，在swipe的情况下仍能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 3,
    },
    // 点击列表是否派发click事件
    click: {
      type: Boolean,
      default: true,
    },
    // 是否开启横向滚动
    scrollX: {
      type: Boolean,
      default: false,
    },
    // 是否开启纵向滚动
    scrollY: {
      type: Boolean,
      default: true,
    },
    // 是否派发滚动事件
    listenScroll: {
      type: Boolean,
      default: false,
    },
    // 列表的数据
    data: {
      type: Array,
      default: null,
    },
    // 是否派发滚动到底部事件，用于上拉加载
    pullup: {
      type: Boolean,
      default: false,
    },
    // 是否派发顶部下拉事件，用于下拉刷新
    pulldown: {
      type: Boolean,
      default: false,
    },
    // 是否派发列表滚动开始的事件
    beforeScroll: {
      type: Boolean,
      default: false,
    },
    // 当数据更新后，刷新scroll的延迟时间
    refreshDelay: {
      type: Number,
      default: 20,
    },
    // 滚动条fade
    scrollbarFade: {
      type: Boolean,
      default: true,
    },
    // 滚动条交互事件
    scrollbarInteractive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    },
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  beforeDestroy() {
    this.scroll = null;
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        mouseWheel: true,
        scrollbar: {
          fade: this.scrollbarFade,
          interactive: this.scrollbarInteractive,
        },
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        scrollY: this.scrollY,
      });

      this.$emit('setScroll', this.scroll);

      if (this.listenScroll) {
        let _this = this;
        this.scroll.on('scroll', (pos) => {
          _this.$emit('scroll', pos);
        });
      }

      // 上滑刷新
      if (this.pullup) {
        let _this = this;
        this.scroll.on('scrollEnd', () => {
          if (_this.scroll.y <= this.scroll.maxScrollY + 50) {
            _this.$emit('scrollToEnd');
          }
        });
      }

      // 下拉刷新
      if (this.pulldown) {
        let _this = this;
        this.scroll.on('touchEnd', (pos) => {
          if (pos.y > 50) {
            _this.$emit('pulldown');
          }
        });
      }

      if (this.beforeScroll) {
        let _this = this;
        this.scroll.on('beforeScrollStart', () => {
          _this.$emit('beforeScroll');
        });
      }
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
</style>
