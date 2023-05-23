<template>
  <div id="map_cn"></div>
</template>

<script>
// 导入地图数据
import dataList from '../MapChinaJson'
// 中国地图
// import 'echarts/map/js/china'
import chainData from '../MapChinaJson/100000.json'
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
              borderColor: '#000',
              borderWidth: 0
            },
            label: {
              show: false
            },
            selectedMode: 'multiple'
          }
        ]
      }
    }
  },
  beforeCreate() {
    echarts.registerMap('china', { geoJSON: chainData })
  },
  mounted() {
    const chartDom = echarts.init(document.getElementById('map_cn'))
    chartDom.setOption(this.option, true)
    // window.onresize = chartDom.resize
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
