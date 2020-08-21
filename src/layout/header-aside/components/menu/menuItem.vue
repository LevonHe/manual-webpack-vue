<template>
  <el-menu-item :index="menu.path || 'null'">
    <i v-if="menu.icon" :class="[menu.icon, 'fe-icon']" style="font-size: 16px;"></i>
    <span slot="title">{{ $t(menu.title) }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'menu-item',
  props: {
    menu: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>
