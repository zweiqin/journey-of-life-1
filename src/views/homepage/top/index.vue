<template>
  <!-- 统计区 -->
  <div class="statisticsHeader">
    <p>统计区</p>
    <div class="dataBox">
      <div class="dataBox_item">
        <div class="item_header">
          <div><img src="@/assets/home/VIP.png" alt="" /></div>
          <span>会员统计</span>
        </div>
        <div class="item_footer">
          <div>
            <p>会员总量</p>
            <p>300w+</p>
          </div>
          <div>
            <p>合伙人</p>
            <p>100w+</p>
          </div>
          <div>
            <p>超级合伙人</p>
            <p>10w+</p>
          </div>
          <div>
            <p>金管家</p>
            <p>100w+</p>
          </div>
        </div>
      </div>
      <div class="dataBox_item">
        <div class="item_header">
          <div><img src="@/assets/home/wenjian.png" alt="" /></div>
          <span>订单统计</span>
        </div>
        <div class="item_footer">
          <div>
            <p>订单总量</p>
            <p>300w+</p>
          </div>
          <div>
            <p>今日单量</p>
            <p>100w+</p>
          </div>
          <div>
            <p>异常订单</p>
            <p>10w+</p>
          </div>
          <div>
            <p>完成订单</p>
            <p>100w+</p>
          </div>
        </div>
      </div>
      <div class="dataBox_item">
        <div class="item_header">
          <div><img src="@/assets/home/add.png" alt="" /></div>
          <span>财务统计</span>
        </div>
        <div class="item_footer">
          <div>
            <p>总交易额</p>
            <p>300w+</p>
          </div>
          <div>
            <p>今日交易</p>
            <p>100w+</p>
          </div>
          <div>
            <p>佣金体现</p>
            <p>10w+</p>
          </div>
          <div>
            <p>总支出</p>
            <p>100w+</p>
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
  props: {
    // 用于后期接收数据
    statisticsData: Array
  },
  data() {
    return {
      title: 'hellow'
    }
  },
  created() {

  }
}
</script>

<style lang="scss">
.statisticsHeader {
  padding: 20px 32px;
  font-family: 思源黑体;
  width: 100%;
  height: 290px;
  background-color: #ffffff;
  > p {
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    color: #141736;
  }
  .dataBox {
    margin-top: 30px;
    width: 100%;
    height: 186px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .dataBox_item {
      padding: 20px;
      width: 500px;
      height: 176px;
      border-radius: 6px;
      background: #f7f8fa;
      .item_header {
        display: flex;
        align-items: center;
        > div {
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          border-radius: 50%;
          > img {
            width: 28px;
            height: 28px;
          }
        }
        > span {
          margin-left: 13px;
          font-size: 18px;
          font-weight: 600;
          line-height: 20px;
          color: #141736;
        }
      }
      .item_footer {
        margin-top: 14px;
        display: flex;
        height: 68px;
        > div {
          flex: 1;
          > p:nth-of-type(1) {
            font-size: 14px;
            font-weight: normal;
            line-height: 24px;
            color: #424e66;
          }
          > p:nth-of-type(2) {
            margin-top: 13px;
            font-size: 22px;
            font-weight: normal;
            line-height: 31px;
            color: #141736;
          }
        }
      }
    }
  }
}
</style>
