<template>
  <el-menu
    id="aside"
    :collapse="collapsed"
    :unique-opened="true"
    :default-active="active"
    background-color="#192129"
    text-color="#fff"
    active-text-color="#EA4505"
    @select="handleSelect"
  >
    <div class="levon-logo">
      <img v-if="!collapsed" src="/statics/logo_white.png" class="logoImg animated fadeInRight" />
      <img v-if="collapsed" src="/statics/logo_white2.png" class="logoImg animated fadeInRight" />
    </div>
    <template v-if="permission.permissions && permission.permissions.length > 0">
      <template v-for="(menu, idx) in permission.permissions">
        <mySubmenu
          v-if="menu.permissions && menu.permissions.length > 0"
          :key="menu.id"
          :idx="idx + ''"
          :menu="menu"
        ></mySubmenu>
        <myMenuItem v-else :key="menu.id" :menu="menu" :idx="idx + ''"></myMenuItem>
      </template>
    </template>
  </el-menu>
</template>
<script>
import { mapState } from 'vuex';
import CookieService from '@/util/CookieService';
import myMenuItem from './myMenuItem';
import mySubmenu from './mySubmenu';

export default {
  name: 'myAside',
  components: {
    myMenuItem,
    mySubmenu,
  },
  data() {
    return {
      active: '',
    };
  },
  computed: {
    ...mapState('cms/layout', ['collapsed']),
    ...mapState('cms/login', ['permission']),
  },
  watch: {
    '$route.fullPath': {
      handler(value) {
        this.active = '.' + value;
      },
      immediate: true,
    },
  },
  mounted() {
    const permission = this.permission;
    if (!permission || !permission.permissions || permission.permissions.length === 0) {
      CookieService.delCookie('_token');
      this.$router.replace('/login');
    }
  },
  methods: {
    handleSelect(index) {
      if (!index.includes('.')) {
        return;
      }
      const path = index.replace('.', '');
      this.$router.push({
        path,
      });
    },
  },
};
</script>
<style lang="less" scoped>
#aside {
  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .levon-logo {
    padding: 14px;
    height: 60px;
    background-color: #192129;
    box-sizing: border-box;
    .logoImg {
      height: 32px;
      line-height: 32px;
    }
  }
}
</style>
