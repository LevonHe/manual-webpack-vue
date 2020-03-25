<template>
  <el-menu-item :index="menu.url || idx">
    <i v-if="menu.icon" :class="`el-icon-${menu.icon}`"></i>
    <span slot="title">{{$t('menu.' + menu.name)}}</span>
  </el-menu-item>
</template>
<script>
export default {
  name: 'myMenuItem',
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