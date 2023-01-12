<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.userId"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入会员ID"
      />
      <el-select
        v-model="listQuery.status"
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
        v-permission="[`GET /admin${api.commissionList}`]"
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
        <el-table-column align="center" width="50" label="ID" prop="id" fixed="left" />
        <el-table-column align="center" min-width="100" label="申请提现的会员ID" prop="userId" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="提现的佣金金额" prop="commission" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="状态" prop="status">
          <template slot-scope="{row}">
            {{ row.status | typeFilter(statusList) }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="200" label="备注" prop="remark" />
        <el-table-column align="center" width="150" label="创建时间" prop="addTime" />
        <el-table-column align="center" width="150" label="更新时间" prop="updateTime" />
        <el-table-column
          label="操作"
          width="150"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.status==0"
              v-permission="[`POST /admin${api.commissionGrant}`]"
              type="success"
              size="mini"
              @click="handleApproval(row)"
            >放款</el-button>
            <el-button
              v-if="row.status==0"
              v-permission="[`POST /admin${api.commissionRevoke}`]"
              type="danger"
              size="mini"
              @click="handleReject(row)"
            >拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <Pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 提现审批 -->
    <ApprovalModal ref="ApprovalModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  commissionList,
  commissionRevoke
} from '@/api/brand/commission'
import Pagination from '@/components/Pagination';
import ApprovalModal from './components/ApprovalModal';

export default {
  name: 'CommissionList',
  components: {
    Pagination,
    ApprovalModal,
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
        userId: '',
        status: '',
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
        const res = await commissionList(this.listQuery)
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
    // 审批
    handleApproval({ id }) {
      this.$refs.ApprovalModal && this.$refs.ApprovalModal.handleOpen({ id })
    },
    // 驳回
    async handleReject({ id }) {
      const remark = await this.$elPrompt('驳回理由')
      await commissionRevoke({
        id,
        remark,
      })
      this.$elMessage('操作成功!')
      this.getList()
    },
  }
};
</script>
