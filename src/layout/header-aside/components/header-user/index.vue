<template>
  <el-dropdown class="fe-layout-dropdown" trigger="hover" szie="small" @command="changeUser">
    <span class="el-dropdown-link">
      <i class="el-icon-user el-icon--right"></i>
      {{ info.name ? `${info.name}` : $t('common.unlogin') }}
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="userInfo">
        <i class="el-icon-info"></i>
        {{ $t('common.userInfo') }}
      </el-dropdown-item>
      <el-dropdown-item command="changePwd">
        <i class="el-icon-edit-outline"></i>
        {{ $t('common.editPwd') }}
      </el-dropdown-item>
      <el-dropdown-item command="logout">
        <i class="fa fa-power-off"></i>
        {{ $t('common.logout') }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'header-user',
  computed: {
    ...mapState('system/account', ['info']),
  },
  methods: {
    ...mapMutations({
      logout: 'system/account/logout',
    }),
    changeUser(e) {
      if (e === 'logout') {
        this.logOff();
      }
    },
    logOff() {
      this.$confirm(this.$t('common.logoutSure'), this.$t('common.logout'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning',
      })
        .then(() => {
          this.logout();
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('common.cancelLogout'),
          });
        });
    },
  },
};
</script>
