<template>
  <div class="login">
    <div class="login_bg_right">
      <img
        class="background_image"
        src="@/assets/login/box1.png"
        alt=""
        srcset=""
      />
      <img
        class="background_image"
        src="@/assets/login/box2.png"
        alt=""
        srcset=""
      />
      <img
        class="background_image"
        src="@/assets/login/box3.png"
        alt=""
        srcset=""
      />
      <img
        class="background_image"
        src="@/assets/login/box4.png"
        alt=""
        srcset=""
      />
      <img
        class="background_image"
        src="@/assets/login/box5.png"
        alt=""
        srcset=""
      />
      <img
        class="background_image"
        src="@/assets/login/box6.png"
        alt=""
        srcset=""
      />
      <img
        class="background_image"
        src="@/assets/login/box7.png"
        alt=""
        srcset=""
      />
      <img
        class="logo"
        src="@/assets/logo/tuanfeng_logo.png"
        alt=""
        srcset=""
      />
      <div class="right_box_center">
        <p>家具数字化营销的领跑者</p>
        <p>科技增效平台 引领企业未来</p>
        <div class="r_footer">
          <p>bee group</p>
          <img src="@/assets/image/flower.png" alt="" srcset="" />
        </div>
      </div>
    </div>
    <div class="login-container">
      <div class="login-header">
        <h2 class="login-title" style="font-size: 1.25vw">
          欢迎登录<span style="color: #0000bb">团蜂门店</span>管理系统
        </h2>
        <hr />
        <h4 style="font-size: 0.8333vw">
          WELCOME TO THE JUFENG management system
        </h4>
      </div>
      <div class="login-card">
        <el-card
          shadow="never"
          :body-style="{ padding: '0px' }"
          style="border: 0; background-color: transparent"
        >
          <!-- <el-tabs v-else v-model="activeName" @tab-click="handleClick"> -->
          <!-- <el-tab-pane label="密码登录" name="first"> -->
          <div class="login-box login-tab-box">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
              <el-form-item prop="username">
                <el-input
                  v-model="loginForm.username"
                  type="text"
                  auto-complete="off"
                  placeholder="请输入账号"
                >
                  <div
                    slot="prefix"
                    style="
                      width: 100%;
                      height: 100%;
                      background-color: #0000bb;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <img
                      style="width: 0.7292vw; height: 0.7292vw"
                      src="@/assets/image/humer.png"
                      alt=""
                      srcset=""
                    />
                  </div>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  auto-complete="off"
                  placeholder="请输入密码"
                  show-password
                  @keyup.enter.native="handleLogin"
                >
                  <div
                    slot="prefix"
                    style="
                      width: 100%;
                      height: 100%;
                      background-color: #0000bb;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <img
                      style="width: 0.7292vw; height: 0.7292vw"
                      src="@/assets/image/password.png"
                      alt=""
                      srcset=""
                    />
                  </div>
                </el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input
                  v-model="loginForm.code"
                  auto-complete="off"
                  placeholder="验证码"
                  style="width: 63%"
                  @keyup.enter.native="handleLogin"
                >
                  <div
                    slot="prefix"
                    style="
                      width: 100%;
                      height: 100%;
                      background-color: #0000bb;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <img
                      style="width: 0.7292vw; height: 0.7292vw"
                      src="@/assets/image/yanzheng.png"
                      alt=""
                      srcset=""
                    />
                  </div>
                </el-input>
                <div class="login-code">
                  <img
                    width="100%"
                    height="100%"
                    :src="codeUrl"
                    @click="getCode"
                  />
                </div>
              </el-form-item>
              <el-checkbox
                v-model="loginForm.rememberMe"
                style="margin: 0px 0px 25px 0px; color: rgba(0, 0, 0, 0.85)"
              >
                记住密码
              </el-checkbox>
              <el-form-item style="width: 100%">
                <el-button
                  :loading="loading"
                  size="medium"
                  type="primary"
                  style="width: 100%; height: 2.6042vw"
                  @click.native.prevent="handleLogin"
                >
                  <span v-if="!loading">登 录</span>
                  <span v-else>登 录 中...</span>
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from '@/api/login';
import Cookies from 'js-cookie';

export default {
  name: 'Login',
  data() {
    const phoneCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的手机号'));
      }
    };
    return {
      activeName: 'first',
      codeUrl: '',
      cookiePassword: '',

      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        typ: 0,
        uuid: '',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' },
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
        ],
        code: [
          { required: true, trigger: 'change', message: '验证码不能为空' },
        ],
      },

      validationForm: {
        phone: '',
        code: '',
      },
      validationRules: {
        phone: [{ required: true, trigger: 'change', validator: phoneCheck }],
        code: [
          { required: true, trigger: 'change', message: '验证码不能为空' },
        ],
      },
      validationDisabled: false,
      validationText: '发送验证码',
      countDown: 60,

      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    switchLogin() {
      if (this.activeName === 'third') {
        this.activeName = 'first';
      } else {
        this.activeName = 'third';
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getCode() {
      getCodeImg().then((res) => {
        console.log(res);
        this.codeUrl = 'data:image/gif;base64,' + res.data.img;
        this.loginForm.uuid = res.data.uuid;
      });
    },
    getCookie() {
      const username = Cookies.get('username');
      const password = Cookies.get('password');
      const typ = Cookies.get('typ');
      const rememberMe = Cookies.get('rememberMe');
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : password,
        typ: typ === undefined ? this.loginForm.typ : typ,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    handleLogin() {
      if (this.activeName === 'first') {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            if (this.loginForm.rememberMe) {
              Cookies.set('username', this.loginForm.username, { expires: 30 });
              Cookies.set('password', this.loginForm.password, { expires: 30 });
              Cookies.set('typ', this.loginForm.typ, { expires: 30 });
              Cookies.set('rememberMe', this.loginForm.rememberMe, {
                expires: 30,
              });
            } else {
              Cookies.remove('username');
              Cookies.remove('password');
              Cookies.remove('rememberMe');
            }
            this.$store
              .dispatch('LoginByUsername', this.loginForm)
              .then(() => {
                this.loading = false;
                this.$router.push({ path: this.redirect || '/' });
              })
              .catch((response) => {
                this.loading = false;
                this.getCode();
              });
          }
        });
      } else if (this.activeName === 'second') {
        this.$refs.validationForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch('LoginByVerification', this.loginForm)
              .then(() => {
                this.loading = false;
                this.$router.push({ path: this.redirect || '/' });
              })
              .catch((response) => {
                this.loading = false;
              });
          }
        });
      } else if (this.activeName === 'third') {
        return false;
      }
    },
    sendCode() {
      this.$refs.validationForm.validateField('phone', (errorMessage) => {
        if (errorMessage) {
          this.$message.error(errorMessage);
        } else {
          // 1.时间开始倒数
          // 2.按钮进入禁用状态
          // 3.如果倒计时结束 按钮恢复可用状态 按钮文字变为重新发送, 时间重置
          // 4.倒计时的过程中 按钮文字为 多少s后重新发送
          this.validationDisabled = true;
          const timer = setInterval(() => {
            this.countDown--;
            this.validationText = `${this.countDown}s后重新发送`;
            if (this.countDown === 0) {
              this.validationDisabled = false;
              this.validationText = '重新发送';
              this.countDown = 60;
              clearInterval(timer);
            }
          }, 1000);
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login_bg_right {
  overflow: hidden;
  position: relative;
  width: 37.5vw;
  height: 100%;
  background-color: #0000bb;
  display: flex;
  justify-content: center;
  align-items: center;
  .background_image {
    position: absolute;
  }
  .background_image:nth-of-type(1) {
    left: 20.1042vw;
    top: 1.5625vw;
  }
  .background_image:nth-of-type(2) {
    left: 23.1771vw;
    top: -7.8125vw;
  }
  .background_image:nth-of-type(3) {
    left: 30.7292vw;
    top: 3.3333vw;
  }
  .background_image:nth-of-type(4) {
    left: 2.0833vw;
    top: 33.125vw;
  }
  .background_image:nth-of-type(5) {
    left: -7.8125vw;
    top: 36.5104vw;
  }
  .background_image:nth-of-type(6) {
    left: 10.4167vw;
    top: 33.9583vw;
  }
  .background_image:nth-of-type(7) {
    left: 20.8333vw;
    top: 42.8125vw;
  }
  .logo {
    position: absolute;
    left: 2.8646vw;
    top: 3.2292vw;
    width: 9.4792vw;
    height: 2.6563vw;
  }
  .right_box_center {
    width: 23.9583vw;
    height: 13.4375vw;
    font-family: 思源黑体;
    > p:nth-of-type(1) {
      height: 1.3021vw;
      font-size: 1.25vw;
      font-weight: 500;
      text-transform: capitalize;
      letter-spacing: 0.1em;
      color: #ffcb21;
    }
    > p:nth-of-type(2) {
      line-height: 4.8438vw;
      width: 23.9063vw;
      font-size: 3.3333vw;
      font-weight: bold;
      letter-spacing: 0.1em;
      color: #ffffff;
    }
    .r_footer {
      display: flex;
      > p {
        margin-top: 5px;
        height: 1.3542vw;
        font-size: 0.9375vw;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #ffffff;
      }
      > img {
        margin-left: 1.0417vw;
        width: 0.7813vw;
        height: 1.4063vw;
      }
    }
  }
}
.login {
  position: relative;
  height: 100%;
  background-color: #ffffff;
  // background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  .introduce-container {
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translateY(-50%);
    color: #ffffff;
  }

  .login-container {
    /* width: 26.0417vw;
    height: 20.8333vw; */
    position: absolute;
    right: 20%;
    top: 50%;
    transform: translateY(-50%);
    padding: 1.5625vw 3.125vw;
    background: #ffffff;
    border-radius: 0.7813vw;
    box-shadow: 0px 0px 15px 3px #ffffff;

    .login-header {
      color: #000000;

      .login-title {
        // width: 100%;
        height: 1.5em;
        text-align: justify;
      }

      .login-title:after {
        display: inline-block;
        width: 100%;
        content: '';
      }

      hr {
        margin: 0.2083vw 0;
        border-color: rgba(0, 0, 0, 0.85);
      }

      h4 {
        // width: 100%;
        height: 1.875vw;
        text-align: justify;
      }

      h4:after {
        display: inline-block;
        width: 100%;
        content: '';
      }
    }

    .login-card {
      position: relative;

      .el-tabs__nav-wrap::after {
        background-color: transparent;
      }

      .login-box {
        // width: 500px;
        height: 18.2292vw;
        padding: 1.3021vw 1.3021vw 5px 25px;
        border-radius: 0.3125vw;

        .login-content {
          .master-login-title {
            padding-top: 0.5208vw;
            font-weight: lighter;
            font-size: 1.0417vw;
            text-align: center;
            font-family: PingFangSC-Regular;
            color: #111;
          }

          .qrcode-login {
            .qrcode-img {
              width: 100%;
              height: 13.5417vw;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0;
            }

            .qrcode-desc {
              width: 100%;
              margin: 0 auto;

              p {
                text-align: center;
                font-size: 1.0417vw;
                color: #111;
                font-family: PingFangSC-Regular;
              }
            }
          }
        }
      }

      .login-tab-box {
        height: 16.25vw;
        padding: 1.5625vw 0.2604vw 0;

        .el-input {
          height: 1.9792vw;
          box-shadow: 0px 0px 0.5208vw 0px rgba(153, 153, 153, 0.8);

          input {
            height: 1.9792vw;
            padding-left: 2.6042vw;
          }

          .el-input__prefix {
            left: 0;
            width: 1.9792vw;
          }
        }

        .input-icon {
          color: white;
          height: 2.0313vw;
          width: 0.7292vw;
          margin-left: 0.1042vw;
        }

        .login-tip {
          font-size: 0.6771vw;
          text-align: center;
          color: #bfbfbf;
        }

        .login-code {
          width: 33%;
          height: 1.9792vw;
          float: right;

          img {
            cursor: pointer;
            vertical-align: middle;
          }
        }

        .el-button--primary {
          background-color: #0000bb;
          /* border-color: #073E8E; */
          border: none;
          box-shadow: 0px 0px 0.5208vw 0px rgba(153, 153, 153, 0.8);
        }

        .el-button--primary:active {
          background-color: #0000bb;
          color: #ffffff;
          outline: none;
        }
      }
    }
  }
}
.el-input__inner {
  line-height: 1.4583vw;
}
.el-form-item {
  margin-bottom: 0.9375vw !important;
}
.el-checkbox__label {
  display: inline-block;
  padding-left: 0.5208vw;
  line-height: 0.9896vw;
  font-size: 0.7292vw;
}
.el-checkbox__inner {
  font-size: 0.625vw;
  width: 0.7292vw;
  height: 0.7292vw;
}
.el-button--medium {
  font-size: 0.7292vw;
}
.el-input--mini {
  font-size: 0.625vw !important;
}
</style>
