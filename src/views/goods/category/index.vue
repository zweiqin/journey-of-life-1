<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.id"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="输入类目ID"
        @clear="getList"
      />
      <el-input
        v-model="listQuery.name"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="输入类目名称"
        @clear="getList"
      />
      <el-button
        v-permission="[`GET /admin${api.categoryList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查找</el-button>
      <el-button
        v-permission="[`POST /admin${api.categoryCreate}`]"
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
        :data="list"
        v-bind="$tableCommonOptions"
      >

        <el-table-column align="center" width="100" label="ID" prop="id" fixed="left" />
        <el-table-column align="center" width="150" label="类目名" prop="name" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="类目图标" prop="iconUrl">
          <template slot-scope="{row}">
            <img v-if="row.iconUrl" :src="row.iconUrl" width="40" />
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="类目图片" prop="picUrl">
          <template slot-scope="{row}">
            <img v-if="row.picUrl" :src="row.picUrl" width="40" />
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="关键字" prop="keywords" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="简介" prop="desc" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="级别" prop="level">
          <template slot-scope="{row}">
            <el-tag v-if="row.level === 'L1'" type="primary" effect="plain">一级类目</el-tag>
            <el-tag v-else-if="row.level === 'L2'" type="success" effect="plain">二级类目</el-tag>
            <el-tag v-else-if="row.level === 'L3'" type="info" effect="plain">三级类目</el-tag>
            <el-tag v-else type="info">{{ row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="父类目ID" prop="pid" />
        <el-table-column align="center" width="150" label="创建时间" prop="addTime" />
        <el-table-column align="center" width="150" label="更新时间" prop="updateTime" />
        <el-table-column
          align="center"
          label="操作"
          width="120"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-permission="[`POST /admin${api.issueUpdate}`]"
              type="primary"
              size="mini"
              @click="handleUpdate(row)"
            >编辑</el-button>
            <el-button
              v-permission="[`POST /admin${api.categoryDelete}`]"
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
  </div>
</template>

<script>
import {
  api,
  categoryL1,
  categoryL2, 
  categoryList,
  categoryDelete
} from '@/api/business/category'

import { getToken } from '@/utils/auth';
import { getUserInfo } from '@/api/login';
import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination
import EditModal from './components/EditModal'
import { goodsCatAndBrand } from '@/api/business/goods'

export default {
  name: 'Category',
  components: {
    Pagination,
    EditModal,
  },
  filters: {
    typeFilter(val, list = []) {
      const obj = list.find(item => +item.code === +val)
      return obj ? obj.value : '--'
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
        id: '',
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
      categoryList(this.listQuery)
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
    async handleUpdate({ id }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await categoryDelete({ id })
      this.$elMessage('删除成功!')
      this.handleFilter()
    }
  }
};
</script>
