<template>
  <div class="status-card clearfix" :class="{ [status]: showStatus }" :style="{ width: cardWidth }">
    <div class="status-card-header clearfix">
      <div class="status-card-left pull-left">
        <div class="status-card-name">
          <slot name="name"></slot>
        </div>
        <div class="status-card-id clearfix">
          <div class="pull-left">
            <slot name="identifier"></slot>
          </div>
          <div class="pull-right">
            <slot name="identifierCopy"></slot>
          </div>
        </div>
      </div>
      <div class="status-card-right pull-right">
        <slot name="btns"></slot>
      </div>
    </div>
    <div class="status-card-content clearfix">
      <slot name="form"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'status-card',
  props: {
    entity: {
      type: Object,
      default: () => {},
    },
    columnNumber: {
      type: Number,
      default: 4,
    },
    showStatus: {
      type: Boolean,
      default: false,
    },
    statusKey: {
      type: String,
    },
  },
  computed: {
    cardWidth() {
      if (!['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(this.columnNumber + '')) {
        return 'calc(25% - 20px)';
      }
      return `calc(${100 / this.columnNumber}% - 20px)`;
    },
    status() {
      if (!this.statusKey) {
        return '';
      }
      return this.entity[this.statusKey];
    },
  },
};
</script>
<style lang="less" scoped>
.status-card {
  display: inline-block;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 3px;
  margin: 10px;
  box-sizing: border-box;
  position: relative;
  &:hover {
    border-color: #ea450e;
  }
  .status-card-header {
    height: 60px;
    background-color: #eee;
    padding: 0 10px;
    .status-card-left {
      width: 60%;
      .status-card-name {
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        font-weight: bold;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        &:hover > a {
          border-bottom: 1px solid #f76d36;
        }
      }
      .status-card-id {
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        color: #333;
        .pull-left {
          width: 70%;
          margin-right: 5px;
          color: #999;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .pull-right {
          width: calc(30% - 5px);
        }
      }
    }
    .status-card-right {
      width: 40%;
      padding: 20px 0;
      text-align: right;
      font-size: 12px;
      line-height: 20px;
    }
  }
  .status-card-content {
    padding: 5px 10px;
    font-size: 14px;
    background-color: #fff;
  }
  &::before {
    content: '';
    width: 3px;
    height: calc(100% + 2px);
    display: block;
    position: absolute;
    left: -2px;
    top: -1px;
    background-color: transparent;
  }
  &.OK::before {
    background-color: #abe530;
  }
  &.WARN::before {
    background-color: #ffc71c;
  }
  &.Error::before {
    background-color: #ff5b5b;
  }
}
</style>
