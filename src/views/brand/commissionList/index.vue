<template>
  <div class="app-container">
    <TableTools
      :custom-columns-config="customColumnsConfig"
      download
      custom-field
      @update-fields="updateFields"
      @refresh="getList"
      @download="toolsMixin_exportMethod($refs.vxeTable, '佣金提现')"
    >
      <el-select
        v-model="listQuery.status"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="选择状态"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-permission="[ `GET /admin${api.commissionList}` ]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="getList"
      >
        查找
      </el-button>
    </TableTools>

    <VxeTable
      ref="vxeTable"
      v-model="listQuery"
      :local-key="customColumnsConfig.localKey"
      api-method="GET"
      :api-path="api.commissionList"
      :columns="columns"
    >
      <template #status="{ row }">
        {{ row.status | typeFilter(statusList) }}
      </template>
      <template #operate="{ row }">
        <el-button
          v-permission="[ `POST /admin${api.commissionGrant}` ]"
          :disabled="row.status !== 0"
          type="success"
          size="mini"
          @click="handleApproval(row)"
        >
          放款
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.commissionRevoke}` ]"
          :disabled="row.status !== 0"
          type="danger"
          size="mini"
          @click="handleReject(row)"
        >
          拒绝
        </el-button>
      </template>
    </VxeTable>

    <!-- 提现审批 -->
    <ApprovalModal ref="ApprovalModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  commissionRevoke
} from '@/api/brand/commission'
import ApprovalModal from './components/ApprovalModal'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from './table'

export default {
  name: 'CommissionList',
  components: {
    VxeTable,
    TableTools,
    ApprovalModal
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
        localKey: 'CommissionList',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        // userId: '',
        status: ''
      },
      statusList: [
        { label: '申请中', value: 0 },
        { label: '失败', value: -1 },
        { label: '成功', value: 1 }
      ]
    }
  },
  methods: {
    // 自定义列
    updateFields(columns) {
      this.columns = columns
    },
    getList(meaning) {
      meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
    },
    // 审批
    handleApproval({ id }) {
      this.$refs.ApprovalModal && this.$refs.ApprovalModal.handleOpen({ id })
    },
    // 驳回
    async handleReject({ id }) {
      const remark = await this.$elPrompt('驳回理由')
      await commissionRevoke({
        id,
        remark
      })
      this.$elMessage('操作成功!')
      this.getList('keepPage')
    }
  }
}
</script>
