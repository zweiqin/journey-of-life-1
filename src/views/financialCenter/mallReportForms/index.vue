<template>
  <div class="TableContainer">
    <div class="header">
      <!-- 头部的按钮 -->
      <TableHeader :header-data="MallSalesList"></TableHeader>
      <!-- 放置折线图的盒子 -->
      <div class="LineChartBox">
        <!-- 折线图 -->
        <div class="LineChartBox_item">
          <p>总订单</p>
          <p>
            5670<span>12<img src="@/assets/demoImg/add.png" /></span>
          </p>
          <LineChart :line-chart-data="LineChartData"></LineChart>
        </div>
        <div class="LineChartBox_item">
          <p>总收益</p>
          <p>
            5670<span>12<img src="@/assets/demoImg/add.png" /></span>
          </p>
          <IncomeLineChart :line-chart-data="LineChartData"></IncomeLineChart>
        </div>
        <div class="LineChartBox_item">
          <p>总支出</p>
          <p>
            5670<span>12<img src="@/assets/demoImg/add.png" /></span>
          </p>
          <ExpenditureLineChart :line-chart-data="LineChartData"></ExpenditureLineChart>
        </div>
      </div>
    </div>
    <!-- 下班部分的内容区 -->
    <div class="TableContent">
      <TableHeader :header-data="StoreSalesList"></TableHeader>
      <div class="TableContent_tables">
        <!-- 地区选择组件 -->
        <div class="tables_left">
          <!-- 地址选择 -->
          <Addreselection></Addreselection>
          <!-- 双折线图 -->
          <DoubleLineChart></DoubleLineChart>
          <!-- 柱状图 -->
          <BarChart></BarChart>
          <!-- 横向柱状图 -->
          <HorizontalBarChartMap></HorizontalBarChartMap>
          <!-- 雷达图 -->
          <RadarMap></RadarMap>
        </div>
        <div class="tables_right">
          <TableView></TableView>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryDepartmentList } from '@/api/financialCenter'
// 折线图组件
import LineChart from '../components/echarts/LineChart/LineChart'
import IncomeLineChart from '../components/echarts/LineChart/IncomeLineChart'
import ExpenditureLineChart from '../components/echarts/LineChart/ExpenditureLineChart'
import DoubleLineChart from '../components/echarts/LineChart/DoubleLineChart'
// 表头按钮的组件
import TableHeader from '../components/UniversalComponent/tableheade'
// 地址选择的组件
import Addreselection from '../components/UniversalComponent/Addreselection'
// 柱状图组件
import BarChart from '../components/echarts/BarChart'
// 横向柱状图组件
import HorizontalBarChartMap from '../components/echarts/HorizontalBarChart'
// 雷达图组件
import RadarMap from '../components/echarts/RadarMap'
// 表格组件
import TableView from '../components/UniversalComponent/tableView.vue'
export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'PallReportForms',
  components: { TableHeader, Addreselection, LineChart, IncomeLineChart, ExpenditureLineChart, DoubleLineChart, BarChart, HorizontalBarChartMap, RadarMap, TableView },
  data() {
    return {
      // 表头按钮的数据
      MallSalesList: {
        name: '商城销售报表',
        list: ['今年', '本月', '近七天', '自定义']
      },
      StoreSalesList: {
        name: '门店销售报表',
        list: ['今年', '本月', '近七天', '自定义']
      }
    }
  },
  computed: {
    // 折线图的数据 暂时使用死数据，后期联动请求的数目
    LineChartData() {
      var data = [1920, 2800, 3940, 1660, 2080, 3090, 1650, 3070, 4080]
      var markLineData = []
      for (var i = 1; i < data.length; i++) {
        markLineData.push([
          {
            xAxis: i - 1,
            yAxis: data[i - 1],
            value: (data[i] + data[i - 1]).toFixed(2)
          },
          {
            xAxis: i,
            yAxis: data[i]
          }
        ])
      }
      return {
        data,
        markLineData
      }
    }
  },
  created() {
    queryDepartmentList({
      date: '2023',
      address: '广东省',
      page: 1,
      limit: 10,
      orderDate: '2023'
    })
      .then((res) => {
        window.console.log(res)
      })
      .catch((err) => {
        window.console.log(err)
      })
  }
}
</script>

<style lang="scss">
.TableContainer {
  width: 100%;
  height: auto;
  padding: 0vw 1.25vw 0.8333vw 0.8333vw;
  background-color: #f4f7fc;
  /* 页面顶部的样式 */
  .header {
    padding: 2.0833vw 2.0833vw 3.125vw 1.5625vw;
    width: 100%;
    height: 20.7292vw;
    background-color: white;
    .LineChartBox {
      margin-top: 3.6458vw;
      width: 100%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .LineChartBox_item {
        box-sizing: border-box;
        padding: 0px 1.5625vw;
        width: 30%;
        height: 100%;
        > p:nth-of-type(1) {
          font-family: 思源黑体;
          font-size: 0.9375vw;
          font-weight: normal;
          line-height: 1.25vw;
          color: #141736;
        }
        > p:nth-of-type(2) {
          margin-top: 0.625vw;
          display: flex;
          align-items: center;
          font-family: 思源黑体;
          font-size: 1.5625vw;
          font-weight: 500;
          line-height: 1.7708vw;
          color: #141736;
          > span {
            margin-left: 0.4167vw;
            font-size: 0.7292vw;
            font-weight: normal;
            line-height: 1.0417vw;
            color: #f53f3f;
          }
        }
      }
    }
  }
  /* 下半部分的样式 */
  .TableContent {
    margin-top: 1.4063vw;
    background-color: white;
    padding: 3.125vw 2.0833vw 1.0417vw 1.5625vw;
    width: 100%;
    height: auto;
    .TableContent_tables {
      margin-top: 2.0313vw;
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      /* 左侧echarts图表区的大小 */
      .tables_left {
        width: 32%;
        height: auto;
        /* height: 51.5625vw; */
      }
      /* 数据表格的大小 */
      .tables_right {
        width: 52.9688vw;
        height: auto;
      }
    }
  }
}
</style>
