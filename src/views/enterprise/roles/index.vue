<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入角色名称" @keyup.enter.native="getList" />
      <el-button
        v-permission="[ `GET /admin${api.roleList}` ]" size="mini" class="filter-item" type="primary"
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
        v-permission="[ `POST /admin${api.roleCreate}` ]" size="mini" type="primary" icon="el-icon-plus"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >
        添加
      </el-button>
    </TableTools>

    <!-- 部门管理列表 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
      :api-path="api.roleList" :columns="columns"
    >
      <template #operate="{ row }">
        <el-button v-permission="[ `POST /admin${api.roleUpdate}` ]" size="mini" @click="handleEdit(row)">
          编辑
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.rolePermissionsUpdate}` ]" type="warning" size="mini"
          @click="$refs.PermissionModal && $refs.PermissionModal.handleOpen({ id: row.id })"
        >
          授权
        </el-button>
        <el-button v-permission="[ `POST /admin${api.roleDelete}` ]" type="danger" size="mini" @click="handleDelete(row)">
          删除
        </el-button>
      </template>
    </VxeTable>

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" @success="getList" />
    <!-- 权限配置 -->
    <PermissionModal ref="PermissionModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  roleDelete
} from '@/api/enterprise/role'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import PermissionModal from './components/PermissionModal'
import { columns } from './table'

export default {
  name: 'Permissions',
  components: {
    VxeTable,
    TableTools,
    EditModal,
    PermissionModal
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'permissions',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        name: ''
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
    handleEdit({ id, name, desc }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, name, desc })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await roleDelete({ id })
      this.$elMessage('删除成功!')
      this.handleSearch()
    }
  }
}
</script>
