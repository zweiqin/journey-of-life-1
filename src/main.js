import Vue from 'vue'

// import Cookies from 'js-cookie'
import './styles/reset.scss'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import '@/styles/element-variables.scss'
import '@/styles/index.scss' // global css
import '@/styles/dts.scss'
import tableMixin from '@/mixins/tableMixin'

import App from './App'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import VueStorage from 'vue-ls'

import i18n from './lang' // Internationalization
import './icons' // icon
import './permission' // permission control

import * as filters from './filters' // global filters

import permission from '@/directive/permission/index.js' // 权限判断指令

import 'default-passive-events'// 解决警告

import '@/components/VxeTable/core/lazy'

// elem通用项
import './config/element-config.js'
import './directive/tableHeight'

Vue.prototype.$echarts = echarts
Vue.use(VueStorage)

Vue.mixin(tableMixin)
// Vue.use(Element, {
//   size: Cookies.get('size') || 'medium', // set element-ui default size
//   i18n: (key, value) => i18n.t(key, value)
// })

Vue.use(ElementUI, {
  size: 'mini'
})
Vue.directive('permission', permission)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  data () {
    return {
      dh: this.divh(1),
      dw: this.divw(1)
      // title: '看板管理系统'
      // sidebarLogoimg: require('@/assets/logo/smilLOGO.jpg'),

      // sidebarimg: `url(${require('@/assets/menubg.jpg')})`,
      // sidebarimg: ``,

      // loginimg: require('@/assets/logo/smilsoft.png')

      // ZLWimg: `url(${require('@/assets/logo/ZLW.png')})`
    }
  },
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  beforeDestroy () {
    // 组件销毁前移除监听
    window.removeEventListener('resize', this.setDwDh)
  },
  mounted () {
    // 监听窗口大小改变图表大小(先移除再监听，防止出错)
    window.removeEventListener('resize', this.setDwDh)

    window.addEventListener('resize', this.setDwDh)
  },
  methods: {
    setDwDh () {
      this.dh = this.divh(1)
      this.dw = this.divw(1)
    },
    divw (res) {
      const clientWidth = document.documentElement.clientWidth
      if (!clientWidth) return
      const fs = (clientWidth / 1920)
      return res * fs
    },
    divh (res) {
      const clientHeight = document.documentElement.clientHeight
      if (!clientHeight) return
      const fs = (clientHeight / 1080)
      return res * fs
    }
  },
  render: h => h(App)

})
