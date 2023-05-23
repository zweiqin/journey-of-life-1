<template>
  <div id="VisualChart"></div>
</template>

<script>
import * as echarts from 'echarts'
const data = [
  { name: '会员', value: 205 },
  { name: '金管家', value: 2 },
  { name: '合伙人', value: 1 },
  { name: '超级合伙人', value: 0 },
  { name: '师傅', value: 1 }
]
const xAxisData = data.map((item) => item.name)
const seriesData = data.map((item) => item.value)
const maxSeriesData = []
const MAX = Math.max(...seriesData)
for (let i = 0; i < seriesData.length; i++) {
  maxSeriesData.push(MAX)
}
// 每条数据的背景色
const barLinearColors = [
  new echarts.graphic.LinearGradient(0, 1, 1, 1, [
    { offset: 0, color: '#EB3B5A' },
    { offset: 1, color: '#FE9C5A' }
  ]),
  new echarts.graphic.LinearGradient(0, 1, 1, 1, [
    { offset: 0, color: '#FA8231' },
    { offset: 1, color: '#FFD14C' }
  ]),
  new echarts.graphic.LinearGradient(0, 1, 1, 1, [
    { offset: 0, color: '#F7B731' },
    { offset: 1, color: '#FFEE96' }
  ]),
  new echarts.graphic.LinearGradient(0, 1, 1, 1, [
    { offset: 0, color: '#1486F1' },
    { offset: 1, color: '#2EC7CF' }
  ]),
  new echarts.graphic.LinearGradient(0, 1, 1, 1, [
    { offset: 0, color: '#28C445' },
    { offset: 1, color: '#28C445' }
  ])
]
function rankBarColor(cData) {
  const tempData = []
  cData.forEach((item, index) => {
    tempData.push({
      value: item,
      itemStyle: {
        color: index > 5 ? barLinearColors[5] : barLinearColors[index]
      }
    })
  })
  return tempData
}
export default {
  name: 'VisualChart',
  data() {
    return {
      // 表格的渲染参数，使用的是经过处理的data数据
      option: {
        tooltip: {
          backgroundColor: 'rgba(50,50,50,.3)',
          textStyle: {
            color: '#222'
          }
        },
        xAxis: {
          type: 'value',
          position: 'top',
          splitLine: { show: true },
          axisLabel: { show: true },
          axisTick: { show: false },
          axisLine: { show: false }
        },
        yAxis: [
          {
            type: 'category',
            show: false,
            inverse: true,
            data: xAxisData,
            axisLabel: {
              formatter(value, index) {
                const idx = index + 1
                if (idx <= 5) {
                  return [ '{nt' + idx + '|' + idx + '}' ].join('\n')
                }
                return [ '{nt|' + idx + '}' ].join('\n')
              }
            }
          },
          {
            // 名称
            type: 'category',
            position: 'left',
            offset: -10,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
              color: '#333',
              align: 'left',
              verticalAlign: 'bottom',
              lineHeight: 30,
              fontSize: 12
            },
            data: xAxisData
          }
        ],
        series: [
          {
            zlevel: 1,
            type: 'bar',
            barWidth: 16,
            data: rankBarColor(seriesData),
            itemStyle: {
              borderRadius: 30
            },
            label: {
              show: true,
              fontSize: 12,
              color: '#fff'
            }
          },
          {
            type: 'bar',
            barWidth: 16,
            barGap: '-100%',
            itemStyle: {
              borderRadius: 30,
              color: 'rgba(0,0,0,0.04)'
            },
            data: maxSeriesData
          }
        ]
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    const chartDom = echarts.init(document.getElementById('VisualChart'))
    chartDom.setOption(this.option, true)
    // window.onresize = chartDom.resize
  },
  methods: {}
}
</script>

<style lang="scss">
#VisualChart {
  position: absolute;
  top: -0.5208vw;
  left: -2.3438vw;
  width: 26.0417vw;
  height: 19.7917vw;
}
</style>
