<template>
  <div id="LineChart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineChart',
  props: [ 'LineChartData' ],
  data() {
    return {
      chartDom: '',
      LineChartDatas: {
        data: '',
        markLineData: ''
      }
    }
  },
  computed: {
    option() {
      return {
        grid: {
          left: '0',
          top: '40',
          bottom: '5.2083vw'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          show: false,
          data: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月'
          ]
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: 'line',
            data: this.LineChartDatas.data,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            }
            // itemStyle: { //调整折线颜色
            //   color: 'black'
            // }
            // markLine: {  // 如果不需要每一段数据的累加合 ， 此处可以隐藏 ， 需要时可再重新打开配置
            //   smooth: true,
            //   effect: {
            //     show: true
            //   },
            //   distance: 10,
            //   label: {
            //     normal: {
            //       position: 'middle'
            //     }
            //   },
            //   symbol: ['none', 'none'],
            //   data: this.LineChartDatas.markLineData
            // }
          }
        ]
      }
    }
  },
  watch: {
    LineChartData(newValue) {
      // 监听数据变化，刷新视图
      this.LineChartDatas = newValue
      this.chartDom.clear()
      this.chartDom.setOption(this.option, true)
    }
  },
  created() {
    this.LineChartDatas = this.LineChartData
  },
  mounted() {
    const chartDom = echarts.init(document.getElementById('LineChart'))
    this.chartDom = chartDom
    chartDom.setOption(this.option, true)
  }
}
</script>

<style lang="scss">
#LineChart {
  width: 19.4271vw;
  height: 4.1667vw;
}
</style>
