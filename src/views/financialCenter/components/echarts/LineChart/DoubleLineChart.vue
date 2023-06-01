<template>
  <div class="DoubleLineChartBox">
    <div class="storesText">
      <p>{{ text }}</p>
      <p>{{ value }} {{ unit }}</p>
    </div>
    <div id="DoubleLineChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'DoubleLineChart',
  props: ['text', 'value', 'unit'],
  data() {
    return {
      chartDom: '',
      // 命名的数据 后期用这个来传输数据刷新视图 前期暂时为静态页面
      DoubleLineChartDatas: ''
    }
  },
  computed: {
    option() {
      return {
        grid: {
          left: '0',
          right: '0',
          top: '10',
          bottom: '-30'
        },
        backgroundColor: '#f2f9fe00',
        title: {
          text: '',
          left: '50%',
          textAlign: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#ddd'
            }
          },
          backgroundColor: 'rgba(255,255,255,1)',
          padding: [5, 10],
          color: '#7588E4',
          extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
        },
        xAxis: {
          show: false,
          type: 'category',
          // 信息 代表哪一年 也可以修改为代币哪个月 天。。。。
          data: [
            2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023
          ],
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#000'
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          offset: 50,
          show: false,
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#f5f5f5'
            }
          }
        },
        series: [
          {
            name: '今年',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            // 第一条线的数据 颜色偏深的那一条
            data: [500, 400, 770, 880, 940, 600, 580, 800, 900, 1000],
            itemStyle: {
              color: '#165DFF'
            },
            lineStyle: {
              width: 5
            }
          },
          {
            name: '去年',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            // 第二条线的数据 颜色偏淡的那条
            data: [550, 450, 650, 780, 840, 500, 480, 700, 730, 900],
            itemStyle: {
              color: '#6AA1FF'
            },
            lineStyle: {
              width: 5
            }
          }
        ]
      }
    }
  },
  watch: {
    DoubleLineChartData(newValue) {
      // 监听数据变化，刷新视图
      // this.LineChartDatas = newValue
      this.chartDom.clear()
      this.chartDom.setOption(this.option, true)
    }
  },
  created() {
    this.DoubleLineChartDatas = this.DoubleLineChartData
  },
  mounted() {
    const chartDom = echarts.init(document.getElementById('DoubleLineChart'))
    this.chartDom = chartDom
    chartDom.setOption(this.option, true)
  }
}
</script>

<style lang="scss">
.DoubleLineChartBox {
	margin-top: 2.3958vw;
	padding: 0.7813vw 1.0417vw;
	width: 100%;
	border-radius: 0.2083vw;
	background: linear-gradient(180deg, #f2f9fe -3%, #e6f4fe 100%);
	display: flex;
	justify-content: space-between;

	.storesText {
		height: 100%;

		>p:nth-of-type(1) {
			font-family: 思源黑体;
			font-size: 0.8333vw;
			font-weight: normal;
			line-height: 1.25vw;
			color: #1d252f;
		}

		>p:nth-of-type(2) {
			text-align: left;
			margin-top: 0.7813vw;
			font-family: 思源黑体;
			font-size: 1.25vw;
			font-weight: 500;
			line-height: 1.7708vw;
			color: #1d2129;
		}
	}

	#DoubleLineChart {
		width: 14.5833vw;
		height: 4.1667vw;
	}
}
</style>
