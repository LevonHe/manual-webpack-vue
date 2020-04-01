<template>
  <el-container class="iot-layout">
    <!-- left aside -->
    <my-aside></my-aside>
    <el-container style="overflow-x: hidden;">
      <!-- header -->
      <el-header class="levon-header">
        <!-- collapse trigger icon -->
        <i v-if="!collapsed" class="el-icon-s-fold font-20 levon-trigger" @click="this.toogle"></i>
        <i v-if="collapsed" class="el-icon-s-unfold font-20 levon-trigger" @click="this.toogle"></i>
        <!-- user info -->
        <el-dropdown class="levon-dropdown" trigger="click" @command="this.changeUser">
          <span class="el-dropdown-link">
            <i class="el-icon-user el-icon--right"></i>
            {{ userInfo.indentify }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">{{ $t('user.userInfo') }}</el-dropdown-item>
            <el-dropdown-item command="changePwd">{{ $t('user.changePwd') }}</el-dropdown-item>
            <el-dropdown-item command="logout">{{ $t('common.logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- language trigger -->
        <el-dropdown class="levon-dropdown" trigger="click" @command="this.changeLocale">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
            {{ this.$i18n.locale === 'zh-CN' ? $t('common.zh_CN') : $t('common.en') }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh-CN">{{ $t('common.zh_CN') }}</el-dropdown-item>
            <el-dropdown-item command="en">{{ $t('common.en') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- content -->
      <el-main class="levon-content">
        <div class="levon-container">
          <router-view></router-view>
        </div>
      </el-main>
      <!-- footer -->
      <el-footer class="levon-footer">heliuxi Copyright ©2020</el-footer>
    </el-container>
  </el-container>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import CookieService from '@/util/CookieService';
import myAside from './aside';
export default {
  name: 'home',
  components: {
    myAside,
  },
  computed: {
    ...mapState('cms/layout', ['collapsed']),
    ...mapState('cms/login', ['userInfo']),
  },
  methods: {
    ...mapMutations({
      COLLAPSED: 'cms/layout/COLLAPSED',
    }),
    toogle() {
      this.COLLAPSED(!this.collapsed);
    },
    changeLocale(e) {
      if (this.$i18n.locale === e) {
        return;
      }
      console.log(e);
      this.$i18n.locale = e;
      CookieService.setCookie('lang', e, 1);
      // window.location.reload(true);
    },
    changeUser(e) {
      if (e === 'logout') {
        this.logout();
      }
    },
    logout() {
      CookieService.delCookie('_token');
      this.$router.replace('/login');
    },
  },
};
</script>
<style lang="less" scoped>
.iot-layout {
  height: 100%;

  .levon-header {
    padding: 0;
    background: #fff;
    box-shadow: 0 0 12px -2px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    .levon-trigger {
      float: left;
      padding: 0 24px;
      line-height: 60px;
      cursor: pointer;
      transition: color, 0.3s;
      &:hover {
        color: #ea4505;
      }
    }
    .levon-dropdown {
      float: right;
      margin: 20px;
      .el-dropdown-link {
        cursor: pointer;
        color: #ea4505;
      }
    }
  }
  .levon-content {
    width: 100%;
    height: calc(100% - 122px);
    padding: 0;
    background-color: #ececec;
    box-sizing: border-box;
    position: relative;
    .levon-container {
      height: 100%;
      padding: 20px;
      color: #333;
      box-sizing: border-box;
      min-width: 970px;
      min-height: 360px;
      background-color: #ececec;
      box-sizing: border-box;
      position: relative;
    }
  }
  .levon-footer {
    height: 42px !important;
    text-align: center;
    font-size: 14px;
    line-height: 42px;
    padding: 0;
    box-sizing: border-box;
  }
}
</style>
