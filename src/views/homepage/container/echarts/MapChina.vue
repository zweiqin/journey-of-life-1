<template>
  <div id="map_cn"></div>
</template>

<script>
// 导入地图数据
import dataList from '../MapChinaJson'
// 中国地图
import 'echarts/map/js/china'
import * as echarts from 'echarts'
export default {
  name: 'MapChina',
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '区域价格',
            type: 'map',
            map: 'china',
            data: dataList,
            tooltip: {
              formatter(param) {
                // 显示当前选中区域的名字
                return param.data.name
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#000',
                borderWidth: 0
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            selectedMode: 'multiple'
          }
        ]
      }
    }
  },
  mounted() {
    const chartDom = document.getElementById('map_cn')
    echarts.init(chartDom).setOption(this.option, true)
  }
}
</script>

<style lang="scss">
#map_cn {
  top: -7.8125vw;
  right: -4.1667vw;
  width: 31.25vw;
  height: 31.25vw;
  position: absolute;
}
</style>
