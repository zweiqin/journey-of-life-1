<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <el-input
        v-model="listQuery.userId"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="输入获得佣金的会员ID"
      />
      <el-input
        v-model="listQuery.produceUserId"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="输入产生订单的会员ID"
      /> -->
      <el-select
        v-model="listQuery.type"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="选择状态"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-permission="[`GET /admin${api.commissionRecordList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="handleSearch"
      >查找</el-button>
    </div>

    <!-- 查询结果 -->
    <div v-tableHeight>
      <el-table
        height="100%"
        v-loading="listLoading"
        element-loading-text="正在查询中。。。"
        :data="list"
        v-bind="$tableCommonOptions"
      >
        <el-table-column align="center" width="50" label="序号" type="index" :index="tableMixin_indexMethod" fixed="left" />
        <el-table-column align="center" width="100" label="ID" prop="id" fixed="left" />
        <el-table-column align="center" min-width="100" label="佣金" prop="commission" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="获得佣金的会员ID" prop="userId" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="升级或者产生订单的会员id" prop="produceUserId" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="发放或使用佣金时间" prop="grantTime" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="状态" prop="type">
          <template slot-scope="{row}">
            {{ row.type | typeFilter(statusList) }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="创建时间" prop="addTime" />
        <el-table-column align="center" min-width="150" label="更新时间" prop="updateTime" />
      </el-table>
    </div>

    <Pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  api,
  commissionRecordList,
} from '@/api/brand/commission'
import Pagination from '@/components/Pagination';

export default {
  name: 'CommissionRecordList',
  components: {
    Pagination,
  },
  filters: {
    typeFilter(val, list = []) {
      const obj = list.find(item => item.value === +val)
      return obj ? obj.label : '--'
    }
  },
  data() {
    return {
      api,
      list: undefined,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        // userId: '',
        // produceUserId: '',
        type: '',
      },
      statusList: [
        { label: '升级产生', value: 1 },
        { label: '商品购买产生', value: 2 },
        { label: '佣金提现', value: 3 },
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      try {
        const res = await commissionRecordList(this.listQuery)
        this.list = res.data.items;
        this.total = res.data.total;
      } finally {
        this.listLoading = false;
      }
    },
    handleSearch() {
      this.listQuery.page = 1;
      this.getList();
    },
  }
};
</script>
