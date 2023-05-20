<template>
  <!-- 表格区 -->
  <div class="ContainerDataBox">
    <div class="dataBox_left">
      <div class="Analysis">
        <TableHeader :header-data="AnyList"></TableHeader>
        <AnalysisEchats></AnalysisEchats>
        <!-- 表未数据展示区 -->
        <div class="Analysis_footer">
          <div class="Af_item">
            <p>今日交易额</p>
            <p><span>76.33</span>万元</p>
            <p>
              <img src="@/assets/home/down.png" alt="" /><span>11.2%</span>较昨日
            </p>
          </div>
          <div class="Af_item">
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
          </div>
        </div>
      </div>
      <div class="CommodityRanking">
        <TableHeader :header-data="Commodity"></TableHeader>
        <CommodityEachats></CommodityEachats>
      </div>
    </div>
    <div class="dataBox_right">
      <TableHeader
        :header-data="{ name: '网点统计区', list: [] }"
      ></TableHeader>
      <div class="DotStatistics">
        <div class="DSquantity">
          <p><span></span>网点数量</p>
          <p><span>1000</span>家</p>
        </div>
        <div class="DSquantity" style="margin-bottom: 0px">
          <p><span style="background-color: #165dff"></span>网点数量</p>
          <p><span>1000</span>家</p>
        </div>
        <PieChat></PieChat>
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
        <img src="@/assets/home/sider.png" alt="" srcset="" />
        <img src="@/assets/home/yibiaopan.png" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>

<script>
import MapChina from './echarts/MapChina'
// 地址选择组件
import AddresSelsect from '../addresSelect/SelectAddress'
// 饼状图
import PieChat from './echarts/PieChart'
import TableHeader from './tabHead/head.vue'
import AnalysisEchats from './echarts/AnalysisEchats'
import CommodityEachats from './echarts/CommodityEachats'
export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'HomeContainer',
  components: {
    AnalysisEchats,
    TableHeader,
    CommodityEachats,
    AddresSelsect,
    PieChat,
    MapChina
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['newAddres', 'statisticsData'],
  data() {
    return {
      AnyList: { name: '分析图', list: ['交易额', '订单量', '会员量'] },
      Commodity: { name: '商品排行', list: ['商城', '社区', '物流'] },
      viewble: { name: '可视图', list: ['全年', '自定义'] }
    }
  },
  created() {},
  methods: {
    addresSelect(value) {
      this.$emit('selectNewAddres', value)
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
