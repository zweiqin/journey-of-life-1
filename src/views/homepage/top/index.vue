<template>
  <!-- 统计区 -->
  <div class="statisticsHeader">
    <p>统计区</p>
    <div class="dataBox">
      <!-- 每个数据显示的块级 这是第一个 -->
      <div class="dataBox_item">
        <div class="item_header">
          <div><img src="@/assets/home/VIP.png" alt="" /></div>
          <span>会员统计</span>
        </div>
        <div class="item_footer">
          <div>
            <p>会员总量</p>
            <p>{{ statisticsData.memberTotal }}</p>
          </div>
          <div>
            <p>合伙人</p>
            <p>{{ statisticsData.partnerTotal }}</p>
          </div>
          <div>
            <p>超级合伙人</p>
            <p>{{ statisticsData.superPartnerTotal }}</p>
          </div>
          <div>
            <p>金管家</p>
            <p>{{ statisticsData.goldButlerTotal }}</p>
          </div>
        </div>
      </div>
      <!-- 每个数据显示的块级 这是第二个 -->
      <div class="dataBox_item">
        <div class="item_header">
          <div><img src="@/assets/home/wenjian.png" alt="" /></div>
          <span>订单统计</span>
        </div>
        <div class="item_footer">
          <div>
            <p>订单总量</p>
            <p>{{ convertToShortForm(statisticsData.orderTotal) }}</p>
          </div>
          <div>
            <p>今日单量</p>
            <p>{{ convertToShortForm(statisticsData.toDayorderTotal) }}</p>
          </div>
          <div>
            <p>异常订单</p>
            <p>{{ convertToShortForm(statisticsData.exceptionOrderTotal) }}</p>
          </div>
          <div>
            <p>完成订单</p>
            <p>{{ convertToShortForm(statisticsData.completeOrderTotal) }}</p>
          </div>
        </div>
      </div>
      <!-- 每个数据显示的块级 这是第三个 -->
      <div class="dataBox_item">
        <!-- 图标以及提示 -->
        <div class="item_header">
          <div><img src="@/assets/home/add.png" alt="" /></div>
          <span>财务统计</span>
        </div>
        <!-- 显示数据的块 -->
        <div class="item_footer">
          <div>
            <p>总交易额</p>
            <p>{{ statisticsData.turnoverSum }}</p>
          </div>
          <div>
            <p>今日交易</p>
            <p>{{ statisticsData.toDayTurnoverSum }}</p>
          </div>
          <!-- <div>
            <p>佣金提现</p>
            <p>{{ statisticsData.withdrawnBalance }}</p>
            </div> -->
          <div>
            <p>总支出</p>
            <p>
              {{ statisticsData.withdrawnBalance }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'HomeTop',
  // eslint-disable-next-line vue/require-prop-types
  props: [ 'statisticsData' ],
  data() {
    return {
      title: 'hellow'
    }
  },
  created() {},
  methods: {
    convertToShortForm(value) {
      if (Number.isInteger(value)) {
        return value > 10000 ? `${value / 10000}w+` : value
      }
      if (value > 10000) {
        return parseInt(value) > 10000
          ? `${parseInt(value / 10000)}w+`
          : parseInt(value)
      }
      return parseInt(value) > 1000
        ? `${parseInt(value / 1000)}k+`
        : parseInt(value)
    }
  }
}
</script>

<style lang="scss">
.statisticsHeader {
  padding: 20px 32px;
  font-family: 思源黑体;
  width: 100%;
  height: 15.1042vw;
  background-color: #ffffff;
  > p {
    font-size: 1.0417vw;
    font-weight: 500;
    line-height: 1.25vw;
    letter-spacing: 0em;
    color: #141736;
  }
  .dataBox {
    margin-top: 30px;
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .dataBox_item {
      padding: 20px;
      width: 30.8%;
      height: 100%;
      border-radius: 6px;
      background: #f7f8fa;
      /* 每个数据块的头部图标和文字 */
      .item_header {
        display: flex;
        align-items: center;
        > div {
          width: 2.8125vw;
          height: 2.8125vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          border-radius: 50%;
          > img {
            width: 1.4583vw;
            height: 1.4583vw;
          }
        }
        > span {
          margin-left: 13px;
          font-size: 0.9375vw;
          font-weight: 600;
          line-height: 1.0417vw;
          color: #141736;
        }
      }
      /* 每个显示数据的块级 */
      .item_footer {
        margin-top: 0.7292vw;
        display: flex;
        height: 3.5417vw;
        > div {
          text-align: center;
          flex: 1;
          > p:nth-of-type(1) {
            font-size: 0.7292vw;
            font-weight: normal;
            line-height: 1.25vw;
            color: #424e66;
          }
          > p:nth-of-type(2) {
            margin-top: 0.6771vw;
            font-size: 1.1458vw;
            font-weight: normal;
            line-height: 1.6146vw;
            color: #141736;
          }
        }
      }
    }
  }
}
</style>
