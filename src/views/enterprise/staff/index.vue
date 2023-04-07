<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name" clearable class="filter-item" style="width: 200px;"
        placeholder="请输入员工姓名"
        @keyup.enter.native="getList"
      />
      <el-input
        v-model="listQuery.phone" clearable class="filter-item" style="width: 200px;"
        placeholder="请输入员工电话"
        @keyup.enter.native="getList"
      />
      <el-select v-model="listQuery.status" clearable class="filter-item" style="width: 200px;" placeholder="选择状态">
        <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button
        v-permission="[ `GET /admin${api.staffList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" style="margin-left:10px;" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '员工管理')"
    >
      <el-button
        v-permission="[ `POST /admin${api.staffCreate}` ]" size="mini" type="primary" icon="el-icon-plus"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >
        添加
      </el-button>
    </TableTools>

    <!-- 员工管理列表 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
      :api-path="api.staffList" :columns="columns"
    >
      <template #status="{ row }">
        <span>{{ row.status | typeFilter(statusList) }}</span>
      </template>
      <template #operate="{ row }">
        <el-button v-permission="[ `GET /admin${api.staffDetail}` ]" size="mini" @click="handleDetail(row)">
          查看
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.rolePermissionsUpdate}` ]" type="warning" size="mini"
          @click="$refs.PermissionModal && $refs.PermissionModal.handleOpen({ id: row.roleId })"
        >
          授权
        </el-button>
        <el-button v-permission="[ `POST /admin${api.staffUpdate}` ]" size="mini" @click="handleUpdate(row)">
          编辑
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.staffDelete}` ]" type="danger" size="mini"
          @click="handleDelete(row)"
        >
          删除
        </el-button>
      </template>
    </VxeTable>

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" :list="statusList" @success="getList" />
    <!-- 查看详情 -->
    <DetailModal ref="DetailModal" @success="getList" />
    <!-- 权限配置 -->
    <PermissionModal ref="PermissionModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  staffList,
  staffDelete
} from '@/api/enterprise/staff'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import DetailModal from './components/DetailModal'
import PermissionModal from './components/PermissionModal'
import { columns } from './table'

export default {
  name: 'Staff',
  components: {
    VxeTable,
    TableTools,
    EditModal,
    DetailModal,
    PermissionModal
  },
  filters: {
    typeFilter(val, list = []) {
      const obj = list.find((item) => item.value === +val)
      return obj ? obj.label : '--'
    }
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'staff',
        columnsOptions: columns
      },
      list: undefined,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        phone: '',
        status: ''
      },
      statusList: [
        { label: '离职', value: -1 },
        { label: '全职在职', value: 0 },
        { label: '兼职在职', value: 1 },
        { label: '其他', value: 2 }
      ]
    }
  },
  computed: {
  },
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
    handleUpdate(row) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen(row)
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await staffDelete({ id })
      this.$elMessage('删除成功!')
      this.getList()
    }
  }
}
</script>
