<template>
  <div class="canvas-content">
    <div class="big-circle"></div>
    <div class="little-circle"></div>
    <canvas ref="runCanvas" id="runCanvas" width="100" height="100" class="runCanvas"></canvas>
  </div>
</template>
<script>
export default {
  name: 'circle-progress',
  props: {
    percent: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      percentage: 0,
      animTime: 2000,
      ctx: null,
      image: null,
    };
  },
  watch: {
    percent: {
      handler: function(newVal) {
        this.draw(newVal);
      },
    },
  },
  methods: {
    draw(percent) {
      if (percent > 100) return;
      if (!this.$refs.runCanvas) return;
      const canvas = this.$refs.runCanvas;

      if (!this.ctx) {
        this.ctx = canvas.getContext('2d');
      }

      if (percent <= this.percentage) {
        this.percentage = 0;
      }

      const oldPercentValue = this.percentage;
      this.percentage = percent;
      const time = this.animTime / this.percentage;
      this.canvasTop(oldPercentValue, percent, time, 50, 50);
    },
    canvasTop(start, end, time, w, h) {
      start += 1;
      if (start > end) {
        return false;
      }
      this.run(start, w, h);
      setTimeout(() => {
        this.canvasTop(start, end, time, w, h);
      }, time);
    },
    run(c, w, h) {
      this.ctx.clearRect(0, 0, 100, 100);
      const num = (2 * Math.PI * c) / 100 - 0.5 * Math.PI;
      this.ctx.arc(w, h, w - 4, -0.5 * Math.PI, num);
      const pattern = this.ctx.createPattern(this.image, 'no-repeat');
      this.ctx.strokeStyle = pattern;
      this.ctx.lineWidth = 8;
      this.ctx.lineCap = 'butt';
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.fontSize = 20;
      this.ctx.fillStyle = '#09bb07';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseLine = 'middle';
      this.ctx.fillText(c + '%', w, h);
    },
  },
  mounted() {
    const image = new Image();
    image.src = '/statics/bg.png';
    this.image = image;
    if (this.percent) {
      this.draw(this.percent);
    }
  },
};
</script>
<style scoped lang="less">
.canvas-content {
  height: 100%;
  position: relative;
  background-color: #fff;
  .big-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: #ebebeb;
  }
  .little-circle {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: #fff;
  }
  .runCanvas {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 99;
  }
}
</style>