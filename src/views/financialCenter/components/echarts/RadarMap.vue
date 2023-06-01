<template>
  <div class="RadarMapBox">
    <p>{{ text }}</p>
    <div id="RadarMap"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'RadarMap',
  props: {
    text: {
      type: String,
      required: true
    },
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      chartDom: '',
      RadarMapDatas: ''
    }
  },
  computed: {
    option() {
      return {
        grid: {
          left: '0',
          top: '10',
          bottom: '0'
        },
        // backgroundColor: '#fff', // 背景色，默认无背景。
        color: ['#21CCFF', '#249EFF', '#313CA9'], // 调色盘颜色列表。
        textStyle: {
          // 全局字体样式
          color: '#636c72',
          fontSize: 14
        },
        legend: {
          bottom: 0,
          top: 'center',
          right: '10',
          orient: 'vertical',
          width: 500,
          itemWidth: 14,
          itemHeight: 14,
          itemBorderRadius: 8,
          textStyle: {
            // color: "#d7d7d7"
          },
          data: ['单次购买', '二次购买', '多次购买']
        },
        tooltip: {
          // 提示框组件
          trigger: 'item', // 触发类型 可选为：'axis' | 'item' | 'none'
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              color: 'rgba(204, 214, 235, 0.247059)'
            }
          }
        },
        radar: {
          // shape: 'circle',
          splitArea: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: [
                '#eae9e9',
                '#eae9e9',
                '#eae9e9',
                '#eae9e9',
                '#eae9e9',
                '#6a7791'
              ]
            }
          },
          axisLine: {
            lineStyle: {
              color: '#eae9e9'
            }
          },
          indicator: [
            // echarts在设置了max值时会给警告，因此暂时注释掉
            {
              name: this.value[0]
              // max: 30
            },
            {
              name: this.value[1]
              // max: 10
            },
            {
              name: this.value[2]
              // max: 7
            },
            {
              name: this.value[3]
              // max: 2
            },
            {
              name: this.value[4]
              // max: 2
            },
            {
              name: this.value[5]
              // max: 2
            }
          ]
        },
        series: [
          {
            name: '雷达图',
            type: 'radar',
            symbol: 'none',
            areaStyle: {
              opacity: 0.4
            },
            itemStyle: {
              lineStyle: {
                width: 2
              },
              areaStyle: {
                emphasis: {
                  opacity: 0.3
                }
              }
            },
            data: [
              {
                value: [17.2, 7.9, 1.6, 0.8, 0.8, 1],
                name: '单次购买',
                z: 3
              },
              {
                value: [5.4, 2.6, 1.2, 1.0, 0.5, 0.8],
                name: '二次购买',
                z: 1
              },
              {
                value: [28.0, 8.4, 6.1, 1.9, 0.8, 2],
                name: '多次购买',
                z: 5
              }
            ]
          }
        ]
      }
    }
  },
  watch: {
    value(val) {
      if (val.length >= 6) {
        const chartDom = echarts.init(document.getElementById('RadarMap'))
        this.chartDom = chartDom
        chartDom.setOption(this.option, true)
      }
    }
  },
  created() {
    this.RadarMapDatas = this.RadarMapData
  },
  mounted() { }
}
</script>

<style lang="scss">
.RadarMapBox {
	margin-top: 4.1667vw;
	padding: 0.7813vw 1.0417vw;
	width: 100%;
	height: 24.5833vw;
	border-radius: 0.2083vw;

	/* background: linear-gradient(180deg, #f6f7ff -3%, #ececff 100%); */
	>p {
		font-family: 思源黑体;
		font-size: 0.8333vw;
		font-weight: normal;
		line-height: 1.25vw;
		color: #1d2129;
	}

	#RadarMap {
		width: 23.75vw;
		height: 22.5vw;
	}
}
</style>
