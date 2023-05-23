<template>
  <div id="InstrumentEacharts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'InstrumentEacharts',
  // eslint-disable-next-line vue/require-prop-types
  props: [ 'quota' ],
  data() {
    return {
      qutoas: ''
    }
  },
  computed: {
    option() {
      return {
        tooltip: {
          formatter: '{b} : {c}元'
        },
        series: [
          {
            name: '总交易额数据',
            type: 'gauge',
            // eslint-disable-next-line radix
            max: 100000,
            progress: {
              width: 10,
              show: true
            },
            axisLine: {
              lineStyle: {
                width: 1.3021
              }
            },
            axisLabel: {
              distance: 10,
              color: '#999',
              fontSize: 10
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}元',
              fontSize: 14
            },
            data: [
              {
                value: this.quota,
                name: '交易额(元)'
              }
            ]
          }
        ]
      }
    }
  },
  watch: {
    quota(newValue) {
      this.qutoas = newValue
      const EDom = document.getElementById('InstrumentEacharts')
      const chartDom = echarts.init(EDom)
      chartDom.clear()
      chartDom.setOption(this.option, true)
    }
  },
  created() {
    this.qutoas = this.quota
  },
  mounted() {
    const chartDom = echarts.init(document.getElementById('InstrumentEacharts'))
    chartDom.setOption(this.option, true)
    // window.onresize = chartDom.resize
  }
}
</script>

<style lang="scss">
#InstrumentEacharts {
  position: absolute;
  top: 0px;
  left: 16.6667vw;
  width: 26.0417vw;
  height: 19.2708vw;
}
</style>
