<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.userId"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入用户ID"
        @clear="getList"
      />
       <el-select
        v-model="listQuery.status"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="选择状态"
        @clear="getList"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-permission="[`GET /admin${api.partnerApplyList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="handleFilter"
      >查找</el-button>
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
            {{ row.status | typeFilter(statusList) }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="200" label="备注" prop="comment" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="申请类型" prop="applicationType" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="申请会员昵称" prop="nickname" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="联系方式" prop="mobile" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="创建时间" prop="createTime" />
        <el-table-column align="center" min-width="150" label="更新时间" prop="updateTime" />
        <el-table-column
          align="center"
          label="操作"
          width="200"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.status == 0"
              v-permission="[`POST /admin${api.partnerApplyManage}`]"
              type="primary"
              size="mini"
              @click="handleUpdate(row.id, 5)"
            >开始审核</el-button>
            <el-button
              v-if="row.status == 1"
              v-permission="[`POST /admin${api.partnerApplyManage}`]"
              type="danger"
              size="mini"
              @click="handleUpdate(row.id, 2)"
            >驳回</el-button>
            <el-button
              v-if="row.status == 1"
              v-permission="[`POST /admin${api.partnerApplyManage}`]"
              type="primary"
              size="mini"
              @click="handleUpdate(row.id, 7)"
            >已通过,待付款</el-button>
            <el-button
              v-permission="[`POST /admin${api.partnerApplySignin}`]"
              v-if="row.status == 5"
              type="warning"
              size="mini"
              @click="handleUpgrade(row)"
            >手动升级</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
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
  partnerApplyList,
  partnerApplyManage,
  partnerApplySignin,
} from '@/api/membershipChain/partnerApply'
import { getToken } from '@/utils/auth';
import { getUserInfo } from '@/api/login';
import Pagination from '@/components/Pagination';

export default {
  name: 'PartnerApply',
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
        userId: '',
        status: '',
      },
      statusList: [
        { label: '用户主动撤销', value: -2 },
        { label: '已驳回', value: -3 },
        { label: '待审核', value: 0 },
        { label: '审核中', value: 1 },
        { label: '已通过,待付款', value: 2 },
        { label: '已付款', value: 4 },
        { label: '未升级', value: 5 },
        { label: '已升级', value: 6 },
      ]
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
    async handleUpdate(id, stateEnum) {
      await partnerApplyManage({
        id,
        stateEnum
      })
      this.$elMessage('操作成功!')
      this.getList()
    },
    // 状态5的时候，手动升级
    async handleUpgrade({ id, userId }) {
      await partnerApplySignin({
        id,
        userId
      })
      this.$elMessage('操作成功!')
      this.getList()
    },
  }
};
</script>
