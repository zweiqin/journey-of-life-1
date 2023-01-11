<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.keyword"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="输入关键字"
      />
      <el-input
        v-model="listQuery.url"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="输入链接"
      />
      <el-button
        v-permission="[`GET /admin${api.keywordList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleSearch"
      >查找</el-button>
      <el-button
        v-permission="[`POST /admin${api.keywordCreate}`]"
        size="mini"
        class="filter-item"
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
        <el-table-column align="center" min-width="100" label="关键字" prop="keyword" fixed="left" />
        <el-table-column align="center" min-width="150" label="跳转链接" prop="url">
          <template slot-scope="{row}">
            <a :href="row.url" target="_blank">{{ row.url }}</a>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="是否推荐" prop="isHot">
          <template slot-scope="{row}">
            <el-tag v-if="row.isHot" type="success" effect="plain">是</el-tag>
            <el-tag v-else type="danger" effect="plain">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="是否默认" prop="isDefault">
          <template slot-scope="{row}">
            <el-tag v-if="row.isDefault" type="success" effect="plain">是</el-tag>
            <el-tag v-else type="danger" effect="plain">否</el-tag>
          </template>
        </el-table-column>
      
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
              v-permission="[`POST /admin${api.keywordUpdate}`]"
              size="mini"
              @click="handleUpdate(row)"
            >编辑</el-button>
            <el-button
              v-permission="[`POST /admin${api.keywordDelete}`]"
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

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  keywordList,
  keywordDelete,
} from '@/api/goods/keyword';
import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination
import EditModal from './components/EditModal'
import { goodsCatAndBrand } from '@/api/goods/goodsList'

export default {
  name: 'Issue',
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
        size: 20,
        keyword: '',
        url: '',
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
        const res = await keywordList(this.listQuery)
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
    async handleUpdate({ id, keyword, url, isHot, isDefault }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, keyword, url, isHot, isDefault })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await keywordDelete({ id })
      this.$elMessage('删除成功!')
      this.handleSearch()
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #1890ff;
  text-decoration: underline;
}
</style>
