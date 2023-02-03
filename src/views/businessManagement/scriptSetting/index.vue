<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.msgSay"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入话术"
      />
      <el-select
        v-model="listQuery.msgSayType"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请选择话术类型"
      >
        <el-option
          v-for="item in msgSayTypeList"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
      <el-button
        v-permission="[`GET ${api.msgsayMsgSayList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getList"
      >查找</el-button>
    </div>

    <TableTools
      download
      customField
      :customColumnsConfig="customColumnsConfig"
      @update-fields="updateFields"
      @refresh="getList"
      @download="onDownload"
    >
      <el-button
        v-permission="[`POST ${api.msgsaySaveMsgSay}`]"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >添加</el-button>
    </TableTools>

    <VxeTable
      ref="vxeTable"
      v-model="listQuery"
      :localKey="customColumnsConfig.localKey"
      apiMethod="POST"
      :apiPath="api.msgsayMsgSayList"
      sizeAlias="size"
      :columns="columns"
    >
      <template #type="{row}">
        <span>{{ row.type | typeFilter(msgSayTypeList) }}</span>
      </template>
      <template #operate="{row}">
        <el-button
          v-permission="[`PUT ${api.msgsayUpdateSay}`]"
          size="mini"
          @click="handleUpdate(row)"
        >编辑</el-button>
        <el-button
          v-permission="[`DELETE ${api.msgsayDeleteById}`]"
          type="danger"
          size="mini"
          @click="handleDelete(row)"
        >删除</el-button>
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
  msgsayDeleteById,
} from '@/api/businessManagement/scriptSetting';
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import { columns } from './table'

export default {
  name: 'scriptSetting',
  components: {
    VxeTable,
    TableTools,
    EditModal,
  },
  filters: {
    typeFilter(val, list = []) {
      const obj = list.find(item => item.code === +val)
      return obj ? obj.name : '--'
    }
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'scriptSetting',
        columnsOptions: columns,
      },
      listQuery: {
        page: 1,
        size: 20,
        msgSay: '',
        msgSayType: undefined
      },
      msgSayTypeList: []
    };
  },
  created() {
    this.getMsgSayTypeList();
  },
  methods: {
    // 自定义列
    updateFields (columns) {
      this.columns = columns
    },
    // 导出
    onDownload () {
      this.$refs.vxeTable && this.$refs.vxeTable.handleVxeTableMethod('exportData', {
        type: 'csv',
        filename: '信息哨兵',
        columnFilterMethod ({ column }) {
          return !['$index', 'operate'].includes(column.property)
        }
      })
    },
    async getMsgSayTypeList() {
      const res = await msgsayMsgSayTypeList()
      this.msgSayTypeList = res.data
    },
    getList() {
      this.listQuery = {
        ...this.listQuery,
        page: 1
      }
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
};
</script>
