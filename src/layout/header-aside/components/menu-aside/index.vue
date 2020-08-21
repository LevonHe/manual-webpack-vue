<template>
  <div class="fe-aside-box">
    <el-menu
      class="fe-aside"
      :collapse="asideCollapse"
      :unique-opened="true"
      :default-active="active"
      background-color="#2b5e79"
      text-color="#fff"
      active-text-color="#fff"
      @select="handleSelect"
    >
      <template v-if="aside && aside.length > 0">
        <template v-for="(menu, index) in aside">
          <menu-item v-if="menu.children === undefined" :key="index + ''" :menu="menu"></menu-item>
          <sub-menu v-else :key="index + ''" :menu="menu"></sub-menu>
        </template>
      </template>
      <div v-else>没有侧栏菜单</div>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BScroll from 'better-scroll';
import SubMenu from '../menu/subMenu.vue';
import MenuItem from '../menu/menuItem.vue';

export default {
  name: 'menu-aside',
  components: { SubMenu, MenuItem },
  data() {
    return {
      active: '',
      BS: null,
    };
  },
  computed: {
    ...mapState('system/layout', ['asideCollapse']),
    ...mapState('system/menu', ['aside']),
  },
  watch: {
    asideCollapse(val) {
      this.scrollDestroy();
      setTimeout(() => {
        this.scrollInit();
      }, 500);
    },
    '$route.fullPath': {
      handler(value) {
        this.active = value;
      },
      immediate: true,
    },
  },
  methods: {
    scrollInit() {
      this.BS = new BScroll(this.$el, {
        mouseWheel: true,
        click: true,
        // scrollbar: {
        //   fade: true,
        //   interactive: false,
        // },
      });
    },
    scrollDestroy() {
      try {
        this.BS.destroy();
      } catch (e) {
        delete this.BS;
        this.BS = null;
      }
    },
    handleSelect(index) {
      if (!index) {
        return;
      }
      this.$router.push({
        path: index,
      });
    },
  },
  mounted() {
    this.scrollInit();
  },
  beforeDestroy() {
    this.scrollDestroy();
  },
};
</script>

<style lang="less">
.fe-aside-box {
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .fe-aside {
    // width: 100%;
    border: none;
    .el-menu-item.is-active {
      background-color: #173f55 !important;
    }
    .el-submenu__icon-arrow {
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>
