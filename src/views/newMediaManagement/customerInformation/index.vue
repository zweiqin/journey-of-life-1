<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <!-- <div class="filter-container">
      <el-input
      v-model="listQuery.search" clearable class="filter-item" style="width: 400px;"
      placeholder="请输入材料城名称、材料城所在区域、材料城详细地址、材料城联系人、材料城联系电话、材料城介绍或备注" @keyup.enter.native="getList"
      />
      <el-button
      v-permission="[ `GET /admin${api.queryCustomerPoolList}` ]" size="mini" class="filter-item"
      type="primary" icon="el-icon-search" style="margin-left:10px;" @click="getList"
      >
      查找
      </el-button>
      </div> -->

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '客户信息')"
    >
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
      :api-path="api.queryCustomerPoolList" :columns="columns"
    >
      <template #operate="{ row }">
        <el-button v-permission="[ `GET /admin${api.getNewMaterialCityInfo}` ]" size="mini" @click="handleDetail(row)">
          查看
        </el-button>
      </template>
    </VxeTable>

    <!-- 查看详情 -->
    <DetailModal ref="DetailModal" @success="getList" />
  </div>
</template>

<script>
import {
  api
} from '@/api/newMediaManagement/customerInformation'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import DetailModal from './components/DetailModal'
import { columns } from './table'

export default {
  name: 'CustomerInformation',
  components: {
    VxeTable,
    TableTools,
    DetailModal
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'customerInformation',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        search: ''
      }
    }
  },
  computed: {},
  methods: {
    // 自定义列
    updateFields(columns) {
      this.columns = columns
    },
    getList(meaning) {
      meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
    },
    handleDetail(row) {
      this.$refs.DetailModal && this.$refs.DetailModal.handleOpen(row)
    },
    handleUpdate(row) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen(row)
    }
  }
}
</script>
