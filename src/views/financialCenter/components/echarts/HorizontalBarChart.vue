<template>
  <div class="HorizontalBarChartBox">
    <p>{{ text }}</p>
    <div id="HorizontalBarMap"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'HorizontalBarChartMap',
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
      HorizontalBarDatas: ''
    }
  },
  computed: {
    option() {
      return {
        grid: {
          left: '2%',
          right: '2%',
          bottom: '0%',
          top: '5%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter(params) {
            return params[0].name + ' : ' + params[0].value
          }
        },
        xAxis: {
          show: true,
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#4B4B4B',
            fontSize: '12',
            formatter: '{value}K'
          }
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLabel: {
              show: true,
              // color: 'red',
              fontSize: 13,
              fontWeight: 500
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: [this.value[0].brandName.substring(0, 5), this.value[1].brandName.substring(0, 5), this.value[2] ? this.value[2].brandName.substring(0, 5) : '']
          }
        ],
        series: [
          {
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              borderRadius: 10,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: 'rgb(57,89,255,1)'
                },
                {
                  offset: 1,
                  color: 'rgb(46,200,207,1)'
                }
              ])
            },
            barWidth: 15,
            data: [this.value[0].brandPrice, this.value[1].brandPrice, this.value[2] ? this.value[2].brandPrice : 0]
          }
        ]
      }
    }
  },
  watch: {
    value(val) {
      if (val.length >= 2) {
        const chartDom = echarts.init(document.getElementById('HorizontalBarMap'))
        this.chartDom = chartDom
        chartDom.setOption(this.option, true)
      }
    }
  },
  created() {
    this.HorizontalBarDatas = this.HorizontalBarData
  },
  mounted() {
  }
}
</script>

<style lang="scss">
.HorizontalBarChartBox {
	margin-top: 2.0313vw;
	padding: 0.7813vw 1.0417vw;
	width: 100%;
	height: 10.4167vw;
	border-radius: 0.2083vw;
	background: linear-gradient(180deg, #f6f7ff -3%, #ececff 100%);

	>p {
		font-family: 思源黑体;
		font-size: 0.8333vw;
		font-weight: 530;
		line-height: 1.25vw;
		color: #1d252f;
	}

	#HorizontalBarMap {
		width: 23.75vw;
		height: 7.2917vw;
	}
}
</style>
