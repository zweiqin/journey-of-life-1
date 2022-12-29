<!--
* @description 折线/柱状图表
!-->
<template>
  <div
    v-loading="localLoading"
    element-loading-text="加载中..."
    class="chartWrap"
    :class="{transparent: isBgcTransparent}"
    :style="{width, height}"
  >
    <div class="chart-head">
      <div class="axis-name top_left"><slot name="top_left">{{ axisName || label_topLeft }}</slot></div>
      <div class="axis-name top_right"><slot name="top_right">{{ label_topRight }}</slot></div>
    </div>
    <div class="chart-wrap">
      <div :id="id" class="chart-container" ref="echartRef" />
      <div class="overlay" :class="{overlayTopLevel}">
        <slot name="overlay">
          <!-- 暂无数据 -->
        </slot>
      </div>
    </div>
    <div class="chart-footer">
      <div class="axis-name bottom_left"><slot name="bottom_left">{{ label_bottomLeft }}</slot></div>
      <div class="axis-name bottom_left"><slot name="bottom_right">{{ label_bottomRight }}</slot></div>
    </div>
    <slot/>
  </div>
</template>

<script>
import XeUtils from 'xe-utils'
import { objDeepMerge } from '@/utils'

let echarts = null
export default {
  name: 'LineBarChart',
  props: {
    id: {
      type: String,
      default: `chart_${Math.random().toString().slice(-10)}_${+new Date()}`
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    },
    isBgcTransparent: {
      type: Boolean,
      default: false
    },
    axisName: {
      type: String,
      default: ''
    },
    label_topLeft: {
      type: String,
      default: ''
    },
    label_topRight: {
      type: String,
      default: ''
    },
    label_bottomLeft: {
      type: String,
      default: ''
    },
    label_bottomRight: {
      type: String,
      default: ''
    },
    loading: {
      type: [Boolean, undefined],
      default: undefined
    },
    option: {
      type: Object,
      default: () => ({})
    },
    isInitOption: {
      type: Boolean,
      default: true
    },
    // 设置overlayShow 层级
    overlayTopLevel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null,
      localLoading: false
    }
  },
  computed: {},
  watch: {
    option: {
      deep: true,
      // immediate: true,
      handler(val) {
        if (val) {
          if (this.chart) {
            this.chart.clear()
          }
          this.updateOption()
        }
      }
    },
    loading(bool) {
      if (bool !== undefined) {
        // 修复部分组件(通过 v-show 展示 组件生命周期走，但样式未同步)
        if (bool) this.updateResize()
        this.localLoading = bool
      }
      // if (!this.chart) return
      // if (bool) {
      //   showLoading(this.chart)
      // } else {
      //   this.chart.hideLoading()
      // }
    }
  },
  beforeCreate() {
    echarts = this.$echarts
  },
  created() {
    this.debounceUpdateResize = XeUtils.debounce(this.updateResize, 50, { leading: true, trailing: false })
    window.addEventListener('resize', this.debounceUpdateResize)
    this.localLoading = true
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.debounceUpdateResize)
  },
  mounted() {
    const el = this.$refs.echartRef
    this.chart = echarts.init(el)
    // showLoading(this.chart)
    // 事件组触发
    ;[
      'legendselectchanged',
      'click'
    ].map(eventName => {
      this.chart.on(eventName, params => {
        console.log(eventName, 'params', params)
        this.$emit(eventName, params)
      })
    })
    // this.chart.on('legendselectchanged', (obj) => {
    //   this.$emit('legendselectchanged', obj)
    // })
    this.isInitOption && this.updateOption()
    setTimeout(() => {
      this.updateResize()
    }, 50)
  },
  methods: {
    updateResize() {
      // const chartEl = document.querySelector(`#${this.id}`) // .getBoundingClientRect()
      const chartEl = this.$refs.echartRef
      // 保证 图表挂载在  document 中再进行更新(避免图表更新 width, height 为0 的情况)
      if (chartEl && chartEl.clientWidth) {
        this.chart && this.chart.resize()
      }
    },
    updateOption() {
      let xAxis = []
      let yAxis = []
      let grid = {}
      const axisLabelColor = 'rgba(0, 0, 0, 0.45)'
      const axisLabelColor_x = 'rgba(0, 0, 0, 0.65)'

      const defaultAxis = {
        nameTextStyle: {
          color: axisLabelColor
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: axisLabelColor,
            width: 1
          }
        },
        axisLabel: {
          color: axisLabelColor
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#e9e9e9'
          }
        }
      }
      const defaultAxis_x = {
        nameTextStyle: {
          color: axisLabelColor_x
        },
        axisLabel: {
          color: axisLabelColor_x
        }
      }

      const defaultGrid = {
        top: 8,
        left: '1%',
        right: '2%',
        bottom: 5,
        containLabel: true
      }

      const {
        xAxis: _xAxis,
        yAxis: _yAxis,
        series: _series,
        grid: _grid,
        legend: _legend,
        tooltip,
        ...othersOpts
      } = this.option
      if (Array.isArray(othersOpts.dataZoom)) {
        const dataZoomInside = othersOpts.dataZoom.find(v => {
          return v.type === 'inside'
        })
        if (dataZoomInside && dataZoomInside.zoomOnMouseWheel === undefined) {
          dataZoomInside.zoomOnMouseWheel = false
        }
      }
      if (Array.isArray(_grid)) {
        grid = _grid.map(v => Object.assign({}, defaultGrid, v || {}))
      } else {
        grid = Object.assign({}, defaultGrid, _grid || {})
      }
      if (Array.isArray(_xAxis)) {
        xAxis = _xAxis.map((item, idx) => {
          return {
            type: 'category',
            ...objDeepMerge(defaultAxis, defaultAxis_x, item)
          }
        })
      } else {
        xAxis = [
          {
            type: 'value',
            ...objDeepMerge(defaultAxis, defaultAxis_x, _xAxis)
          }
        ]
      }
      const yAxisDefault = objDeepMerge(defaultAxis, { axisLine: { show: false } })
      if (Array.isArray(_yAxis)) {
        yAxis = _yAxis.map((item, idx) => {
          return objDeepMerge(yAxisDefault, item)
        })
      } else {
        yAxis = [
          objDeepMerge(yAxisDefault, _yAxis)
        ]
      }
      const series = (_series || []).map(item => {
        return objDeepMerge({
          lineStyle: {
            width: 2
          }
        }, item)
      })
      const option = {
        legend: {
          icon: 'rect',
          itemHeight: 4,
          itemWidth: 10,
          textStyle: {
            color: 'rgba(0, 0, 0, 0.65)',
            lineHeight: 14
            // fontSize: 10
          },
          type: 'scroll',
          pageIconSize: 10,
          pageTextStyle: {
            lineHeight: 10,
            fontSize: 12
          },
          ...(_legend || {})
        },
        tooltip: {
          trigger: 'item',
          // formatter: '{c}',
          position: 'top',
          axisPointer: {
            type: 'cross',
            label: {
              show: true
            }
          },
          confine: true,
          ...(tooltip || {})
        },
        grid,
        textStyle: {
          fontSize: 12
        },
        xAxis,
        yAxis,
        series,
        ...(othersOpts || {})
      }
      // if (this.loading === undefined) {
      //   // this.chart && showLoading(this.chart)
      //   this.localLoading = true
      // }
      // return new Promise((resolve, reject) => setTimeout(resolve, this.loading === undefined ? 100 : 0)).then(_ => {
      // })
      this.updateResize()
      if (this.chart) {
        this.localLoading = false
        // this.chart.hideLoading()
        // console.log('LineBarChart option .................', option)
        this.chart.setOption(option, true)
      }
    }
  }
}
// 10项 基本颜色配置
export const colorBase1 = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E86452',
  '#6DC8EC',
  '#945FB9',
  '#FF9845',
  '#1E9493',
  '#FF99C3'
]
// 20项 基本颜色配置
export const colorBase2 = [
  '#5B8FF9',
  '#CDDDFD',
  '#5AD8A6',
  '#CDF3E4',
  '#5D7092',
  '#CED4DE',
  '#F6BD16',
  '#FCEBB9',
  '#E86452',
  '#F8D0CB',
  '#6DC8EC',
  '#D3EEF9',
  '#945FB9',
  '#DECFEA',
  '#FF9845',
  '#FFE0C7',
  '#1E9493',
  '#BBDEDE',
  '#FF99C3',
  '#FFE0ED'
]
</script>

<style lang="scss" scoped>
  .chartWrap {
    //padding: 2px 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    &.transparent {
      .chart-wrap {
        .chart-container {
          background: transparent;
        }
      }
    }
    .chart-head, .chart-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .axis-name {
        font-size: 12px;
      }
    }

    .chart-wrap {
      flex: 1;
      position: relative;

      .chart-container {
        width: 100%;
        height: 100%;
        background: #fff;
      }

      .overlay {
        &.overlayTopLevel {
          pointer-events: unset;
        }
        &::v-deep {
          // 暂无数据展示样式 (组件外也可使用)
          .chart_noData {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: -1;
            &.chart_noData_show {
              z-index: 1;
              background: #fff;
            }
          }
        }
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        pointer-events: none;
      }
    }
  }
</style>
