<template>
  <div class="TableContainer">

    <div class="header">
      <!-- 头部的按钮 -->
      <TableHeader is-custom :header-data="mallSalesList" @select-date="handleSelectDateTop" @tab-change="handleTabChangeTop"></TableHeader>
      <!-- 放置折线图的盒子 -->
      <div class="LineChartBox">
        <!-- 折线图 -->
        <div class="LineChartBox_item">
          <p>总订单</p>
          <p>
            {{ orderSum || '0' }}<span>
              {{ typeof orderCompareYesterday === 'number' ? orderCompareYesterday : '--' }}<img
                src="@/assets/demoImg/add.png"
              />
            </span>
          </p>
          <LineChart :line-chart-data="LineChartData"></LineChart>
        </div>
        <div class="LineChartBox_item">
          <p>总收益</p>
          <p>
            {{ incomeSum || '0' }}<span>
              {{ typeof incomeSumCompareYesterday === 'number' ? incomeSumCompareYesterday
                : '--' }}<img src="@/assets/demoImg/add.png" />
            </span>
          </p>
          <IncomeLineChart :line-chart-data="LineChartData"></IncomeLineChart>
        </div>
        <div class="LineChartBox_item">
          <p>总支出</p>
          <p>
            {{ expenditureSum || '0' }}<span>
              {{ typeof expenditureCompareYesterday === 'number'
                ? expenditureCompareYesterday : '--' }}<img src="@/assets/demoImg/add.png" />
            </span>
          </p>
          <ExpenditureLineChart :line-chart-data="LineChartData"></ExpenditureLineChart>
        </div>
      </div>
    </div>

    <!-- 下半部分的内容区 -->
    <div class="TableContent">
      <TableHeader is-custom :header-data="storeSalesList" @select-date="handleSelectDateBottom" @tab-change="handleTabChangeBottom"></TableHeader>
      <div class="TableContent_tables">
        <!-- 地区选择组件 -->
        <div id="salesChart" class="tables_left">
          <!-- 地址选择 -->
          <Addreselection @change="handleAddressChange"></Addreselection>
          <!-- 双折线图 -->
          <DoubleLineChart text="物流数量" :value="brandSum" unit="家"></DoubleLineChart>
          <!-- 柱状图 -->
          <BarChart text="物流收入额" :value="brandTurnover"></BarChart>
          <!-- 横向柱状图 -->
          <HorizontalBarChartMap text="物流收益额前三" :value="branList"></HorizontalBarChartMap>
          <!-- 雷达图 -->
          <RadarMap text="物流配送区域分布图" :value="productTypeList"></RadarMap>
        </div>
        <div class="tables_right">
          <div v-if="heightTable !== 0" :style="{ height: heightTable + 'px' }">
            <VxeTable
              ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" :is-request="false"
              :loading="listLoading" :table-data="tableData" :page-total="pageTotal" :columns="columns"
              :grid-options="{ height: heightTable - 50 + 'px' }" @pageChange="pageChange"
            ></VxeTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api, queryLogisticsReportForms } from '@/api/financialCenter'
// 表头按钮的组件
import TableHeader from '../components/UniversalComponent/tableheade'
// 地址选择的组件
import Addreselection from '../components/UniversalComponent/Addreselection'
// 折线图组件
import LineChart from '../components/echarts/LineChart/LineChart'
import IncomeLineChart from '../components/echarts/LineChart/IncomeLineChart'
import ExpenditureLineChart from '../components/echarts/LineChart/ExpenditureLineChart'
import DoubleLineChart from '../components/echarts/LineChart/DoubleLineChart'
// 柱状图组件
import BarChart from '../components/echarts/BarChart'
// 横向柱状图组件
import HorizontalBarChartMap from '../components/echarts/HorizontalBarChart'
// 雷达图组件
import RadarMap from '../components/echarts/RadarMap'
// 表格组件
import VxeTable from '@/components/VxeTable'
import { columns } from './table'
export default {
  name: 'LogisticsReportForms',
  components: {
    TableHeader,
    Addreselection,
    LineChart,
    IncomeLineChart,
    ExpenditureLineChart,
    DoubleLineChart,
    BarChart,
    HorizontalBarChartMap,
    RadarMap,
    VxeTable
  },
  data() {
    return {
      // 表头按钮的数据
      mallSalesList: {
        name: '物流报表',
        list: [{ text: '今年', label: 1 }, { text: '本月', label: 2 }, { text: '今日', label: 3 }]
      },
      storeSalesList: {
        name: '各区域物流的统计报表',
        list: [{ text: '今年', label: 1 }, { text: '本月', label: 2 }, { text: '今日', label: 3 }]
      },
      // 请求返回数据
      orderSum: '',
      incomeSum: '',
      expenditureSum: '',
      orderCompareYesterday: '', // 永远为正
      incomeSumCompareYesterday: '', // 永远为正
      expenditureCompareYesterday: '', // 永远为正
      brandSum: '',
      brandTurnover: '',
      branList: [],
      productTypeList: [],
      // 表格
      heightTable: 0,
      api,
      columns,
      tableData: [],
      pageTotal: 0,
      listLoading: true,
      listQuery: {
        date: new Date().getFullYear(),
        address: '',
        page: 1,
        limit: 20,
        orderDate: new Date().getFullYear()
      },
      customColumnsConfig: {
        localKey: 'logisticsReportForms',
        columnsOptions: columns
      }
    }
  },
  computed: {
    // 折线图的数据
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
    this.getReportForms()
  },
  mounted() {
    this.heightTable = document.getElementById('salesChart').clientHeight
  },
  methods: {
    pageChange(params) {
      this.listQuery = {
        ...this.listQuery,
        ...params
      }
      this.getReportForms()
    },
    getReportForms() {
      this.listLoading = true
      queryLogisticsReportForms(this.listQuery)
        .then((res) => {
          this.orderSum = res.data.orderSum
          this.incomeSum = res.data.incomeSum
          this.expenditureSum = res.data.expenditureSum
          this.orderCompareYesterday = res.data.orderCompareYesterday
          this.incomeSumCompareYesterday = res.data.incomeSumCompareYesterday
          this.expenditureCompareYesterday = res.data.expenditureCompareYesterday
          this.brandSum = res.data.brandSum
          this.brandTurnover = res.data.brandTurnover
          this.branList = res.data.branList || []
          this.productTypeList = res.data.productTypeList || []
          this.tableData = res.data.map.data.map((item, index) => ({
            ...item,
            $index: (this.listQuery.page - 1) * this.listQuery.limit + (index + 1)
          }))
          this.pageTotal = res.data.map.total || 0
          this.listLoading = false
        })
        .catch((err) => {
          console.log(err)
          this.listLoading = false
        })
    },
    handleAddressChange(e) {
      this.listQuery.address = e
      this.getReportForms()
    },
    handleSelectDateTop(e) {
      console.log(e)
      this.listQuery.date = e
      this.getReportForms()
    },
    handleTabChangeTop(e) {
      console.log(e)
      if (e === 1) {
        this.listQuery.date = new Date().getFullYear()
      } else if (e === 2) {
        this.listQuery.date = new Date().toJSON()
          .substring(0, 7)
      } else if (e === 3) {
        this.listQuery.date = new Date(Date.now()).toJSON()
          .substring(0, 10)
      }
      this.getReportForms()
    },
    handleSelectDateBottom(e) {
      console.log(e)
      this.listQuery.date = e
      this.getReportForms()
    },
    handleTabChangeBottom(e) {
      console.log(e)
      if (e === 1) {
        this.listQuery.orderDate = new Date().getFullYear()
      } else if (e === 2) {
        this.listQuery.orderDate = new Date().toJSON()
          .substring(0, 7)
      } else if (e === 3) {
        this.listQuery.orderDate = new Date(Date.now()).toJSON()
          .substring(0, 10)
      }
      this.getReportForms()
    }
  }
}
</script>

<style lang="scss">
.TableContainer {
	width: 100%;
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

				>p:nth-of-type(1) {
					font-size: 0.9375vw;
					font-weight: normal;
					line-height: 1.25vw;
					color: #141736;
				}

				>p:nth-of-type(2) {
					margin-top: 0.625vw;
					display: flex;
					align-items: center;
					font-size: 1.5625vw;
					font-weight: 500;
					line-height: 1.7708vw;
					color: #141736;

					>span {
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

		.TableContent_tables {
			margin-top: 2.0313vw;
			width: 100%;
			display: flex;
			justify-content: space-between;

			/* 左侧echarts图表区的大小 */
			.tables_left {
				min-width: 32%;
				margin-right: 25px;
			}
			.tables_right {
				flex: 1;
				width: 0;
			}
		}
	}
}
</style>
