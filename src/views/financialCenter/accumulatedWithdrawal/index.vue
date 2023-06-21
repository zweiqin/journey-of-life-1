<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div>
      <el-select v-model="listQuery.type" clearable class="filter-item" style="width: 200px;" placeholder="选择查询类型">
        <el-option label="店长" :value="0" />
        <el-option label="师傅" :value="1" />
      </el-select>
      <el-button
        v-permission="[ `POST /admin${api.financeWithdrawalStatistics}` ]" size="mini" class="filter-item"
        type="primary" icon="el-icon-search" style="margin-left:10px;" @click="getData"
      >
        查找
      </el-button>
    </div>
    <div style="margin-top: 20px;">
      <div
        v-if="data.statusList && data.statusList.length"
        style="padding: 30px 60px 40px;background-color: #ececec;border-radius: 30px;"
      >
        <div style="font-size: 28px;font-weight: bold;">订单状态统计</div>
        <div style="display: flex;flex-wrap: wrap;justify-content: space-around;margin-top: 10px;">
          <div
            v-for="(item, index) in data.statusList" :key="index"
            style="padding: 15px;border-radius: 14px;background-color: #e1fcfc;"
          >
            <div style="font-size: 20px;">
              <span v-if="item.name == 0">待审核</span>
              <span v-else-if="item.name == 1">已审核</span>
              <span v-else-if="item.name == 2">未通过审核</span>
              <span v-else>--</span>
            </div>
            <div style="display: flex;align-items: center;margin-top: 4px;">
              <div>数量</div>
              <div style="margin-left: 22px;font-size: 24px;font-weight: bold;">{{ item.price }}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="data.wokerList && data.wokerList.length"
        style="margin-top: 20px;padding: 30px 60px 40px;background-color: #fdfdfd;border: 1px solid #cccccc;border-radius: 30px;"
      >
        <div style="font-size: 28px;font-weight: bold;">
          累计提现前 {{ data.wokerList.length < 10 ? data.wokerList.length : 10 }} 名
        </div>
        <div style="margin-top: 22px;">
          <el-table :data="data.wokerList" stripe highlight-current-row style="width: fit-content">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="name" label="提现人" width="180">
            </el-table-column>
            <el-table-column prop="price" label="已提现金额" width="180">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api, financeWithdrawalStatistics } from '@/api/financialCenter/accumulatedWithdrawal'

export default {
  name: 'AccumulatedWithdrawal',
  components: {},
  data() {
    return {
      api,
      listQuery: {
        type: 0
      },
      data: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const loading = this.$elLoading()
      try {
        const res = await financeWithdrawalStatistics(this.listQuery)
        console.log(res)
        this.data = res.data
        loading.close()
      } catch (e) {
        loading.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
