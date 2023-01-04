<template>
  <div class="app-container">
    <ul>
      <li class="red">
        访问数量: <strong>{{ statisticalDetail.visitCount | numberFilter }}</strong>
      </li>
      <li class="red">
        导入数量: <strong>{{ statisticalDetail.importCount | numberFilter }}</strong>
      </li>
      <li class="red">
        新增数量: <strong>{{ statisticalDetail.insertCount | numberFilter }}</strong>
      </li>
      <li class="red">
        消费人数: <strong>{{ statisticalDetail.consumeCount | numberFilter }}</strong>
      </li>
      <li class="red">
        日均进店人数: <strong>{{ statisticalDetail.dayNumber | numberFilter }}</strong>
      </li>
    </ul>
    <ul>
      <li class="green">
        日均进店人数: <strong>{{ statisticalDetail.dayNumber | numberFilter }}</strong>
      </li>
      <li class="green">
        男性: <strong>{{ statisticalDetail.manCount | radioFilter }}</strong>
      </li>
      <li class="green">
        女性: <strong>{{ statisticalDetail.womanCount | radioFilter }}</strong>
      </li>
      <li class="green">
        未知: <strong>{{ statisticalDetail.unknownCount | radioFilter }}</strong>
      </li>
    </ul>
    <ul>
      <li class="orange">
        未消费: <strong>{{ statisticalDetail.statusCount.count1 | radioFilter }}</strong>
      </li>
      <li class="orange">
        一次性消费: <strong>{{ statisticalDetail.statusCount.count2 | radioFilter }}</strong>
      </li>
      <li class="orange">
        二次消费: <strong>{{ statisticalDetail.statusCount.count3 | radioFilter }}</strong>
      </li>
      <li class="orange">
        三次及以上消费: <strong>{{ statisticalDetail.statusCount.count4 | radioFilter }}</strong>
      </li>
    </ul>

    <el-row style="margin-top:50px;">
      <el-col :span="12">
        <LineBarChart
          height="400px"
          :option="chartOption1"
        />
      </el-col>
      <el-col :span="12">
        <LineBarChart
          height="400px"
          :option="chartOption2"
        />
      </el-col>
    </el-row>
  </div>
</template> 


<script>
import { getToken } from '@/utils/auth';
import { getUserInfo } from '@/api/login';
import { statisticalHome } from '@/api/businessManagement/marketingPortrait';
import XeUtils from 'xe-utils'
import { commafyFn } from '@/utils'
import LineBarChart from '@/components/LineBarChart'
import { initChartOption, defaultPieSeries } from './utils'
import { objDeepMerge, keepTwoDecimal } from '@/utils'

export default {
  name: 'MarketingPortrait',
  components: {
    LineBarChart
  },
  filters: {
    radioFilter(v) {
      return v ? XeUtils.round(v * 100, 2) + '%' : '0%'
    },
    numberFilter(v) {
      return commafyFn(v)
    }
  },
  computed: {
    headers() {
      return {
        'X-Dts-Admin-Token': getToken()
      };
    }
  },
  data() {
    return {
      statisticalDetail: {
        statusCount: {}
      },
      chartOption1: {},
      chartOption2: {}
    }
  },
  mounted() {
    this.getRoles()
  },
  methods: {
    getRoles() {
      getUserInfo(getToken())
        .then(response => {
          this.initData();
        })
        .catch();
    },
    async initData() {
      const res = await statisticalHome()
      this.statisticalDetail = res.data
      const genderObj = {
        manCount: '男性',
        womanCount: '女性',
        unknownCount: '未知',
      }
      const consumeObj = {
        count1: '未消费',
        count2: '一次性消费',
        count3: '二次消费',
        count4: '三次及以上消费',
      }
      this.chartOption1 = this.initChart('性别比例', Object.keys(genderObj).map(key => ({
        key,
        name: genderObj[key],
        value: res.data[key] ? XeUtils.round(res.data[key] * 100, 2) : 0
      })))
      this.chartOption2 = this.initChart('用户分析', Object.keys(consumeObj).map(key => ({
        key,
        name: consumeObj[key],
        value: res.data.statusCount[key] ? XeUtils.round(res.data.statusCount[key] * 100, 2) : 0
      })))
    },
    initChart(name, data) {
      const series = [
        objDeepMerge(defaultPieSeries, {
          radius: ['40%', '60%'],
          data,
          labelLine: {
            length: 14
          }
        })
      ]
      return initChartOption(name, data, series)
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  margin-bottom: 20px;
  li {
    &.red {
      border-color: #f56c6c;
      &::before {
        background: #f56c6c;
      }
    }
    &.orange {
      border-color: #e6a23c;
      &::before {
        background: #e6a23c;
      }
    }
    &.green {
      border-color: #67c23a;
      &::before {
        background: #67c23a;
      }
    }
    display: flex;
    align-items: center;
    margin-right: 20px;
    padding-right: 20px;
    border: 1px solid #ccc;
    font-size: 16px;
    border-radius: 4px;
    &::before {
      content: "";
      display: inline-block;
      width: 16px;
      height: 40px;
      background: #ccc;
      margin-right: 8px;
    }
    strong {
      margin-left: 10px;
    }
  }
}
</style>
