<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.username"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入标签值"
        @clear="getList"
      />
      <el-button
        v-permission="[`GET /admin${api.partnerApplyList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="handleFilter"
      >查找</el-button>
      <el-button
        v-permission="[`POST /admin${api.goodsTagCreate}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >添加</el-button>
    </div>

    <!-- 查询结果 -->
    <div v-tableHeight>
      <el-table
        height="100%"
        v-loading="listLoading"
        element-loading-text="正在查询中。。。"
        v-bind="$tableCommonOptions"
        :data="list"
      >

        <el-table-column align="center" width="50" label="ID" prop="id" fixed="left" />
        <el-table-column align="center" min-width="100" label="品牌商账户名" prop="username" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="品牌商密码" prop="password" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="会员ID" prop="userId" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="推荐人" prop="referrerName" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="区域编码" prop="regionCode" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="订单ID" prop="orderId" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="审核人ID" prop="operatorId" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="审核人账户名" prop="operatorName" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="审核状态" prop="status">
          <template slot-scope="{row}">
            {{ row.status }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="200" label="备注" prop="comment" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="申请类型" prop="applicationType" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="申请会员昵称" prop="nickname" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="联系方式" prop="mobile" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="创建时间" prop="createTime" />
        <el-table-column align="center" min-width="150" label="更新时间" prop="updateTime" />
        <el-table-column
          label="操作"
          width="150"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <!-- <el-button
              v-permission="[`POST /admin${api.goodsTagUpdate}`]"
              type="primary"
              size="mini"
              @click="handleUpdate(row)"
            >编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
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
  partnerApplyList,
} from '@/api/membershipChain/partnerApply'
import { getToken } from '@/utils/auth';
import { getUserInfo } from '@/api/login';
import Pagination from '@/components/Pagination';

export default {
  name: 'PartnerApply',
  components: {
    Pagination,
  },
  data() {
    return {
      api,
      list: undefined,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
        value: '',
      },
    };
  },
  computed: {
    headers() {
      return {
        'X-Dts-Admin-Token': getToken()
      };
    }
  },
  created() {
    this.getRoles();
  },
  methods: {
    getRoles() {
      getUserInfo(getToken())
        .then(response => {
          this.getList();
        })
        .catch();
    },
    getList() {
      this.listLoading = true;
      partnerApplyList(this.listQuery)
        .then(response => {
          this.list = response.data.items;
          this.total = response.data.total;
          this.listLoading = false;
        })
        .catch(() => {
          this.list = [];
          this.total = 0;
          this.listLoading = false;
        });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    async handleUpdate({ id, value, sortOrder }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, value, sortOrder })
    },
  }
};
</script>
