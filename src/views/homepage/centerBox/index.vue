<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }"
  >
    <div
      :style="{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      }"
    >
      <div
        :style="{
          width: '100%',
          height: '12.85%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          // backgroundImage: `url(${require('@/assets/image/digit-card.png')})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '100% 100%'
        }"
      >
        <Top />
      </div>
      <div
        :style="{
          width: '100%',
          height: '46.87%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundImage: `url(${require('@/assets/image/digit-card.png')})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '100% 100%'
        }"
      >
        <Center />
      </div>
      <div
        :style="{
          width: '100%',
          height: '34.23%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundImage: `url(${require('@/assets/image/digit-card-special.png')})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '100% 100%'
        }"
      >
        <Bottom />
      </div>
    </div>

  </div>
</template>

<script>
import top from './top.vue'
import bottom from './bottom.vue'
import center from './center.vue'

export default {
  name: 'LeftBox',
  components: {
    Top: top,
    Center: center,
    Bottom: bottom
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }

}
</script>

<style scoped>
</style>
