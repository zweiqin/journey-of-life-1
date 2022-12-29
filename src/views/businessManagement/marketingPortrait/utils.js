import { colorBase1 } from '@/components/LineBarChart'
import { keepTwoDecimal, objDeepMerge } from '@/utils'

export const defaultPieOption = {
  color: colorBase1,
  xAxis: {
    show: false
  },
  yAxis: {
    show: false
  },
  tooltip: {
    trigger: 'item',
    confine: true, // 鼠标悬停提示框超出图表范围
    enterable: true, // 鼠标是否可进入提示框浮层中
    hideDelay: 100, // 浮层隐藏的延迟
    extraCssText: 'box-shadow: 0 0 3px rgba(150,150,150, 0.7);',
    textStyle: {
      fontSize: 12,
      color: '#fff'
    }
  },
  grid: {
    bottom: 0,
    left: 10,
    right: 10,
    top: 0,
    containLabel: true
  },
  legend: {
    orient: 'vertical',
    right: 0,
    y: 'center',
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
    data: []
  }
}
export const defaultPieSeries = {
  type: 'pie',
  radius: '50%',
  minShowLabelAngle: 1, // 小于这个角度（0 ~ 360）的扇区，不显示标签（label 和 labelLine）。
  avoidLabelOverlap: true, // 是否启用防止标签重叠策略，默认开启，在标签拥挤重叠的情况下会挪动各个标签的位置，防止标签间的重叠。
  label: {
    show: true,
    formatter: params => {
      return (
        '{icon|●}{name|' + params.name + '} \n {value|' + params.value + '%}'
      )
    },
    padding: [-10, -60, 20, -60],
    rich: {
      icon: {
        fontSize: 16
      },
      name: {
        padding: [0, 10, 0, 2],
        color: '#666666'
      },
      value: {
        padding: [0, 10],
        align: 'left',
        color: 'rgba(0,0,0,0.45)'
      }
    }
  },
  labelLine: {
    length: 30,
    length2: 50,
    lineStyle: {
      color: '#d9d9d9'
    }
  },
}

export const initChartOption = (name,  list, series) => {
  const obj = objDeepMerge(defaultPieOption, {
    title: {
      text: name,
      left: 'center'
    },
    grid: {
      bottom: -0,
      left: 0,
      right: 0,
      top: '10px'
    },
    tooltip: {
      enterable: true, // 鼠标是否可进入提示框浮层中
      confine: true,
      extraCssText: 'box-shadow: 0 0 3px rgba(150,150,150, 0.7); margin-top: 8px;',
      textStyle: {
        fontSize: 12,
        color: '#fff'
      },
    },
    series: series
  })
  return obj
}