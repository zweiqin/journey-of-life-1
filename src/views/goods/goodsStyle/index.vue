<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.value"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入标签值"
        @clear="getList"
      />
      <el-button
        v-permission="[`GET /admin${api.goodsStyleList}`]"
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
        :data="list"
        v-bind="$tableCommonOptions"
      >

        <el-table-column align="center" width="50" label="ID" prop="id" fixed="left" />
        <el-table-column align="center" min-width="150" label="标签值" prop="value" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="排序" prop="sortOrder" />
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
              v-permission="[`POST /admin${api.msgsayUpdateSay}`]"
              type="primary"
              size="mini"
              @click="handleUpdate(row)"
            >编辑</el-button>
            <el-button
              v-permission="[`POST /admin${api.goodsStyleUpdate}`]"
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
      :limit.sync="listQuery.size"
      @pagination="getList"
    />

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  goodsStyleList,
  goodsStyleDelete
} from '@/api/business/goodsStyle'
import { getToken } from '@/utils/auth';
import { getUserInfo } from '@/api/login';
import Pagination from '@/components/Pagination';
import EditModal from './components/EditModal'

export default {
  name: 'GoodsStyle',
  components: {
    Pagination,
    EditModal,
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
      goodsStyleList(this.listQuery)
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
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await goodsStyleDelete({ id })
      this.$elMessage('删除成功!')
      this.handleFilter()
    }
  }
};
</script>
