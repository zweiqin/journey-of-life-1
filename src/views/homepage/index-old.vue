<template>
  <div
    :style="showwebh"
    class="base"
    @dblclick="bigImage"
  />
</template>

<script>
export default {
  data () {
    return {
      showwebh: {
        width: '100%',
        // height: 850 * this.$root.dw + 'px',
        height: '100%',
        backgroundImage: `url(${require('@/assets/homepage.png')})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }
    }
  },
  methods: {
    bigImage () {
      this.$router.push({ name: 'homepageBig' })
      document.documentElement.requestFullscreen()
    }
  }
}
</script>

<style scoped>
.base {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
