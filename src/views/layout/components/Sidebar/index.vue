<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in menuList" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import XeUtils from 'xe-utils'

function renderMenu(route, roles = []) {
  const isAdmin = roles.includes('超级管理员')
  const _route = route.map(item => {
    if (item.children && Array.isArray(item.children) && item.children.length) {
      item.children = renderMenu(item.children, roles)
    }
    // 菜单权限
    if (item._ROLES) {
      const roles = item._ROLES
      // 非admin显示页面
      if (roles.includes('USER')) {
        return {
          ...item,
          hidden: isAdmin
        }
      // admin专属页面
      } else if (roles.includes('ADMIN')) {
        return {
          ...item,
          hidden: !isAdmin
        }
      }
    }
    return item
  })
  return _route
}

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'roles',
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    menuList() {
      const routers = renderMenu(XeUtils.clone(this.permission_routers, true), this.roles)
      return routers
    }
  }
}
</script>
