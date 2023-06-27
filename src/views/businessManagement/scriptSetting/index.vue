<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.msgSay" clearable class="filter-item" style="width: 200px;"
        placeholder="请输入话术"
        @keyup.enter.native="getList"
      />
      <el-select v-model="listQuery.msgSayType" clearable class="filter-item" style="width: 200px;" placeholder="请选择话术类型">
        <el-option v-for="item in msgSayTypeList" :key="item.code" :label="item.name" :value="item.code" />
      </el-select>
      <el-button
        v-permission="[ `POST ${api.msgsayMsgSayList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      download custom-field :custom-columns-config="customColumnsConfig" @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '话术设置')"
    >
      <el-button
        v-permission="[ `POST ${api.msgsaySaveMsgSay}` ]" size="mini" type="primary" icon="el-icon-plus"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >
        添加
      </el-button>
    </TableTools>

    <!-- 话术类型列表 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
      :api-path="api.msgsayMsgSayList" :columns="columns"
    >
      <template #type="{ row }">
        <span>{{ row.type | typeFilter(msgSayTypeList) }}</span>
      </template>
      <template #operate="{ row }">
        <el-button v-permission="[ `PUT ${api.msgsayUpdateSay}` ]" size="mini" @click="handleUpdate(row)">编辑</el-button>
        <el-button
          v-permission="[ `DELETE ${api.msgsayDeleteById}` ]" type="danger" size="mini"
          @click="handleDelete(row)"
        >
          删除
        </el-button>
      </template>
    </VxeTable>

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" :list="msgSayTypeList" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  msgsayMsgSayTypeList,
  msgsayDeleteById
} from '@/api/businessManagement/scriptSetting'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import { columns } from './table'

export default {
  name: 'ScriptSetting',
  components: {
    VxeTable,
    TableTools,
    EditModal
  },
  filters: {
    typeFilter(val, list = []) {
      const obj = list.find((item) => item.code === +val)
      return obj ? obj.name : '--'
    }
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'scriptSetting',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        msgSay: '',
        msgSayType: undefined
      },
      msgSayTypeList: []
    }
  },
  created() {
    this.getMsgSayTypeList()
  },
  methods: {
    // 自定义列
    updateFields(columns) {
      this.columns = columns
    },
    async getMsgSayTypeList() {
      const res = await msgsayMsgSayTypeList()
      this.msgSayTypeList = res.data
    },
    getList(meaning) {
      meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
    },
    async handleUpdate({ id, say, type }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, say, type })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await msgsayDeleteById({ id })
      this.$elMessage('删除成功!')
      this.getList()
    }
  }
}
</script>
