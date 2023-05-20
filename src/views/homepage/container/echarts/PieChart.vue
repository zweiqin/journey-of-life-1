<template>
  <div id="PieChart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'PieChat',
  data() {
    return {
      option: {
        color: ['#165DFF', '#14C9C9'],
        dataset: [
          {
            source: [
              ['Product', 'Sales', 'Price', 'Year'],
              ['师傅数量', 300, 10, 2011],
              ['网点数量', 900, 32, 2011],
              ['网点数量', 400, 32, 2012],
              ['师傅数量', 100, 10, 2012]
            ]
          },
          {
            transform: {
              type: 'filter',
              config: { dimension: 'Year', value: 2011 }
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
    const chartDom = document.getElementById('PieChart')
    echarts.init(chartDom).setOption(this.option)
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
