<template>
  <div class="page-not-found">
    <p class="page_title">404 page not found</p>
    <el-button class="mt-20" @click="$router.replace({path: '/'})">返回首页</el-button>
  </div>
</template>
<script>
export default {
  name: 'pageNotFound',
};
</script>
<style lang="less" scoped>
.page-not-found {
  background-color: #303133;
  background-blend-mode: multiply, multiply;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .page_title {
    font-size: 20px;
    color: #fff;
  }
}
</style>
