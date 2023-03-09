<template>
  <div
    :style="{
      width: '100%',
      height: '100%'
    }"
    class="xxx"
  >
    <div style="display: flex;justify-content: center;align-items: center;height: 11.62%;">
      <span :style="{ fontSize: 20 * $root.dw + 'px', fontWeight: 'bold', color: '#2ECFF9' }">业务管理</span>
    </div>
    <div></div>

  </div>
</template>

<script>
export default {
  name: 'NoSignInList',
  components: {
  },
  data() {
    return {
    }
  },
  watch: {
  },
  updated() {
  },
  mounted() {
  },
  methods: {
    // infinitScroll() {
    //   // 拿到表格挂载后的真实DOM
    //   const table = this.$refs.table
    //   // 拿到表格中承载数据的div元素
    //   const divData = table.bodyWrapper
    //   divData.onmouseover = function () {
    //     clearInterval(t)
    //   } // 鼠标移入，停止滚动
    //   divData.onmouseout = function () {
    //     start()
    //   } // 鼠标移出，继续滚动
    //   // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
    //   let t
    //   function start() {
    //     // 数据少于表格高度停止滚动
    //     if (divData.clientHeight >= divData.scrollHeight) {
    //       return
    //     }
    //     t = setInterval(() => {
    //       // 元素自增距离顶部1像素
    //       divData.scrollTop += 1
    //       // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
    //       if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
    //         // 重置table距离顶部距离
    //         divData.scrollTop = 0
    //       }
    //     }, 100)
    //   }
    //   start()
    // },
  }
}
</script>

<style scoped>
</style>
