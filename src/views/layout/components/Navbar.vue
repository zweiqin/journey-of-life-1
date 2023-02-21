<template>
  <div :style="{ height: 50 * $root.dw + 'px' }" class="navbar">
    <div class="left-menu">
      <Hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
      <Breadcrumb class="breadcrumb-container" />
    </div>
    <div class="title">{{ title }}</div>

    <div class="right-menu">
      <template v-if="isAdminRole">
        <el-tooltip content="超级管理员" placement="bottom">
          <i class="el-icon-s-custom right-menu-icon right-menu-item"></i>
        </el-tooltip>
      </template>
      <template v-if="isShopRole">
        <el-tooltip content="门店" placement="bottom">
          <i class="el-icon-s-shop right-menu-icon right-menu-item"></i>
        </el-tooltip>
      </template>
      <template v-if="device !== 'mobile'">
        <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
          <Screenfull class="screenfull right-menu-item" />
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
          <!-- <img :src="img" class="user-avatar"> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.homepage') }}
            </el-dropdown-item>
          </router-link>
          <!-- <el-dropdown-item divided>
            <a target="_blank" href="https://github.com/qiguliuxing/dts-shop">
            GitHub
            </a>
            </el-dropdown-item>
            <el-dropdown-item>
            <a target="_blank" href="https://gitee.com/qiguliuxing/dts-shop">
            码云
            </a>
            </el-dropdown-item> -->
          <el-dropdown-item divided>
            <router-link to="/profile/password">
              密码修改
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">
              {{ $t('navbar.logOut') }}
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  data() {
    return {
      // img: `url(require('@/assets/logo/logo.png'))`
      title: ''
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'sidebar',
      'name',
      'avatar',
      'device'
    ]),
    isAdminRole() {
      return this.roles.includes('超级管理员')
    },
    isShopRole() {
      return this.roles.includes('门店')
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;

	.left-menu {
		// background: #000;
		height: 100%;
		width: 25%;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;

		.hamburger-container {
			height: 100%;
			width: 20%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}

		.breadcrumb-container {
			height: 100%;
			width: 80%;
			// display: flex;
			// flex-direction: row;
			// justify-content: start;
			// align-items: center;
		}

		.errLog-container {
			display: inline-block;
			vertical-align: top;
		}
	}

	.title {
		height: 100%;
		width: 50%;
	}

	.right-menu {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		height: 100%;
		width: 25%;

		&:focus {
			outline: none;
		}

		.right-menu-icon {
			font-size: 20px;
		}

		.right-menu-item {
			display: inline-block;
			margin: 0 8px;
		}

		.screenfull {
			height: 20px;
		}

		.international {
			vertical-align: top;
		}

		.theme-switch {
			vertical-align: 15px;
		}

		.avatar-container {
			height: 50px;
			margin-right: 30px;

			.avatar-wrapper {
				cursor: pointer;
				margin-top: 5px;
				position: relative;

				.user-avatar {
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}

				.el-icon-caret-bottom {
					position: absolute;
					right: -20px;
					top: 25px;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
