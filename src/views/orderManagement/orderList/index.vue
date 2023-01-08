<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.nickname"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入昵称"
      />
      <el-input
        v-model="listQuery.mobile"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入电话"
      />
      <el-input
        v-model="listQuery.userLevel"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入会员等价"
      />
      <el-input
        v-model="listQuery.region"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入区域编码"
      />
      <el-button
        v-permission="[`GET /admin${api.orderList}`]"
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
        :data="list"
        v-bind="$tableCommonOptions"
      >

        <el-table-column align="center" width="100" label="ID" prop="id" fixed="left" />
        <el-table-column align="center" min-width="150" label="用户名" prop="username" show-overflow-tooltip fixed="left" />
        <el-table-column align="center" min-width="100" label="性别" prop="gender">
          <template slot-scope="{row}">
            {{ row.gender | genderFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="生日" prop="birthday" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="用户层级" prop="userLevel" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="昵称" prop="nickname" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="电话" prop="mobile" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="头像" prop="avatar">
          <template slot-scope="{row}">
            <el-image v-if="row.avatar" :src="row.avatar" style="width:40px; height:40px" fit="cover" :preview-src-list="[row.avatar]" />
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="100" label="区域编码" prop="regionCode" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="门店备注" prop="brandRemark" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="平台备注" prop="platformRemark" show-overflow-tooltip />
        <el-table-column v-if="isAdmin" align="center" min-width="150" label="用户在门店中的等级" prop="brandLevelDesc" show-overflow-tooltip />
        <el-table-column v-if="isAdmin || isShop" align="center" min-width="150" label="负责人名称" prop="principalName" show-overflow-tooltip />
        <el-table-column align="center" min-width="160" label="用户在平台的角色简称" prop="userLevelDesc" show-overflow-tooltip />
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
              v-permission="[`POST /admin${api.userUpdate}`]"
              type="primary"
              size="mini"
              @click="handleEdit(row)"
            >编辑</el-button>
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

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  orderList,
} from '@/api/orderManagement/order'
import Pagination from '@/components/Pagination';
import EditModal from './components/EditModal'
import { mapGetters } from 'vuex'

export default {
  name: 'OrderList',
  components: {
    Pagination,
    EditModal,
  },
  filters: {
    genderFilter(val) {
      return {
        0: '未知',
        1: '男',
        2: '女',
      }[val] || '--'
    }
  },
  computed: {
    ...mapGetters([
      'roles',
    ]),
    isAdmin() {
      return this.roles.includes('超级管理员')
    },
    isShop() {
      return this.roles.includes('门店')
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
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      try {
        const res = await orderList(this.listQuery)
        this.list = res.data.items;
        this.total = res.data.total;
      } finally {
        this.listLoading = false;
      }
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    async handleEdit({ id, birthday, regionCode, brandRemark, platformRemark }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, birthday, regionCode, brandRemark, platformRemark })
    },
  }
};
</script>
