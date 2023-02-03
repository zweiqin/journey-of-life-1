<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.search"
        clearable
        size="mini"
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入"
      />
      <el-select
        v-model="listQuery.status"
        size="mini"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请选择"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-permission="[`POST ${api.messagesentryQueryMsgSentryList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getList"
      >查找</el-button>
    </div>

    <TableTools
      :customColumnsConfig="customColumnsConfig"
      download
      customField
      @update-fields="updateFields"
      @refresh="getList"
      @download="onDownload"
    >
      <el-button
        v-permission="[`POST ${api.messagesentrySaveMsgSentry}`]"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.AddUserModal && $refs.AddUserModal.handleOpen()"
      >添加</el-button>
    </TableTools>

    <VxeTable
      ref="vxeTable"
      v-model="listQuery"
      :localKey="customColumnsConfig.localKey"
      apiMethod="POST"
      :apiPath="api.messagesentryQueryMsgSentryList"
      sizeAlias="size"
      :columns="columns"
    >
      <template #userAvatar="{ row }">
        <el-image v-if="row.userAvatar" :src="row.userAvatar" style="width:40px; height:40px" fit="cover" :preview-src-list="[row.userAvatar]" />
      </template>
      <template #status="{ row }">
        <span>{{ row.status | statusFilter(statusList) }}</span>
      </template>
      <template #operate="{ row }">
        <el-button
          v-permission="[`POST ${api.messagesentrySalesmanBinding}`]"
          size="mini"
          @click="handleBind(row)"
        >绑定业务员</el-button>
        <el-button
          v-permission="[`POST ${api.messagesentrySetOverdueTime}`]"
          type="danger"
          size="mini"
          @click="handleSetTime(row)"
        >报警时间</el-button>
        <el-button
          v-if="row.status==1"
          v-permission="[`POST ${api.messagesentryConversion}`]"
          type="success"
          size="mini"
          @click="handleUpdateStatus(row, 1)"
        >转化</el-button>
        <el-button
          v-if="row.status == 2"
          v-permission="[`POST ${api.messagesentryIsConversion}`]"
          type="warning"
          size="mini"
          @click="handleUpdateStatus(row, 3)"
        >回访</el-button>
        <el-button
          v-if="row.status == 3"
          v-permission="[`POST ${api.messagesentryIsConversion}`]"
          type="warning"
          size="mini"
          @click="handleUpdateStatus(row, 4)"
        >回访</el-button>
      </template>
    </VxeTable>

    <!-- 添加客户 -->
    <AddUserModal ref="AddUserModal" @success="getList" />
    <!-- 绑定业务员 -->
    <AddSalesmanModal ref="AddSalesmanModal" @success="getList" />
    <!-- 用户报警时间 -->
    <SetTimeModal ref="SetTimeModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  messagesentryConversion,
  messagesentryIsConversion
} from '@/api/businessManagement/informationSentry';
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import AddUserModal from './components/AddUserModal'
import AddSalesmanModal from './components/AddSalesmanModal'
import SetTimeModal from './components/SetTimeModal'
import { columns } from './table'

export default {
  name: 'InformationSentry',
  components: {
    VxeTable,
    TableTools,
    AddUserModal,
    AddSalesmanModal,
    SetTimeModal,
  },
  filters: {
    genderFilter(val) {
      return {
        0: '未知',
        1: '男',
        2: '女'
      }[val] || '--'
    },
    statusFilter(val, list) {
      const obj = list.find(item => item.value === +val)
      return obj ? obj.label : '--'
    }
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'informationSentry',
        columnsOptions: columns,
      },
      listQuery: {
        page: 1,
        size: 20,
        search: '',
        status: undefined
      },
      statusList: [
        { label: '收集', value: 1 },
        { label: '转化', value: 2 },
        { label: '追销', value: 3 },
        { label: '合伙人', value: 4 }
      ],
      tableOptions: {
        loading: true,
        tableData: []
      },
    };
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
    getList() {
      this.listQuery = {
        ...this.listQuery,
        page: 1
      }
    },
    async handleUpdateStatus({ id }, status) {
      const res = status == 1 ?  await messagesentryConversion({ id }) : await messagesentryIsConversion({ id, status })
      this.$message.success(`${status == 1 ? '转化' : '回访'}成功!`)
      this.getList();
    },
    handleBind({ id, belongsSalesman, belongsDepartment }) {
      this.$refs.AddSalesmanModal && this.$refs.AddSalesmanModal.handleOpen({ id, belongsSalesman, belongsDepartment })
    },
    handleSetTime({ id, setTime }) {
      this.$refs.SetTimeModal && this.$refs.SetTimeModal.handleOpen({ id, setTime })
    }
  }
};
</script>
