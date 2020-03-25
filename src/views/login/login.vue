<template>
  <div class="jarvis-login-bg">
    <div class="jarvis-login-container">
      <div class="jarvis-login-icon"></div>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model.trim="loginForm.username"
            :placeholder="$t('user.loginName')"
            @keyup.enter.native="submit"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            :placeholder="$t('user.password')"
            @keyup.enter.native="submit"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="jarvis-login-button"
            type="primary"
            @click="submit"
          >{{$t('common.login')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { AccountReg, PasswordReg } from '@/util/regExpService';
import CookieService from '@/util/CookieService';
export default {
  name: 'login',
  data() {
    const usernameValidator = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('user.invalid.accountValid')));
      }
      if (!AccountReg.test(value)) {
        return callback(new Error(this.$t('user.invalid.accountValid')));
      }
      callback();
    };
    const pwdValidator = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('user.invalid.pwdValid')));
      }
      if (!PasswordReg.test(value) || value.length < 8 || value.length > 20) {
        return callback(new Error(this.$t('user.invalid.pwdValid')));
      }
      callback();
    };
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ validator: usernameValidator, trigger: 'blur' }],
        password: [{ validator: pwdValidator, trigger: 'blur' }],
      },
    };
  },
  methods: {
    ...mapMutations({
      USER_INFO: 'cms/login/USER_INFO',
      PERMISSION: 'cms/login/PERMISSION',
      PERMISSION_NAME_ARR: 'cms/login/PERMISSION_NAME_ARR',
    }),
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          return;
        }
        const loginParam = {
          account: this.loginForm.username,
          credential: this.loginForm.password,
        };
        this.$api.userApi.login(loginParam).then((data) => {
          const { accessToken, user } = data;
          const userInfo = {
            userId: user.id,
            indentify: user.name,
          };
          CookieService.setCookie('_token', accessToken, 1);
          this.USER_INFO(userInfo);

          this.bindSubjectRole(user.id);
        });
      });
    },
    bindSubjectRole(userId) {
      if (!userId) {
        return;
      }
      this.$api.userApi.getRoleById(userId).then((data) => {
        if (!data || !data.permission) {
          return;
        }
        const { permission } = data;
        if (!permission.permissions || permission.permissions.length === 0) {
          return;
        }
        const viewPermission = permission.permissions.find((e) => e.name === 'ViewPermission');
        this.PERMISSION(viewPermission);

        const arr = permission.permissions.find((element) => element.name === 'InterfacePermission');
        if (!arr || !arr.permissions || arr.permissions.length === 0) {
          return;
        }
        let arrNew = [];
        this.mapChangeArray(arr.permissions, arrNew);
        this.PERMISSION_NAME_ARR(arrNew);

        this.$router.replace(this.$route.query.redirect || '/');
      });
    },
    mapChangeArray(arr, arrNew) {
      arr.forEach((o) => {
        arrNew.push(o.name);
        if (
          o.permissions &&
          Object.prototype.toString.call(o.permissions) === '[object Array]' &&
          o.permissions.length > 0
        ) {
          this.mapChangeArray(o.permissions, arrNew);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.jarvis-login-bg {
  height: 100%;
  width: 100%;
  background: url(../../assets/images/background.png) center no-repeat;
  background-size: cover;
  .jarvis-login-container {
    position: absolute;
    width: 400px;
    height: 420px;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -210px;
    padding: 30px 60px;
    background-color: #fff;
    color: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    box-sizing: border-box;
    .jarvis-login-icon {
      width: 93px;
      height: 32px;
      margin: 10px auto 20px;
      background: url(../../assets/images/logo_green.png) center no-repeat;
    }

    .jarvis-login-button {
      width: 100%;
    }
  }
}
</style>
