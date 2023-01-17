<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入角色名称"
      />
      <el-button
        v-permission="[`GET /admin${api.roleList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="handleSearch"
      >查找</el-button>
      <br />
      <el-button
        v-permission="[`POST /admin${api.roleCreate}`]"
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
        <el-table-column align="center" width="50" label="序号" type="index" :index="tableMixin_indexMethod" fixed="left" />
        <el-table-column align="center" width="100" label="ID" prop="id" fixed="left" />
        <el-table-column align="center" min-width="100" label="部门名称" prop="name" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="说明" prop="desc" />
        <el-table-column align="center" width="150" label="创建时间" prop="addTime" />
        <el-table-column align="center" width="150" label="更新时间" prop="updateTime" />
        <el-table-column
          label="操作"
          width="200"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-permission="[`POST /admin${api.roleUpdate}`]"
              size="mini"
              @click="handleEdit(row)"
            >编辑</el-button>
            <el-button
              v-permission="[`POST /admin${api.rolePermissionsUpdate}`]"
              type="warning"
              size="mini"
              @click="$refs.PermissionModal && $refs.PermissionModal.handleOpen({ id: row.id })"
            >授权</el-button>
            <el-button
              v-permission="[`POST /admin${api.roleDelete}`]"
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
    <EditModal ref="EditModal" @success="getList" />
    <!-- 权限配置 -->
    <PermissionModal ref="PermissionModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  roleList,
  roleDelete,
} from '@/api/enterprise/role'
import { getToken } from '@/utils/auth';
import { getUserInfo } from '@/api/login';
import Pagination from '@/components/Pagination';
import EditModal from './components/EditModal'
import PermissionModal from './components/PermissionModal'

export default {
  name: 'Permissions',
  components: {
    Pagination,
    EditModal,
    PermissionModal,
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
      roleList(this.listQuery)
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
    async handleEdit({ id, name, desc }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, name, desc })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await roleDelete({ id })
      this.$elMessage('删除成功!')
      this.handleSearch()
    }
  }
};
</script>
