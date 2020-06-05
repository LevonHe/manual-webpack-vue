<template>
  <div class="custom-create-header clearfix">
    <div class="custom-create-left pull-left">
      <span class="custom-create-title">{{ header.title }}</span>
      <template v-if="header.helpTip">
        <el-tooltip
          effect="dark"
          :content="header.helpTip.content"
          :placement="header.helpTip.position || 'top'"
          :open-delay="500"
        >
          <i class="el-icon-question"></i>
        </el-tooltip>
      </template>
    </div>
    <div class="custom-create-right pull-right">
      <template v-if="btns.length > 0">
        <template v-for="btn in btns">
          <el-button class="custom-create-btn" :key="btn.id" :icon="btn.icon" type="primary" @click="btn.click">{{
            btn.text
          }}</el-button>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'custom-header',
  props: {
    header: {
      type: Object,
      default: () => {},
    },
    btns: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="less" scoped>
.custom-create-header {
  width: 100%;
  height: 72px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  .custom-create-left {
    padding: 24px 0 24px 20px;
    .custom-create-title {
      margin-right: 10px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .custom-create-right {
    padding: 20px 20px 20px 0;
    .custom-create-btn {
      margin-left: 10px;
    }
  }
}
</style>
