<template>
  <div class="fe-aside-logo" :style="{ width: asideCollapse ? '64px' : '200px' }">
    <img
      v-if="asideCollapse"
      src="/statics/logo_white2.png"
      alt="logo"
      class="fe-aside-logo-img animated fadeInRight"
    />
    <img
      v-if="!asideCollapse"
      src="/statics/logo_white.png"
      alt="logo"
      class="fe-aside-logo-img animated fadeInLeft"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'header-logo',
  computed: {
    ...mapState('system/layout', ['asideCollapse']),
  },
};
</script>
<style lang="less" scoped>
.fe-aside-logo {
  float: left;
  padding: 14px 20px;
  height: 60px;
  background-color: #2b5e79;
  box-sizing: border-box;
  transition: all 0.3s;
  .fe-aside-logo-img {
    height: 32px;
    line-height: 32px;
  }
}
</style>
