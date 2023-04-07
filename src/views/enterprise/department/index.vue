<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.search" clearable class="filter-item" style="width: 200px;" placeholder="请输入部门名称或者部门说明" @keyup.enter.native="getList" />
      <el-button
        v-permission="[ `POST /admin${api.queryDepartmentList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" style="margin-left:10px;" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '部门管理')"
    >
      <el-button
        v-permission="[ `POST /admin${api.insertSelective}` ]" size="mini" type="primary" icon="el-icon-plus"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >
        新增部门
      </el-button>
    </TableTools>

    <!-- 部门管理列表 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
      :api-path="api.queryDepartmentList" :columns="columns"
    >
      <template #operate="{ row }">
        <el-button v-permission="[ `GET /admin${api.departmentSelectByPrimaryKey}` ]" size="mini" @click="handleDetail(row)">
          查看
        </el-button>
        <el-button v-permission="[ `POST /admin${api.departmentUpdateByPrimaryKeySelective}` ]" size="mini" @click="handleEdit(row)">
          编辑
        </el-button>
        <el-button v-permission="[ `GET /admin${api.departmentDeleteByPrimaryKey}` ]" type="danger" size="mini" @click="handleDelete(row)">
          删除
        </el-button>
      </template>
    </VxeTable>

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" @success="getList" />
    <!-- 查看详情 -->
    <DetailModal ref="DetailModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  departmentDeleteByPrimaryKey
} from '@/api/enterprise/department'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import DetailModal from './components/DetailModal'
import { columns } from './table'

export default {
  name: 'Department',
  components: {
    VxeTable,
    TableTools,
    EditModal,
    DetailModal
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'department',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        search: ''
      }
    }
  },
  computed: {},
  created() { },
  methods: {
    // 自定义列
    updateFields(columns) {
      this.columns = columns
    },
    getList(meaning) {
      meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
    },
    handleDetail(row) {
      this.$refs.DetailModal && this.$refs.DetailModal.handleOpen(row)
    },
    handleEdit(row) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen(row)
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await departmentDeleteByPrimaryKey({ id })
      this.$elMessage('删除成功!')
      this.getList()
    }
  }
}
</script>
