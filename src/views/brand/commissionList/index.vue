<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button
        v-permission="[`POST /admin${api.commissionRecordList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleSearch"
      >刷新</el-button>
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

        <el-table-column align="center" width="50" label="ID" prop="id" fixed="left" />
        <el-table-column align="center" min-width="100" label="申请提现的会员id" prop="userId" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="提现的佣金金额" prop="commission" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="当前佣金余额" prop="balance" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="状态" prop="type">
          <template slot-scope="{row}">
            {{ row.type | typeFilter(statusList) }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="创建时间" prop="addTime" />
        <el-table-column align="center" min-width="150" label="更新时间" prop="updateTime" />
        <el-table-column
          label="操作"
          width="150"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-permission="[`POST /admin${api.brandStyleUpdate}`]"
              size="mini"
              @click="handleUpdate(row)"
            >编辑</el-button>
            <el-button
              v-permission="[`POST /admin${api.brandStyleDelete}`]"
              type="danger"
              size="mini"
              @click="handleDelete(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <Pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
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
  name: 'CommissionList',
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
        name: '',
      },
      statusList: [
        { label: '申请中', value: 0 },
        { label: '失败', value: -1 },
        { label: '成功', value: 1 },
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
