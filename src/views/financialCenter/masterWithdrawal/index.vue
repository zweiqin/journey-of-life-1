<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.search" clearable class="filter-item" style="width: 200px;"
        placeholder="请输入收款人姓名/提现单号"
        @keyup.enter.native="getList"
      />
      <el-select
        v-model="listQuery.accountType" clearable class="filter-item" style="width: 200px;"
        placeholder="选择查询列表类型"
      >
        <el-option label="店长" :value="0" />
        <el-option label="师傅" :value="1" />
      </el-select>
      <el-select v-model="listQuery.orderStatus" clearable class="filter-item" style="width: 200px;" placeholder="选择订单状态">
        <el-option label="未审核" :value="0" />
        <el-option label="通过审核" :value="1" />
        <el-option label="不通过" :value="2" />
        <el-option label="提现已到账" :value="3" />
        <el-option label="提现失败" :value="4" />
      </el-select>
      <el-date-picker
        v-model="listQuery.theTime" class="filter-item" type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button
        v-permission="[ `POST /admin${api.financeGetWithdrawRecordList}` ]" size="mini" class="filter-item"
        type="primary" icon="el-icon-search" style="margin-left:10px;" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '提现列表')"
    >
    </TableTools>

    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
      :api-path="api.financeGetWithdrawRecordList" :columns="columns"
    >
      <template #orderStatus="{ row }">
        <el-tag v-if="row.orderStatus === 0" type="warning">未审核</el-tag>
        <el-tag v-else-if="row.orderStatus === 1" type="primary">通过审核</el-tag>
        <el-tag v-else-if="row.orderStatus === 2" type="info">不通过</el-tag>
        <el-tag v-else-if="row.orderStatus === 3" type="success">提现已到账</el-tag>
        <el-tag v-else-if="row.orderStatus === 4" type="danger">提现失败</el-tag>
        <span v-else>--</span>
      </template>
      <template #bankChannel="{ row }">
        <el-tag v-if="row.bankChannel === 1" type="primary">手动打款</el-tag>
        <el-tag v-else-if="row.bankChannel === 2" type="success">通联</el-tag>
        <span v-else>--</span>
      </template>
      <template #sourceType="{ row }">
        <span v-if="row.sourceType === 0">店长</span>
        <span v-else-if="row.sourceType === 1">师傅</span>
        <span v-else>--</span>
      </template>
      <template #operate="{ row }">
        <el-button
          v-permission="[ `POST /admin${api.financeGetWithdrawRecordList}` ]" size="mini"
          @click="$refs.DetailModal && $refs.DetailModal.handleOpen(row)"
        >
          详情
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.financeWithdrawApprove}` ]" :disabled="row.orderStatus !== 0"
          type="success" size="mini" @click="$refs.ApprovalDialog && $refs.ApprovalDialog.handleOpen(row)"
        >
          通过
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.financeWithdrawApprove}` ]" :disabled="row.orderStatus !== 0"
          type="danger" size="mini" @click="handleReject(row)"
        >
          驳回
        </el-button>
      </template>
    </VxeTable>

    <!-- 提现审批 -->
    <ApprovalDialog ref="ApprovalDialog" @success="getList" />
    <!-- 查看详情 -->
    <DetailModal ref="DetailModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  financeWithdrawApprove
} from '@/api/financialCenter/withdrawalList'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import ApprovalDialog from './components/ApprovalDialog'
import DetailModal from './components/DetailModal'
import { columns } from './table'

export default {
  name: 'WithdrawalList',
  components: {
    VxeTable,
    TableTools,
    DetailModal,
    ApprovalDialog
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'withdrawalList',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        search: '',
        accountType: 0,
        orderStatus: '',
        theTime: ''
      }
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
    // 驳回
    async handleReject(row) {
      const reason = await this.$elPrompt(`（提现单号：${row.orderNo}）驳回理由`, { title: `驳回提现申请` })
      await financeWithdrawApprove({
        orderNo: row.orderNo,
        state: 2,
        reason
      })
      this.$elMessage('操作成功！')
      this.getList('keepPage')
    }
  }
}
</script>
