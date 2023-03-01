<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-select v-model="listQuery.status" size="mini" class="filter-item" style="width: 200px;" placeholder="请选择状态">
        <el-option v-for="item in statusList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <el-button
        v-permission="[ `GET ${api.voucherRecordList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '订单记录')"
    >
    </TableTools>

    <!-- 订单记录列表 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
      :api-path="api.voucherRecordList" :columns="columns" @post-data="handlePostData"
    >
      <template #status="{ row }">
        <el-tag v-if="row.status === 0">未付款</el-tag>
        <el-tag v-if="row.status === 1" type="info">取消</el-tag>
        <el-tag v-if="row.status === 2" type="success">已付款</el-tag>
        <el-tag v-if="row.status === 3" type="danger">代金券未发放</el-tag>
        <el-tag v-if="row.status === 4" type="success">代金券已发放</el-tag>
      </template>
      <template #operate="{ row }">
        <el-button
          v-permission="[ `POST ${api.holdAdd}` ]" :disabled="row.status !== 3" type="primary" size="mini"
          @click="handleGrant(row)"
        >
          发放
        </el-button>
        <!-- <el-button
          v-permission="['POST /admin/admin/delete']"
          type="danger"
          size="mini"
          @click="handleDelete(scope.row)"
          >删除</el-button> -->
      </template>
    </VxeTable>

  </div>
</template>

<script>
import { api, voucherRecordList, holdAdd } from '@/api/voucherManagement/order'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { splicingDate } from '@/utils'
import { columns } from './table'

export default {
  name: 'VoucherManagementOrder',
  components: {
    VxeTable,
    TableTools
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'voucherManagementOrder',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        orderId: undefined,
        userId: undefined,
        status: undefined
      },
      statusList: [
        {
          id: 0,
          name: '未付款'
        },
        {
          id: 1,
          name: '取消'
        },
        {
          id: 2,
          name: '已付款'
        },
        {
          id: 3,
          name: '代金券未发放'
        },
        {
          id: 4,
          name: '代金券已发放'
        }
      ],
      dataForm: {
        id: undefined,
        desc: undefined,
        ratio: undefined,
        enabled: 1
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
    handlePostData(postData) {
      for (const i in postData) {
        postData[i].payTime = splicingDate(postData[i].payTime)
      }
      this.$refs.vxeTable.postData = postData
    },
    handleGrant(row) {
      if (row.status === 3) {
        this.$confirm('进行代金券发放, 是否继续？', '提示', {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.resetForm()
          this.dataForm.id = row.id
          this.doGrant()
        })
          .catch(() => {
            this.$elMessage('已取消', 'info')
          })
      }
    },
    doGrant() {
      holdAdd(this.dataForm)
        .then((response) => {
          this.$elMessage(response.data, 'success')
        })
        .catch(() => {
          this.$elMessage('代金券发放失败', 'error')
        })
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        desc: undefined,
        ratio: undefined,
        enabled: 1
      }
    }
  }
}
</script>

<style scoped></style>
