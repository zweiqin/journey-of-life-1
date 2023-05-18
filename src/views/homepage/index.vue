<template>
  <div
    :style="{
      backgroundRepeat: 'no-repeat',
      backgroundSize: '101.25% 180%'
    }"
    class="main"
  >
    <!-- 统计区   ⬇模拟组件传值 -->
    <HomeTop :statistics-data="arr1"></HomeTop>
    <HomeContainer></HomeContainer>
  </div>
</template>

<script>
import HomeContainer from './container'
import HomeTop from './top'

export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'Homepage',
  components: { HomeTop, HomeContainer },
  data() {
    return {
      arr1: [1, 2, 3],
      specificTime: '',
      specificTimeTimer: ''
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #f4f7fc;
  padding: 0px 24px 16px 16px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}
</style>
