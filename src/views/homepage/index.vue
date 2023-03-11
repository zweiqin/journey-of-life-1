<template>
  <div
    :style="{
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${require('@/assets/image/digit-earth.png')})`,
      backgroundSize: '101.25% 180%'
    }" class="main"
  >
    <div
      :style="{
        height: '7%',
        width: '100%',
        color: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundImage: `url(${require('@/assets/image/digit-title.png')})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        fontSize: 30 * $root.dw + 'px',
        fontWeight: 'bold',
        fontFamily: 'Source Han Sans CN;',
        lineHeight: 30 * $root.dw + 'px',
        letterSpacing: '0.2em'
      }" @click="screenFull"
    >
      <span class="digit-title-text digit-title-text-left" :style="{ fontSize: 14 * $root.dw + 'px' }">{{ specificTime }}</span>
      <span
        style="background: linear-gradient(180deg, #FFFFFF 50%, #A9ADB3 100%);background-clip: text;text-fill-color: transparent;-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
      >
        数字化营销智慧管理门店
      </span>
      <span class="digit-title-text digit-title-text-right" :style="{ fontSize: 14 * $root.dw + 'px' }">🙂 欢迎进入系统</span>
    </div>
    <div
      :style="{
        height: '91%',
        width: '100%',
        // position: 'relative',
        // bottom: '2%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }"
    >
      <LeftBox style="width:29.43%;height:99.9%;" />
      <CenterBox style="width:34.95%;height:99.9%" />
      <RightBox style="width:29.43%;height:99.9%" />
    </div>
  </div>
</template>

<script>
import leftBox from './leftBox'
import centerBox from './centerBox'
import rightBox from './rightBox'
import screenfull from 'screenfull'
import { parseTime } from '@/utils'

export default {
  name: 'Homepage',
  components: {
    LeftBox: leftBox,
    CenterBox: centerBox,
    RightBox: rightBox
  },
  data() {
    return {
      specificTime: '',
      specificTimeTimer: ''
    }
  },
  // inject: [
  //   'reload'
  // ],
  mounted() {
    this.specificTimeTimer = setInterval(() => {
      this.specificTime = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s} 星期{a}')
    }, 1000)
  },
  beforeDestroy() {
    this.specificTimeTimer ? clearInterval(this.specificTimeTimer) : ''
  },
  methods: {
    screenFull() {
      // return
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }
  }

}
</script>

<style lang="scss" scoped>
.main {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	overflow: hidden;

	.digit-title-text {
		position: relative;
		top: 21%;
		// font-size: 14px;
		font-weight: bold;
		letter-spacing: 0em;
		color: #2ECFF9;
	}
	.digit-title-text-left{
		margin-left: 7.5%;
	}
	.digit-title-text-right{
		margin-right: 7.5%;
	}
}
</style>
