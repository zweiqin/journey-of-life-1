<template>
  <!-- 表格区 -->
  <div class="ContainerDataBox">
    <div class="dataBox_left">
      <div class="Analysis">
        <!-- 表头 -->
        <TableHeader
          :header-data="AnyList"
          @getAnlyDatalist="getAnlyDatalist"
        ></TableHeader>
        <AnalysisEchats></AnalysisEchats>
        <!-- 表未数据展示区 -->
        <div class="Analysis_footer">
          <div v-for="item in listArray" :key="item.value" class="Af_item">
            <p>{{ item.name }}</p>
            <p>
              <span>{{ item.value }}</span>{{ unit[analysisDataIndex] }}
            </p>
            <!-- <p>
              <img src="@/assets/home/down.png" alt="" /><span>11.2%</span>较昨日
              </p> -->
          </div>
          <!-- <div class="Af_item">
            <p>本月交易额</p>
            <p><span>76.33</span>万元</p>
            <p>
            <img src="@/assets/home/down.png" alt="" /><span>11.2%</span>较上月
            </p>
            </div>
            <div class="Af_item">
            <p>本年交易额</p>
            <p><span>76.33</span>万元</p>
            <p>
            <img src="@/assets/home/down.png" alt="" /><span>11.2%</span>较上年
            </p>
            </div> -->
        </div>
      </div>
      <div class="CommodityRanking">
        <TableHeader
          :header-data="Commodity"
          @getDataList="getDataLists"
        ></TableHeader>
        <CommodityEachats
          v-if="shopDataName"
          :shop-data-name="shopDataName"
          :shop-data-value="shopDataValue"
        ></CommodityEachats>
      </div>
    </div>
    <div class="dataBox_right">
      <TableHeader
        :header-data="{ name: '网点统计区', list: [] }"
      ></TableHeader>
      <div class="DotStatistics">
        <div class="DSquantity">
          <p><span></span>网点数量</p>
          <p>
            <span>{{ statisticsData.regionSum }}</span>家
          </p>
        </div>
        <div class="DSquantity" style="margin-bottom: 0px">
          <p><span style="background-color: #165dff"></span>师傅数量</p>
          <p>
            <span>{{ statisticsData.masterSum }}</span>人
          </p>
        </div>
        <PieChat :dot-statistics="dotStatistics"></PieChat>
        <MapChina></MapChina>
      </div>
      <div class="address">
        <span>{{ newAddres }}</span>
        <AddresSelsect @addresSelect="addresSelect"></AddresSelsect>
      </div>
      <div class="DataArea">
        <div class="DataArea_item">
          <img src="@/assets/home/smallvip.png" alt="" />
          <p>会员</p>
          <p>{{ statisticsData.regionMember }}</p>
        </div>
        <div class="DataArea_item">
          <img src="@/assets/home/smallvip.png" alt="" />
          <p>金管家</p>
          <p>{{ statisticsData.regionGoldButler }}</p>
        </div>
        <div class="DataArea_item">
          <img src="@/assets/home/smallvip.png" alt="" />
          <p>合伙人</p>
          <p>{{ statisticsData.regionPartner }}</p>
        </div>
        <div class="DataArea_item">
          <img src="@/assets/home/smallvip.png" alt="" />
          <p>超级合伙人</p>
          <p>{{ statisticsData.regionSuperPartner }}</p>
        </div>
        <div class="DataArea_item">
          <img src="@/assets/home/smallvip.png" alt="" />
          <p>师傅</p>
          <p>{{ statisticsData.regionMaster }}</p>
        </div>
        <div class="DataArea_item">
          <img src="@/assets/home/smallvip.png" alt="" />
          <p>交易额</p>
          <p>{{ statisticsData.regionTurnover }}<span></span></p>
        </div>
      </div>
      <div class="viewable">
        <TableHeader :header-data="viewble"></TableHeader>
      </div>
      <div class="tableView">
        <VisualChart></VisualChart>
        <InstrumentEacharts
          :quota="statisticsData.regionTurnover"
        ></InstrumentEacharts>
      </div>
    </div>
  </div>
</template>

<script>
// 请求方法
import { getHomeData } from '@/api/homepage/home'
// 分析图
import AnalysisEchats from './echarts/AnalysisEchats'
// 饼状图
import PieChat from './echarts/PieChart'
// 中国地图
import MapChina from './echarts/MapChina'
// 地址选择组件
import AddresSelsect from '../addresSelect/SelectAddress'
// 可视图
import VisualChart from './echarts/VisualChart.vue'
// 仪表盘
import InstrumentEacharts from './echarts/InstrumentEacharts'
import TableHeader from './tabHead/head.vue'
import CommodityEachats from './echarts/CommodityEachats'
export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'HomeContainer',
  components: {
    AnalysisEchats,
    TableHeader,
    InstrumentEacharts,
    VisualChart,
    CommodityEachats,
    AddresSelsect,
    PieChat,
    MapChina
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['newAddres', 'statisticsData'],
  emits: [ 'selectNewAddres' ],
  data() {
    return {
      date: new Date(),
      transactionVolume: [
        { name: '今日交易额', value: '123' },
        // { name: '本月交易额', value: '333' },
        { name: '本年交易额', value: '222' }
      ],
      orderQuantity: [
        { name: '今日订单量', value: '123' },
        // { name: '本月订单量', value: '333' },
        { name: '本年订单量', value: '222' }
      ],
      vipData: [
        // { name: '今日入驻会员', value: '123' },
        // { name: '本月入驻会员', value: '333' },
        { name: '会员总量', value: '222' }
      ],
      unit: ['元', '单', '人'],
      dotStatistics: {
        master: this.statisticsData.masterSum,
        dot: this.statisticsData.regionSum
      },
      analysisDataIndex: 0,
      LeaderboardDataIndex: 0,
      AnyList: { name: '分析图', list: ['交易额', '订单量', '会员量'] },
      Commodity: {
        name: '商品排行',
        list: ['物流', '社区', '商城'],
        listKey: [
          'logisticsGoodsVoList',
          'communityGoodsVoList',
          'mallGoodsVoList'
        ]
      },
      viewble: { name: '可视图', list: ['全年', '自定义'] }
    }
  },
  computed: {
    quickSortData: {
      get() {
        return this.quickSort(this.statisticsData[this.Commodity.listKey[this.LeaderboardDataIndex]])
      }
    },
    shopDataName: {
      get() {
        // 排行榜名字
        const list = []
        this.quickSortData.forEach((item) => {
          list.unshift(item.dictName)
        })
        return list
      }
    },
    shopDataValue: {
      get() {
        // 排行榜数据
        const list = []
        this.quickSortData.forEach((item) => {
          list.unshift(item.amount)
        })
        return list
      }
    },
    listArray: {
      // eslint-disable-next-line vue/return-in-computed-property
      get() {
        if (this.analysisDataIndex === 1) {
          return this.orderQuantity
        }
        if (this.analysisDataIndex === 2) {
          return this.vipData
        }
        return this.transactionVolume
      }
    }
  },
  created() {
    this.getHomeYearDatas()
    this.getHomeDateDatas()
  },
  methods: {
    addresSelect(value) {
      // eslint-disable-next-line vue/custom-event-name-casing
      this.$emit('selectNewAddres', value)
    },
    getDataLists(index) {
      this.LeaderboardDataIndex = index
    },
    getAnlyDatalist(index) {
      // eslint-disable-next-line radix
      this.analysisDataIndex = parseInt(index)
    },
    // 快排，把数据按以小到大排序处理
    quickSort(arr) {
      if (arr.length <= 1) {
        return arr
      }
      const pivot = arr[Math.floor(arr.length / 2)].amount
      const left = []
      const right = []
      const equal = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].amount < pivot) {
          right.push(arr[i])
        } else if (arr[i].amount > pivot) {
          left.push(arr[i])
        } else {
          equal.push(arr[i])
        }
      }
      return this.quickSort(left).concat(equal, this.quickSort(right))
    },
    // 获取首页数据
    getHomeYearDatas() {
      // 请求首页数据 年
      return getHomeData({
        address: this.newAddres,
        date: this.date.getFullYear()
      })
        .then((res) => {
          this.transactionVolume[1].value = res.data.turnoverSum
          this.orderQuantity[1].value = res.data.orderTotal
          this.vipData[0].value = res.data.memberTotal
        })
        .catch((err) => {
          window.console.log(err)
        })
    },
    getHomeDateDatas() {
      // 请求首页数据 日
      return getHomeData({
        address: this.newAddres,
        date:
          this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDate()
      })
        .then((res) => {
          this.transactionVolume[0].value = res.data.toDayTurnoverSum
          this.orderQuantity[0].value = res.data.toDayorderTotal
        })
        .catch((err) => {
          window.console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
.ContainerDataBox {
  margin-top: 1.0417vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 左边数据表格的样式 */
  .dataBox_left {
    width: 52.22%;
    height: 52.6042vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* 分析图表区域样式 */
    .Analysis {
      padding: 38px 32px 17px 32px;
      width: 100%;
      height: 49%;
      background-color: white;
      /* 表尾的数据展示区 */
      .Analysis_footer {
        margin-top: 1.1458vw;
        width: 100%;
        height: 4.7917vw;
        display: flex;
        .Af_item {
          width: 10vw;
          height: 4.7917vw;
          font-family: 思源黑体;
          color: #424e66;
          > p:nth-of-type(1) {
            font-size: 0.8333vw;
            font-weight: normal;
            line-height: 1.25vw;
            display: flex;
            align-items: center;
          }
          > p:nth-of-type(2) {
            > span {
              font-size: 1.6667vw;
              font-weight: normal;
              line-height: 2.0833vw;
              color: #141736;
            }
          }
          > p:nth-of-type(3) {
            margin-top: 0.4167vw;
            font-size: 0.6771vw;
            display: flex;
            align-items: center;
            > span {
              box-sizing: content-box;
              font-weight: normal;
              line-height: 1.0417vw;
              color: #f53f3f;
              padding-right: 0.2083vw;
            }
          }
        }
      }
    }
    .CommodityRanking {
      padding: 38px 32px 17px 32px;
      width: 100%;
      height: 48.6%;
      background-color: white;
    }
  }
  /* 右边表格的整体大小样式 */
  .dataBox_right {
    width: 46.6%;
    height: 52.6042vw;
    background-color: white;
    padding: 38px 32px 17px 32px;
    .DotStatistics {
      position: relative;
      margin-top: 2.1875vw;
      width: 100%;
      height: 20.1042vw;
      font-family: 思源黑体;
      .DSquantity {
        margin-bottom: 0.7813vw;
        > p:nth-of-type(1) {
          display: flex;
          align-items: center;
          font-size: 0.9375vw;
          font-weight: normal;
          line-height: 1.25vw;
          color: #424e66;
          > span {
            margin: 3px;
            display: inline-block;
            width: 0.8333vw;
            height: 0.8333vw;
            border-radius: 50%;
            background-color: #14c9c9;
          }
        }
        > p:nth-of-type(2) {
          font-size: 1.0417vw;
          font-weight: normal;
          line-height: 2.1875vw;
          color: #141736;
          > span {
            margin-top: 0.4688vw;
            margin-right: 3px;
            font-size: 1.5625vw;
          }
        }
      }
    }
    .address {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .DataArea {
      width: 100%;
      height: 7.5vw;
      padding: 19px 0 19px 0;
      display: flex;
      justify-content: space-between;
      .DataArea_item {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-evenly;
        > img {
          width: 1.6667vw;
          height: 1.6667vw;
        }
        > p:nth-of-type(1) {
          font-family: 思源黑体;
          font-size: 0.7292vw;
          font-weight: normal;
          line-height: 1.0417vw;
          color: #424e66;
        }
        > p:nth-of-type(2) {
          font-family: 思源黑体;
          font-size: 1.4583vw;
          font-weight: normal;
          line-height: 1.6667vw;
          color: #141736;
        }
      }
    }
    .tableView {
      position: relative;
      padding: 1.5625vw;
      width: 100%;
      height: 17.1875vw;
      display: flex;
      > img:nth-of-type(1) {
        width: 20.1042vw;
        height: 100%;
      }
    }
  }
}
</style>
