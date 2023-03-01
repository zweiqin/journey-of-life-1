<template>
  <div class="login">
    <div class="login-container">
      <div>
        <!-- <h3 class="title">巨蜂科技管理系统</h3> -->
        <h2 class="login-title">团蜂科技管理系统</h2>
      </div>
      <div class="login-card">

        <div class="login-changein">
          <div class="code-img" @click="switchLogin">
            <svg-icon v-if="activeName === 'third'" icon-class="computer" class="code-icon code-icon-computer" />
            <svg-icon v-else icon-class="qr-code" class="code-icon code-icon-qr" />
          </div>
          <div class="login-tip">
            <div class="poptip">
              <div class="poptip-arrow"><!-- <em></em> --><span></span></div>
              <div class="poptip-content">{{ activeName === 'third' ? '切换为账号密码登录' : '扫码登录更便捷' }}</div>
            </div>
          </div>
        </div>
        <el-card>
          <div v-if="activeName === 'third'">
            <div class="login-box">

              <div class="login-content">
                <div class="master-login-title">手机扫码，安全登录</div>
                <div class="qrcode-login">
                  <div class="qrcode-img">
                    <img
                      style="height: 250px; width: 250px;"
                      src="https://i0.hdslb.com/bfs/archive/aff45710ff2ac08360c5881e013b9bde3284b71f.jpg"
                    >
                  </div>
                  <div class="qrcode-desc">
                    <p>打开<span class="light-link"> 微信APP </span>扫一扫登录</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <el-tabs v-else v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="密码登录" name="first">
              <div class="login-box login-tab-box">
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
                  <el-form-item prop="username">
                    <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
                      <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
                      show-password @keyup.enter.native="handleLogin"
                    >
                      <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-input
                      v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%"
                      @keyup.enter.native="handleLogin"
                    >
                      <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
                    </el-input>
                    <div class="login-code">
                      <img :src="codeUrl" @click="getCode">
                    </div>
                  </el-form-item>
                  <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">
                    记住密码
                  </el-checkbox>
                  <el-form-item style="width:100%;">
                    <el-button
                      :loading="loading" size="medium" type="primary" style="width:100%;"
                      @click.native.prevent="handleLogin"
                    >
                      <span v-if="!loading">登 录</span>
                      <span v-else>登 录 中...</span>
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="短信登录" name="second">
              <div class="login-box login-tab-box">
                <!-- 手机验证登录表单 -->
                <el-form ref="validationForm" :model="validationForm" :rules="validationRules" class="login-form">
                  <el-form-item prop="phone">
                    <el-input v-model="validationForm.phone" type="text" auto-complete="off" placeholder="请输入手机号">
                      <i slot="prefix" class="el-icon-phone el-input__icon input-icon"></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-input
                      v-model="validationForm.code" placeholder="请输入验证码" type="text" auto-complete="off"
                      @keyup.enter.native="handleLogin"
                    >
                      <i slot="prefix" class="el-icon-tickets el-input__icon input-icon"></i>
                      <div slot="append">
                        <el-button :disabled="validationDisabled" @click="sendCode">
                          {{
                            validationText
                          }}
                        </el-button>
                      </div>
                    </el-input>
                  </el-form-item>
                  <el-form-item style="width:100%;">
                    <el-button
                      :loading="loading" size="medium" type="primary" style="width:100%;"
                      @click.native.prevent="handleLogin"
                    >
                      <span v-if="!loading">登 录</span>
                      <span v-else>登 录 中...</span>
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="扫码登录" name="third">
              <div class="login-box">
              </div>
              </el-tab-pane> -->
          </el-tabs>

        </el-card>
      </div>
    </div>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2020-2030 团蜂科技和聚惠星版权所有.</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from '@/api/login'
import Cookies from 'js-cookie'

export default {
  name: 'Login',
  data() {
    const phoneCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入正确的手机号'))
      }
    }
    return {
      activeName: 'first',
      codeUrl: '',
      cookiePassword: '',

      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [ { required: true, trigger: 'blur', message: '用户名不能为空' } ],
        password: [ { required: true, trigger: 'blur', message: '密码不能为空' } ],
        code: [ { required: true, trigger: 'change', message: '验证码不能为空' } ]
      },

      validationForm: {
        phone: '',
        code: ''
      },
      validationRules: {
        phone: [ { required: true, trigger: 'change', validator: phoneCheck } ],
        code: [ { required: true, trigger: 'change', message: '验证码不能为空' } ]
      },
      validationDisabled: false,
      validationText: '发送验证码',
      countDown: 60,

      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCode()
    this.getCookie()
  },
  methods: {
    switchLogin() {
      console.log(11)
      if (this.activeName === 'third') {
        this.activeName = 'first'
      } else {
        this.activeName = 'third'
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getCode() {
      getCodeImg().then((res) => {
        this.codeUrl = 'data:image/gif;base64,' + res.data.img
        this.loginForm.uuid = res.data.uuid
      })
    },
    getCookie() {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },
    handleLogin() {
      if (this.activeName === 'first') {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true
            if (this.loginForm.rememberMe) {
              Cookies.set('username', this.loginForm.username, { expires: 30 })
              Cookies.set('password', this.loginForm.password, { expires: 30 })
              Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 })
            } else {
              Cookies.remove('username')
              Cookies.remove('password')
              Cookies.remove('rememberMe')
            }
            this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            })
              .catch((response) => {
                this.loading = false
                this.getCode()
              })
          }
        })
      } else if (this.activeName === 'second') {
        this.$refs.validationForm.validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('LoginByVerification', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            })
              .catch((response) => {
                this.loading = false
              })
          }
        })
      } else if (this.activeName === 'third') {
        return false
      }
    },
    sendCode() {
      this.$refs.validationForm.validateField('phone', (errorMessage) => {
        if (errorMessage) {
          this.$elMessage(errorMessage, 'error')
        } else {
          // 1.时间开始倒数
          // 2.按钮进入禁用状态
          // 3.如果倒计时结束 按钮恢复可用状态 按钮文字变为重新发送, 时间重置
          // 4.倒计时的过程中 按钮文字为 多少s后重新发送
          this.validationDisabled = true
          const timer = setInterval(() => {
            this.countDown--
            this.validationText = `${this.countDown}s后重新发送`
            if (this.countDown === 0) {
              this.validationDisabled = false
              this.validationText = '重新发送'
              this.countDown = 60
              clearInterval(timer)
            }
          }, 1000)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-image: url('~@/assets/image/login-background.jpg');
	background-size: cover;

	.login-container {
		padding: 20px;
		margin-bottom: 150px;
		background: #ffffff;
		border-radius: 15px;

		.login-title {
			margin: 0px auto 30px auto;
			text-align: center;
			color: #2e2c2c;
		}

		.login-card {
			position: relative;

			.el-tabs__nav-wrap::after {
				background-color: transparent;
			}

			.login-changein {
				position: absolute;
				right: 2px;
				top: 2px;
				z-index: 2;
				width: 50%;
				height: 44px;
				margin: 0 auto;

				.code-img {
					position: absolute;
					top: 2px;
					right: 2px;

					// z-index: 1;
					.code-icon {
						color: #111;
						cursor: pointer;
					}

					.code-icon-computer {
						font-size: 50px;
					}

					.code-icon-qr {
						font-size: 60px;
					}
				}

				.login-tip {
					position: absolute;
					top: 10px;
					right: 61px;

					.poptip {
						position: relative;
						// z-index: 3;
						border-radius: 6px;
						background-color: rgba(61, 127, 255, .1);
						border: none;
						height: 30px;
						line-height: 30px;
						padding: 0 10px;

						.poptip-arrow {
							position: absolute;
							// z-index: 2;
							top: 9px;
							right: 0;

							// em {
							// 	position: absolute;
							// 	top: 0;
							// 	left: 1px;
							// 	width: 0;
							// 	height: 0;
							// 	border: none;
							// }

							span {
								position: absolute;
								top: 0;
								left: 0;
								width: 0;
								height: 0;
								border-style: solid;
								border-color: #fff0;
								border-width: 6px 0 6px 6px;
								border-left-color: rgba(61, 127, 255, .1);
								overflow: hidden;
							}

						}

						.poptip-content {
							font-size: 14px;
							font-weight: 400;
							color: rgba(61, 127, 255, 1);
						}
					}
				}
			}

			.login-box {
				width: 500px;
				height: 350px;
				padding: 25px 25px 5px 25px;
				background: #ffffff;
				border-radius: 6px;
			}

			.login-content {
				.master-login-title {
					padding-top: 10px;
					font-weight: lighter;
					font-size: 20px;
					text-align: center;
					font-family: PingFangSC-Regular;
					color: #111;
				}

				.qrcode-login {
					.qrcode-img {
						width: 100%;
						height: 260px;
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
							font-size: 20px;
							color: #111;
							font-family: PingFangSC-Regular;
						}
					}
				}
			}

			.login-tab-box {
				height: 310px;

				.login-form {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 100%;
				}

				.el-input {
					height: 38px;

					input {
						height: 38px;
					}
				}

				.input-icon {
					height: 39px;
					width: 14px;
					margin-left: 2px;
				}

				.login-tip {
					font-size: 13px;
					text-align: center;
					color: #bfbfbf;
				}

				.login-code {
					width: 33%;
					height: 38px;
					float: right;

					img {
						cursor: pointer;
						vertical-align: middle;
					}
				}

			}
		}
	}

	.el-login-footer {
		height: 40px;
		line-height: 40px;
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;
		color: #fff;
		font-family: Arial;
		font-size: 12px;
		letter-spacing: 1px;
	}
}
</style>

