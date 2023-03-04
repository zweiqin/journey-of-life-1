<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.value" clearable class="filter-item" style="width: 200px;"
        placeholder="请输入标签值"
        @keyup.enter.native="getList"
      />
      <el-button
        v-permission="[ `GET /admin${api.goodsTagList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" style="margin-left:10px;" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '大类标签')"
    >
      <el-button
        v-permission="[ `POST /admin${api.goodsTagCreate}` ]" size="mini" type="primary" icon="el-icon-plus"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >
        添加
      </el-button>
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
      :api-path="api.goodsTagList" :columns="columns"
    >
      <template #operate="{ row }">
        <el-button v-permission="[ `POST /admin${api.goodsTagUpdate}` ]" size="mini" @click="handleUpdate(row)">
          编辑
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.goodsTagDelete}` ]" type="danger" size="mini"
          @click="handleDelete(row)"
        >
          删除
        </el-button>
      </template>
    </VxeTable>

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  goodsTagDelete
} from '@/api/goods/goodsTag'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import { columns } from './table'

export default {
  name: 'GoodsTag',
  components: {
    VxeTable,
    TableTools,
    EditModal
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'goodsTag',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        value: ''
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
    async handleUpdate({ id, value, sortOrder }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, value, sortOrder })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await goodsTagDelete({ id })
      this.$elMessage('删除成功!')
      this.getList()
    }
  }
}
</script>
