<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button
        v-permission="[`GET /admin${api.brandLevelList}`]"
        size="mini"
        class="filter-item"
        icon="el-icon-refresh"
        @click="handleSearch"
      >刷新</el-button>
      <el-button
        v-permission="[`POST /admin${api.brandLevelCreate}`]"
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

        <el-table-column align="center" width="100" label="序号" prop="id" fixed="left" />
        <el-table-column align="center" width="100" label="门店ID" prop="brandId" />
        <el-table-column align="center" min-width="100" label="等级层级" prop="levelTier" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="等级名称" prop="name" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="等级折扣" prop="discount" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="等级描述" prop="description" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="等级所需消费总额" prop="moneyCriterion" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="等级所需消费次数" prop="countCriterion" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="等级所需消费的产品" prop="goodIdCriterion" show-overflow-tooltip />
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
              v-permission="[`POST /admin${api.brandLevelUpdate}`]"
              size="mini"
              @click="handleUpdate(row)"
            >编辑</el-button>
            <el-button
              v-permission="[`POST /admin${api.brandLevelDelete}`]"
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
  brandLevelList,
  brandLevelDelete
} from '@/api/brand/brandLevel'
import Pagination from '@/components/Pagination';
import EditModal from './components/EditModal'

export default {
  name: 'BrandLevel',
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
        const res = await brandLevelList(this.listQuery)
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
    async handleUpdate({ id, levelTier, name, discount, description, moneyCriterion, countCriterion, goodIdCriterion }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, levelTier, name, discount, description, moneyCriterion, countCriterion, goodIdCriterion })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await brandLevelDelete({ id })
      this.$elMessage('删除成功!')
      this.handleSearch()
    }
  }
};
</script>
