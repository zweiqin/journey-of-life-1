<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.search" clearable class="filter-item" style="width: 400px;"
        placeholder="请输入材料城名称、材料城所在区域、材料城详细地址、材料城联系人、材料城联系电话、材料城介绍或备注" @keyup.enter.native="getList"
      />
      <el-button
        v-permission="[ `GET /admin${api.getNewMaterialCityList}` ]" size="mini" class="filter-item"
        type="primary" icon="el-icon-search" style="margin-left:10px;" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '材料城管理')"
    >
      <el-button
        v-permission="[ `POST /admin${api.newaterialcitySave}` ]" size="mini" type="primary" icon="el-icon-plus"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >
        添加
      </el-button>
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
      :api-path="api.getNewMaterialCityList" :columns="columns"
    >
      <template #materialCityLogo="{ row }">
        <el-image
          v-if="row.materialCityLogo" :src="row.materialCityLogo" style="width:40px; height:40px" fit="cover"
          :preview-src-list="[ row.materialCityLogo ]"
        />
        <span v-else>--</span>
      </template>
      <template #materialCityRegion="{ row }">
        <span>{{ setRegion(row.materialCityCode) || '--' }}</span>
      </template>
      <template #operate="{ row }">
        <el-button v-permission="[ `GET /admin${api.getNewMaterialCityInfo}` ]" size="mini" @click="handleDetail(row)">
          查看
        </el-button>
        <el-button v-permission="[ `POST /admin${api.newaterialcityUpdateById}` ]" size="mini" @click="handleUpdate(row)">
          编辑
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.newaterialcityDeleteById}` ]" type="danger" size="mini"
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
  newaterialcityDeleteById
} from '@/api/materialManagement/materialCity'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import DetailModal from './components/DetailModal'
import { columns } from './table'
import XeUtils from 'xe-utils'

export default {
  name: 'MaterialCity',
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
        localKey: 'materialCity',
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
      await newaterialcityDeleteById({ id })
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
