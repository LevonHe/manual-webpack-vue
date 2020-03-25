<template>
  <el-submenu :index="menu.url || idx">
    <i v-if="menu.icon" slot="title" :class="`el-icon-${menu.icon}`"></i>
    <span slot="title">{{$t('menu.' + menu.name)}}</span>
    <template v-if="menu.permissions && menu.permissions.length > 0">
      <template v-for="(s, idx) in menu.permissions">
        <mySubmenu
          v-if="s.permissions && s.permissions.length > 0"
          :key="s.id"
          :menu="s"
          :idx="idx + ''"
        ></mySubmenu>
        <myMenuItem v-else :key="s.id" :menu="s" :idx="idx + ''"></myMenuItem>
      </template>
    </template>
  </el-submenu>
</template>
<script>
import myMenuItem from './myMenuItem';
export default {
  name: 'mySubmenu',
  components: { myMenuItem },
  props: {
    menu: {
      type: Object,
      default: () => {},
    },
    idx: {
      type: String,
      default: '0',
    },
  },
};
</script>