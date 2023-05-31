<template>
  <div class="BarChartBox">
    <div class="storesText">
      <p>门店销售额</p>
      <p>114,514</p>
      <p>
        较昨日<span>405<img src="@/assets/demoImg/down.png" /></span>
      </p>
    </div>
    <div id="BarChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'BarChart',
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    BarChartData: Object
  },
  data() {
    return {
      chartDom: '',
      BarChartDatas: {}
    }
  },
  computed: {
    option() {
      return {
        backgroundColor: '#f5fef2',
        grid: {
          left: '5%',
          right: '2%',
          top: '10%',
          bottom: '0'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        xAxis: {
          // 轴线暂时隐藏
          show: false,
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#3585d5'
            }
          },
          offset: 20,
          axisTick: {
            show: false,
            alignWithLabel: true,
            lineStyle: {
              color: '#3585d5'
            }
          },
          axisLabel: {
            fontSize: 16,
            color: '#A2D4E6'
          }
        },
        yAxis: {
          // 轴线暂时隐藏
          show: false,
          name: '%',
          nameTextStyle: {
            color: '#A2D4E6'
          },
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#3585d5'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dotted',
              color: '#3585d5'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 16,
            color: '#A2D4E6'
          },
          boundaryGap: ['20%', '20%']
        },
        series: [
          {
            name: '今日',
            type: 'bar',
            smooth: true,
            symbol: 'none',
            showSymbol: false,
            symbolSize: 8,
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: '#2CAB40'
                  },
                  {
                    offset: 1,
                    color: '#2CAB40'
                  }
                ]
              }
            },
            data: [20, 30, 60, 40, 50, 30]
          },
          {
            name: '昨日',
            type: 'bar',
            smooth: true,
            symbol: 'none',
            showSymbol: false,
            symbolSize: 8,
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                // 可以做渐变效果，但是目前暂时不需要 因此暂时调整为同一颜色，后期需要再调整
                colorStops: [
                  {
                    offset: 0,
                    color: '#86DF6C'
                  },
                  {
                    offset: 1,
                    color: '#86DF6C'
                  }
                ]
              }
            },
            data: [30, 40, 70, 90, 20, 100]
          }
        ]
      }
    }
  },
  created() {
    this.BarChartDatas = this.BarChartData
  },
  mounted() {
    const chartDom = echarts.init(document.getElementById('BarChart'))
    this.chartDom = chartDom
    chartDom.setOption(this.option, true)
  }
}
</script>

<style lang="scss">
.BarChartBox {
  margin-top: 2.3958vw;
  padding: 0.7813vw 1.0417vw;
  width: 100%;
  border-radius: 0.2083vw;
  background: linear-gradient(180deg, #f5fef2 -3%, #e6feee 100%);
  display: flex;
  justify-content: space-between;
  /* 左侧文字的样式 */
  .storesText {
    height: 100%;
    > p:nth-of-type(1) {
      font-family: 思源黑体;
      font-size: 0.8333vw;
      font-weight: normal;
      line-height: 1.25vw;
      color: #1d252f;
    }
    > p:nth-of-type(2) {
      text-align: left;
      margin-top: 0.7813vw;
      font-family: 思源黑体;
      font-size: 1.25vw;
      font-weight: 500;
      line-height: 1.7708vw;
      color: #1d2129;
    }
    > p:nth-of-type(3) {
      margin-top: 0.2604vw;
      font-size: 0.625vw;
      font-weight: normal;
      line-height: 1.0417vw;
      color: #4e5969;
      > span {
        margin-left: 0.4167vw;
        font-size: 0.7292vw;
        font-weight: normal;
        line-height: 1.0417vw;
        letter-spacing: 0px;
        color: #00b42a;
      }
    }
  }
  #BarChart {
    width: 14.5833vw;
    height: 4.6875vw;
  }
}
</style>
