<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-select
        v-model="listQuery.level"
        class="filter-item"
        style="width: 200px;"
        placeholder="选择类型"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-permission="[`GET /admin${api.comModuleList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="handleSearch"
      >查找</el-button>
      <el-button
        v-permission="[`POST /admin${api.comModuleAdd}`]"
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
        <el-table-column align="center" min-width="150" label="板块名" prop="name" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="类型" prop="level">
          <template slot-scope="{row}">
            {{ row.level | typeFilter(statusList) }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="业务费用" prop="cost" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="业务内容" prop="content" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="备注" prop="remark" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="费用类型" prop="costType">
          <template slot-scope="{row}">
            {{ row.costType | typeFilter(costTypeList) }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="创建时间" prop="addTime" />
        <el-table-column align="center" min-width="150" label="更新时间" prop="updateTime" />
        <el-table-column
          label="操作"
          width="120"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-permission="[`POST /admin${api.comModuleUpdate}`]"
              size="mini"
              @click="handleUpdate(row)"
            >编辑</el-button>
            <el-button
              v-permission="[`POST /admin${api.comModuleDeleted}`]"
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
  comModuleList,
  comModuleDeleted
} from '@/api/brand/commissionSetting'
import Pagination from '@/components/Pagination';
import EditModal from './components/EditModal'

export default {
  name: 'CommissionSetting',
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
        level: 1,
      },
      statusList: [
        { label: '板块', value: 1 },
        { label: '业务', value: 2 },
      ],
      costTypeList: [
        { label: '金额', value: 1 },
        { label: '比例', value: 2 },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      try {
        const res = await comModuleList(this.listQuery)
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
    async handleUpdate({ id, level, pid, name, cost, content, remark, costType }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, level, pid, name, cost, content, remark, costType })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await comModuleDeleted({ id })
      this.$elMessage('删除成功!')
      this.handleSearch()
    },
  }
};
</script>
