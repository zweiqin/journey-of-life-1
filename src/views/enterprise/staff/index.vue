<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入员工姓名"
      />
      <el-input
        v-model="listQuery.phone"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入员工电话"
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
        v-permission="[`GET /admin${api.staffList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="handleSearch"
      >查找</el-button>
      <br />
      <el-button
        v-permission="[`POST /admin${api.staffCreate}`]"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >添加</el-button>
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

        <el-table-column align="center" width="100" label="序号" prop="id" fixed="left" />
        <el-table-column align="center" width="100" label="系统账户id" prop="adminId" />
        <el-table-column align="center" width="150" label="部门名称" prop="roleName" />
        <el-table-column align="center" width="150" label="员工姓名" prop="name" show-overflow-tooltip />
        <el-table-column align="center" width="150" label="员工电话" prop="phone" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="员工地址" prop="address" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="在职状态" prop="status">
          <template slot-scope="{row}">
            {{ row.status | typeFilter(statusList) }}
          </template>
        </el-table-column>
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
              v-permission="[`POST /admin${api.staffUpdate}`]"
              size="mini"
              @click="handleUpdate(row)"
            >编辑</el-button>
            <el-button
              v-permission="[`POST /admin${api.staffDelete}`]"
              type="danger"
              size="mini"
              @click="handleDelete(row)"
            >删除</el-button>
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

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" :list="statusList" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  staffList,
  staffDelete,
} from '@/api/enterprise/staff'
import { getToken } from '@/utils/auth';
import { getUserInfo } from '@/api/login';
import Pagination from '@/components/Pagination';
import EditModal from './components/EditModal'

export default {
  name: 'Staff',
  components: {
    Pagination,
    EditModal,
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
        phone: '',
        status: '',
      },
      statusList: [
        { label: '离职', value: -1 },
        { label: '全职在职', value: 0 },
        { label: '兼职在职', value: 1 },
        { label: '其他', value: 2 },
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
      staffList(this.listQuery)
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
    handleSearch() {
      this.listQuery.page = 1;
      this.getList();
    },
    async handleUpdate({ id, value, sortOrder }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, value, sortOrder })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await staffDelete({ id })
      this.$elMessage('删除成功!')
      this.handleSearch()
    }
  }
};
</script>
