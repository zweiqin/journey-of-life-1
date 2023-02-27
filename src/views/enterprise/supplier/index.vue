<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.search" clearable class="filter-item" style="width: 200px;"
        placeholder="请输入供应商名称、供应商所在区域、供应商详细地址、供应商联系人、供应商联系电话、供应商介绍或备注"
      />
      <el-button
        v-permission="[ `GET /admin${api.getNewSupplierList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" style="margin-left:10px;" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '供应商管理')"
    >
      <el-button
        v-permission="[ `POST /admin${api.newsupplierSave}` ]" size="mini" type="primary" icon="el-icon-plus"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >
        添加
      </el-button>
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
      :api-path="api.getNewSupplierList" :columns="columns"
    >
      <template #supplierLogo="{ row }">
        <el-image v-if="row.supplierLogo" :src="row.supplierLogo" style="width:40px; height:40px" fit="cover" :preview-src-list="[ row.supplierLogo ]" />
        <span v-else>--</span>
      </template>
      <template #supplierRegion="{ row }">
        <span>{{ setRegion(row.supplierCode) || '--' }}</span>
      </template>
      <template #operate="{ row }">
        <el-button v-permission="[ `GET /admin${api.getNewSupplierInfo}` ]" size="mini" @click="handleDetail(row)">
          查看
        </el-button>
        <el-button v-permission="[ `POST /admin${api.newsupplierDeleteById}` ]" size="mini" @click="handleUpdate(row)">
          编辑
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.newsupplierDeleteById}` ]" type="danger" size="mini"
          @click="handleDelete(row)"
        >
          删除
        </el-button>
      </template>
    </VxeTable>

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" @success="getList" />
    <!-- 查看详情 -->
    <DetailModal ref="DetailModal" @success="getList" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  api,
  newsupplierDeleteById
} from '@/api/enterprise/supplier'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import DetailModal from './components/DetailModal'
import { columns } from './table'
import XeUtils from 'xe-utils'

export default {
  name: 'Supplier',
  components: {
    VxeTable,
    TableTools,
    EditModal,
    DetailModal
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'supplier',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        search: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'common_regionList'
    ])
  },
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
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await newsupplierDeleteById({ id })
      this.$elMessage('删除成功!')
      this.getList()
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
