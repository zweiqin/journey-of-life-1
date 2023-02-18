<template>
  <!-- <router-view /> -->
  <keep-alive :include="cachedViews">
    <!-- <router-view :key="key" /> -->
    <router-view />
  </keep-alive>
</template>

<script>
export default {
  name: 'Children',
  data() {
    return {}
  },
  // keep-alive无需在父组件keep-alive，在父父组件（AppMain）组件写就行，会自动把相应的子组件keep-alive的
  // 但是注意要在父父组件把父组件的name（Children）和子组件的name也写上
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  created() {
    // 在这里创建Children组件之后（此时父父的keep-alive已经初始化完了），才给cachedViews加上Children，
    // 此时第一次是不会触发activated的（但此时组件已经缓存了），下一次开始才会触发activated
    // cachedViews里面先有'Children'，再有this.$route的当前组件
    // console.log(this.$store.state.tagsView.cachedViews, this.$route)
    // if (this.$route.matched.find((item) => item.name === 'Children' && !this.$route.meta.noCache)) {
    // 	this.$store.dispatch('addChildrenView', 'Children')
    // }
    // console.log(this.$store.state.tagsView.cachedViews)
    // setTimeout(() => {
    // 	console.log(this.$store.state.tagsView.cachedViews)
    // }, 2000)

    // 防止之前缓存的组件又发起的请求 在子组件里：if (this.$route.name !== 'BrandApply') return console.log('return');  console.log('getList1')
  },
  activated() {
    // console.log('激活a')
  },
  deactivated() {
    // 下面的操作，使cachedViews里面删除了Children，则父父会立刻删除Children的缓存，所以下次再进来是没有之前的缓存的。
    // his.$store.dispatch('delChildrenView', 'Children')
    // console.log('激活dea')
  }
}
</script>

<style>

</style>
