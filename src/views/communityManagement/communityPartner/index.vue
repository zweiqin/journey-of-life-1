<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.search" clearable class="filter-item" style="width: 400px;"
        placeholder="请输入社区合伙人名称、号码等" @keyup.enter.native="getList"
      />
      <el-button
        v-permission="[ `POST /admin${api.partnerGetCustomerList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" style="margin-left:10px;" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '社区合伙人')"
    >
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
      :api-path="api.partnerGetCustomerList" :columns="columns"
      :grid-options="{ rowConfig: { height: 60 } }" request-method="request2"
    >
      <template #status="{ row }">
        <el-tag v-if="row.status === 1" type="warning">已申请</el-tag>
        <el-tag v-else-if="row.status === 2">开始审核</el-tag>
        <el-tag v-else-if="row.status === 3" type="success">审核通过</el-tag>
        <el-tag v-else-if="row.status === 4" type="danger">审核不通过</el-tag>
        <span v-else>--</span>
      </template>
      <template #sfUserWorkCity="{ row }">
        <span v-if="row.sfUserWorkCity" style="position: relative;display: inline-block;height: 39px;overflow: hidden;text-overflow: ellipsis;word-break: break-all;white-space: normal !important;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
          <span v-if="row.sfUserWorkCity.split(',').length > 1">
            <span>{{ row.sfUserWorkCity.match(/^[^,]*(?=,)/)[0] }}</span>
            <div style="position: absolute;top: 52%;right: 10px;width: fit-content;color: #6956E5;background-color: #ffffff;cursor: pointer;" @click="$refs.DetailModalWC && $refs.DetailModalWC.handleOpen(row)">更多</div>
          </span>
          <span v-else>{{ row.sfUserWorkCity }}</span>
        </span>
        <span v-else>--</span>
      </template>
      <template #zzUserServerCity="{ row }">
        <span>{{ row.zzUserServerCity ? JSON.parse(row.zzUserServerCity).map(item => item.join(' ')).join('，\n') : '--' }}</span>
      </template>
      <template #operate="{ row }">
        <el-button v-permission="[ `GET /admin${api.partnerGetPartnerInfo}` ]" size="mini" @click="$refs.DetailModal && $refs.DetailModal.handleOpen(row, 1)">
          查看
        </el-button>
        <el-button v-permission="[ `POST /admin${api.partnerStartAudit}` ]" :disabled="row.status !== 1" type="primary" size="mini" @click="handleStartAudit(row)">
          开始审核
        </el-button>
        <el-button v-permission="[ `POST /admin${api.partnerStartAudit}` ]" :disabled="row.status !== 2" type="success" size="mini" @click="handleApproved(row)">
          审核通过
        </el-button>
        <el-button v-permission="[ `POST /admin${api.partnerStartAudit}` ]" :disabled="row.status !== 2" type="danger" size="mini" @click="$refs.EditModal && $refs.EditModal.handleOpen(row)">
          审核不通过
        </el-button>
      </template>
    </VxeTable>

    <!-- 审核 -->
    <EditModal ref="EditModal" @success="getList" />
    <!-- 查看详情 -->
    <DetailModal ref="DetailModal" @success="getList" />
    <!-- 主营区域 -->
    <DetailModalWC ref="DetailModalWC" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  partnerStartAudit
} from '@/api/communityManagement/communityMember'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import DetailModal from './components/DetailModal'
import DetailModalWC from './components/DetailModalWC'
import { columns } from './table'

export default {
  name: 'CommunityPartner',
  components: {
    VxeTable,
    TableTools,
    EditModal,
    DetailModal,
    DetailModalWC
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'communityPartner',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        type: 1,
        search: ''
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
    async handleStartAudit(row) {
      await this.$elConfirm('确认开始审核？')
      await partnerStartAudit({ id: row.id, status: 2, cause: '' })
      this.$elMessage('开始审核成功!')
      this.getList()
    },
    async handleApproved(row) {
      await this.$elConfirm('确认开始审核？')
      await partnerStartAudit({ id: row.id, status: 3, cause: '' })
      this.$elMessage('审核通过成功!')
      this.getList()
    }
  }
}
</script>
