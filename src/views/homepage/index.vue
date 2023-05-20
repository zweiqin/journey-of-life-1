<template>
  <div
    :style="{
      backgroundRepeat: 'no-repeat',
      backgroundSize: '101.25% 180%'
    }"
    class="main"
  >
    <!-- 统计区   ⬇模拟组件传值 -->
    <HomeTop :statistics-data="statisticsData"></HomeTop>
    <HomeContainer
      :statistics-data="statisticsData"
      :new-addres="newAddres"
      @selectNewAddres="getNewAddres"
    ></HomeContainer>
  </div>
</template>

<script>
// 请求首页数据的引入
import { getHomeData } from '@/api/homepage/home'
import HomeContainer from './container'
import HomeTop from './top'

export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'Homepage',
  components: { HomeTop, HomeContainer },
  data() {
    return {
      // 地址数据
      addres: ['广东省', '佛山市', '顺德区', '龙江镇'],
      statisticsData: {},
      specificTime: '',
      specificTimeTimer: ''
    }
  },
  computed: {
    // 将地址数据进行拼接 形成一个完整的地址字符串
    newAddres: {
      get() {
        let text = ' '
        this.addres.map((item) => {
          text += item
        })
        return text
      },
      set(newValue) {
        return null
      }
    }
  },
  created() {
    // 请求首页数据
    getHomeData({ address: this.newAddres, date: new Date().getFullYear() })
      .then((res) => {
        this.statisticsData = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    // 切换地址改变地址数据
    getNewAddres(value) {
      this.addres = value
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #f4f7fc;
  padding: 0px 24px 16px 16px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}
</style>
