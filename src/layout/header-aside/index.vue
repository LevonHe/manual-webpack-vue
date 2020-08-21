<template>
  <el-container class="fe-layout">
    <!-- header -->
    <el-header class="fe-layout-header">
      <!-- logo -->
      <header-logo></header-logo>
      <!-- collapse trigger icon -->
      <i v-if="!asideCollapse" class="el-icon-s-fold font-20 fe-lauout-trigger" @click="toogle"></i>
      <i v-if="asideCollapse" class="el-icon-s-unfold font-20 fe-lauout-trigger" @click="toogle"></i>
      <!-- user info -->
      <header-user></header-user>
      <!-- locales -->
      <header-locales></header-locales>
      <!-- fullscreen -->
      <!-- <header-fullscreen></header-fullscreen> -->
    </el-header>
    <el-container style="position: relative; width: 100%; height: calc(100% - 60px);">
      <!-- aside -->
      <div
        class="fe-layout-aside"
        :style="{ width: asideCollapse ? '64px' : '200px', minWidth: asideCollapse ? '64px' : '200px' }"
      >
        <menu-aside></menu-aside>
      </div>
      <!-- content -->
      <el-container style="overflow-x: hidden;">
        <el-main class="fe-layout-content">
          <div class="fe-layout-content-container">
            <router-view></router-view>
          </div>
        </el-main>
        <!-- footer -->
        <el-footer class="fe-layout-footer"></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MenuAside from './components/menu-aside/index.vue';
import HeaderLogo from './components/header-logo/index.vue';
import HeaderUser from './components/header-user/index.vue';
import HeaderLocales from './components/header-locales/index.vue';
// import HeaderFullscreen from './components/header-fullscreen/index.vue';

export default {
  name: 'fe-layout',
  components: {
    MenuAside,
    HeaderLogo,
    HeaderUser,
    HeaderLocales,
    // HeaderFullscreen,
  },
  computed: {
    ...mapState('system/layout', ['asideCollapse']),
  },
  methods: {
    ...mapMutations({
      saveAsideCollapse: 'system/layout/saveAsideCollapse',
    }),
    toogle() {
      this.saveAsideCollapse(!this.asideCollapse);
    },
  },
};
</script>

<style lang="less">
.fe-layout {
  height: 100%;
  min-width: 900px !important;
  .fe-layout-header {
    padding: 0;
    background-color: @color-white-bg;
    box-shadow: 0 0 12px -2px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }
  .fe-layout-aside {
    position: relative;
    opacity: 1;
    transition: all 0.3s;
    background-color: #2b5e79;
  }
  .fe-layout-content {
    width: 100%;
    height: calc(100% - 122px);
    padding: 0;
    background-color: @color-content-bg;
    box-sizing: border-box;
    position: relative;
    .fe-layout-content-container {
      position: relative;
      height: 100%;
      padding: 20px;
      color: #333;
      box-sizing: border-box;
      min-width: 970px;
      min-height: 360px;
      background-color: @color-content-bg;
    }
  }
  .fe-layout-footer {
    height: 42px !important;
    text-align: center;
    font-size: 12px;
    line-height: 42px;
    padding: 0;
    box-sizing: border-box;
    color: @color-text-normal;
  }
  .fe-lauout-trigger {
    float: left;
    padding: 0 24px;
    line-height: 60px;
    cursor: pointer;
    transform: color, 0.3s;
    &:hover {
      color: @color-primary;
    }
  }
  .fe-layout-dropdown {
    float: right;
    margin: 20px;
    .el-dropdown-link {
      cursor: pointer;
      &:hover {
        color: @color-primary;
      }
    }
  }
}
</style>
