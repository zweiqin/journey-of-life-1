<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '建议列表')"
    >
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
      :api-path="api.customerFeedbackList" :columns="columns"
    >
      <template #picUrl="{ row }">
        <el-image
          v-if="row.picUrl" :src="row.picUrl" style="width:40px; height:40px" fit="cover"
          :preview-src-list="[ row.picUrl ]"
        />
        <span v-else>--</span>
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.status === 1" type="info">草稿</el-tag>
        <el-tag v-else-if="row.status === 2">已发布</el-tag>
        <el-tag v-else-if="row.status === 3" type="success">已下架</el-tag>
        <span v-else>--</span>
      </template>
      <template #statusType="{ row }">
        <el-tag v-if="row.statusType === 0" type="warning">待处理</el-tag>
        <el-tag v-else-if="row.statusType === 1" type="success">已处理</el-tag>
        <span v-else>--</span>
      </template>
      <template #operate="{ row }">
        <el-button
          v-permission="[ `GET /admin/${api.customerFeedbackUpdateStatus}` ]" type="primary" size="mini"
          @click="handleExamine(row)"
        >
          审核
        </el-button>
      </template>
    </VxeTable>

    <!-- 审核 -->
    <ExamineModal ref="ExamineModal" @success="getList" />
  </div>
</template>

<script>
import { api } from '@/api/customerServiceSystem/suggestionsList'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import ExamineModal from './components/ExamineModal'
import { columns } from './table'

export default {
  name: 'SuggestionsList',
  components: {
    VxeTable,
    TableTools,
    ExamineModal
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'suggestionsList',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20
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
    handleExamine(row) {
      this.$refs.ExamineModal && this.$refs.ExamineModal.handleOpen(row)
    }
  }
}
</script>
