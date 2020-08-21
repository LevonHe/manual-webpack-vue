<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div class="page-login--layer page-login--layer-time">{{ time }}</div>
    <div class="page-login--layer">
      <div class="page-login--content">
        <div class="page-login--content-header"></div>
        <div class="page-login--content-main" flex="dir:top main:center cross:center">
          <div>
            <img class="page-login--logo" src="/statics/logo_white.png" />
            <span class="page-login--title">Manual Vue</span>
          </div>
          <div class="page-login--form" v-loading="loading">
            <el-card shadow="never">
              <el-form
                ref="loginForm"
                label-position="top"
                :rules="rules"
                :model="formLogin"
                size="default"
              >
                <el-form-item prop="username">
                  <el-input
                    type="text"
                    v-model.trim="formLogin.username"
                    placeholder="请输入用户名"
                    @keyup.enter.native="submit"
                  >
                    <i slot="prepend" class="el-icon-user-solid"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    v-model.trim="formLogin.password"
                    placeholder="请输入密码"
                    @keyup.enter.native="submit"
                    show-password
                  >
                    <i slot="prepend" class="el-icon-key"></i>
                  </el-input>
                </el-form-item>
                <el-button
                  size="default"
                  type="primary"
                  @click="submit"
                  class="button-login"
                >{{ $t('common.login') }}</el-button>
              </el-form>
            </el-card>
          </div>
        </div>
      </div>
      <div class="page-login--content-footer"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import dayjs from 'dayjs';
import CookieService from '@/util/CookieService';

export default {
  name: 'login',
  data() {
    return {
      time: dayjs().format('HH:mm:ss'),
      timeInterval: null,
      // 表单
      formLogin: {
        username: '',
        password: '',
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
      },
      loading: false,
    };
  },
  mounted() {
    CookieService.clearLoginCookie();
    this.timeInterval = setInterval(() => {
      this.refreshTime();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
  methods: {
    ...mapActions('system/account', ['login']),
    refreshTime() {
      this.time = dayjs().format('HH:mm:ss');
    },
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.toLogin();
      });
    },
    toLogin() {
      this.login({
        username: this.formLogin.username,
        password: this.formLogin.password,
      })
        .then((flag) => {
          if (!flag) {
            this.$msg.error('登录失败，请稍后重试');
            return;
          }
          // 重定向对象不存在则返回顶层路径
          this.$router.replace(this.$route.query.redirect || '/');
        })
        .catch((err) => {
          this.$msg.error(err);
        });
    },
  },
};
</script>

<style lang="less">
.page-login {
  background-color: @color-login-bg;
  height: 100%;
  position: relative;
  user-select: none;
  cursor: pointer;
  .page-login--layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 500px;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  .page-login--content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .page-login--content-header {
    padding: 1rem 0;
  }
  .page-login--content-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .page-login--logo {
    width: 100px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .page-login--title {
    font-size: 22px;
    font-weight: bold;
    color: @color-text-main;
    vertical-align: middle;
  }
  // 登录表单
  .page-login--form {
    width: 280px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: @color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  .page-login--content-footer {
    font-size: 12px;
    text-align: center;
    padding: 1em 0;
    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: @color-text-normal;
      a {
        color: @color-text-normal;
        margin: 0 0.5em;
        &:hover {
          color: #303133;
        }
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: @color-text-normal;
      a {
        color: @color-text-normal;
      }
    }
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: @color-text-normal;
        margin: 0 1em;
      }
    }
  }
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
