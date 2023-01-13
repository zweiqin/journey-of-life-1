<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入风格名称"
      />
      <el-button
        v-permission="[`GET /admin${api.brandStyleList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="handleSearch"
      >查找</el-button>
      <br />
      <el-button
        v-permission="[`POST /admin${api.brandStyleCreate}`]"
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
        <el-table-column align="center" width="100" label="ID" prop="id" fixed="left" />
        <el-table-column align="center" min-width="150" label="风格名称" prop="name" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="图片" prop="picUrl">
          <template slot-scope="{row}">
            <el-image v-if="row.picUrl" :src="row.picUrl" style="width:40px; height:40px" fit="cover" :preview-src-list="[row.picUrl]" />
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
  brandStyleList,
  brandStyleDelete
} from '@/api/brand/brandStyle'
import Pagination from '@/components/Pagination';
import EditModal from './components/EditModal'

export default {
  name: 'BrandStyle',
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
        const res = await brandStyleList(this.listQuery)
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
    async handleUpdate({ id, value, sortOrder }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, value, sortOrder })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await brandStyleDelete({ id })
      this.$elMessage('删除成功!')
      this.handleSearch()
    }
  }
};
</script>
