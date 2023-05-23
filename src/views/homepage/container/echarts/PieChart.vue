<template>
  <div id="PieChart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'PieChat',
  // eslint-disable-next-line vue/require-prop-types
  props: [ 'dotStatistics' ],
  data() {
    return {
      option: {
        color: ['#165DFF', '#14C9C9'],
        dataset: [
          {
            source: [
              ['Product', 'Sales', 'Price', 'Year'],
              ['师傅数量', this.dotStatistics.master, 10, 2023],
              ['网点数量', this.dotStatistics.dot, 32, 2023]
            ]
          },
          {
            transform: {
              type: 'filter',
              config: { dimension: 'Year', value: 2023 }
            }
          }
        ],
        series: [
          {
            type: 'pie',
            radius: 80,
            center: ['50%', '25%'],
            datasetIndex: 1
          }
        ],
        // Optional. Only for responsive layout:
        media: [
          {
            query: { minAspectRatio: 1 },
            option: {
              series: [ { center: ['45%', '50%'] } ]
            }
          }
        ]
      }
    }
  },
  mounted() {
    const chartDom = echarts.init(document.getElementById('PieChart'))
    chartDom.setOption(this.option, true)
    // window.onresize = chartDom.resize
  },
  methods: {}
}
</script>

<style lang="scss">
#PieChart {
  width: 17.1875vw;
  height: 10.4167vw;
}
</style>
