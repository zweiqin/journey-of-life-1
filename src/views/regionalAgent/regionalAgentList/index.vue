<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.search" clearable size="mini" class="filter-item"
        style="width: 200px;"
        placeholder="请输入名称、地址或电话" @keyup.enter.native="getList"
      />
      <el-button
        v-permission="[ `POST ${api.getRegionAgentList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '区域代理列表')"
    >
      <!-- <el-button
        v-permission="[ `POST ${api.}` ]" size="mini" type="primary"
        icon="el-icon-plus" @click="$refs.AddUserModal && $refs.AddUserModal.handleOpen()"
        >
        添加
        </el-button> -->
      <el-button
        v-permission="[ `POST /admin${api.bdUserAdd}` ]" :disabled="bdUserAddBtnDisabled" icon="el-icon-lock"
        type="success" size="mini" @click="handleBind(true)"
      >
        （单选）绑定/重新绑定业务员
      </el-button>
    </TableTools>

    <!-- 区域代理列表 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
      :api-path="api.getRegionAgentList" :columns="columns" @select-change="handleSelectionChange"
    >
      <template #agentRegion="{ row }">
        <span>{{ setRegion(row.agentCode) || '--' }}</span>
      </template>
      <template #businessLicense="{ row }">
        <el-image
          v-if="row.businessLicense" :src="row.businessLicense" style="width:40px; height:40px" fit="cover"
          :preview-src-list="[ row.businessLicense ]"
        />
        <span v-else>--</span>
      </template>
      <template #idcardProsUrl="{ row }">
        <el-image
          v-if="row.idcardProsUrl" :src="row.idcardProsUrl" style="width:40px; height:40px" fit="cover"
          :preview-src-list="[ row.idcardProsUrl ]"
        />
        <span v-else>--</span>
      </template>
      <template #idcardConsUrl="{ row }">
        <el-image
          v-if="row.idcardConsUrl" :src="row.idcardConsUrl" style="width:40px; height:40px" fit="cover"
          :preview-src-list="[ row.idcardConsUrl ]"
        />
        <span v-else>--</span>
      </template>
      <template #status="{ row }">
        <span v-if="row.status === 1">已提交申请</span>
        <span v-else-if="row.status === 2">正在审核中</span>
        <span v-else-if="row.status === 3">已审核通过</span>
        <span v-else-if="row.status === 4">已审核不通过</span>
        <span v-else>--</span>
      </template>
      <template #operate="{ row }">
        <el-button v-permission="[ `GET ${api.getRegionAgentInfo}` ]" size="mini" @click="handleDetail(row)">
          详情
        </el-button>
        <el-button v-permission="[ `POST ${api.updaetRegionAgent}` ]" size="mini" @click="handleUpdate(row)">
          编辑
        </el-button>
        <el-button
          v-permission="[ `POST ${api.updaetRegionAgentStatus}` ]" :disabled="row.status != 1" type="warning"
          size="mini" @click="handleUpdateStatus(row, 2)"
        >
          开始审核
        </el-button>
        <el-button
          v-permission="[ `POST ${api.updaetRegionAgentStatus}` ]" :disabled="row.status != 2" type="success"
          size="mini" @click="handleUpdateStatus(row, 3)"
        >
          通过
        </el-button>
        <el-button
          v-permission="[ `POST ${api.updaetRegionAgentStatus}` ]" :disabled="row.status != 2" type="danger"
          size="mini" @click="handleUpdateStatus(row, 4)"
        >
          不通过
        </el-button>
      </template>
    </VxeTable>

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" @success="getList" />
    <!-- 查看详情 -->
    <DetailModal ref="DetailModal" @success="getList" />
    <!-- 绑定用户 -->
    <BindUserModal ref="BindUserModal" @success="getList" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  api,
  updaetRegionAgentStatus
} from '@/api/regionalAgent/regionalAgentList'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import DetailModal from './components/DetailModal'
import BindUserModal from './components/BindUserModal'
import { columns } from './table'
import XeUtils from 'xe-utils'

export default {
  name: 'RegionalAgentList',
  components: {
    VxeTable,
    TableTools,
    DetailModal,
    EditModal,
    BindUserModal
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'regionalAgentList',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        search: ''
      },
      multipleSelection: []
    }
  },
  computed: {
    ...mapGetters([
      'common_regionList'
    ]),
    bdUserAddBtnDisabled() {
      return this.multipleSelection.length !== 1
    }
  },
  methods: {
    handleSelectionChange({ $table }) {
      const records = $table.getCheckboxRecords()
      this.multipleSelection = records
    },
    // 自定义列
    updateFields(columns) {
      this.columns = columns
    },
    getList(meaning) {
      meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
    },
    handleBind(flag) {
      if (!this.multipleSelection.length) {
        return this.$elMessage('请勾选', 'warning')
      }
      const userIds = this.multipleSelection.map((v) => v.id)
      if (flag) {
        this.$refs.BindUserModal && this.$refs.BindUserModal.handleOpen({ userIds })
      } else {
      }
    },
    async handleUpdateStatus({ userId }, status) {
      await this.$elConfirm(`确认${status == 2 ? '开始审核' : status == 3 ? '审核通过' : '审核不通过'}?`)
      const loading = this.$elLoading()
      await updaetRegionAgentStatus({ userId, status })
      loading.close()
      this.$elMessage('操作成功')
      this.getList('keepPage')
    },
    handleDetail(row) {
      this.$refs.DetailModal && this.$refs.DetailModal.handleOpen(row)
    },
    handleUpdate(row) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen(row)
    },
    setRegion(regionCode) {
      const regionItem = XeUtils.findTree(this.common_regionList, (item) => item.code === Number(regionCode))
      if (regionItem && Array.isArray(regionItem.nodes)) {
        return regionItem.nodes.map((v) => v.name).join('，')
      }
    }
  }
}
</script>
