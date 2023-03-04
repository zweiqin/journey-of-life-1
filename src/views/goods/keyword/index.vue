<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.keyword" clearable class="filter-item" style="width: 200px;"
        placeholder="输入搜索关键字"
        @keyup.enter.native="getList"
      />
      <el-input
        v-model="listQuery.url" clearable class="filter-item" style="width: 200px;"
        placeholder="输入链接"
        @keyup.enter.native="getList"
      />
      <el-button
        v-permission="[ `GET /admin${api.keywordList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '搜索关键字')"
    >
      <el-button
        v-permission="[ `POST /admin${api.keywordCreate}` ]" size="mini" type="primary" icon="el-icon-plus"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >
        添加
      </el-button>
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
      :api-path="api.keywordList" :columns="columns"
    >
      <template #url="{ row }">
        <a :href="row.url" target="_blank">{{ row.url }}</a>
      </template>
      <template #isHot="{ row }">
        <el-tag v-if="row.isHot" type="success" effect="plain">是</el-tag>
        <el-tag v-else type="danger" effect="plain">否</el-tag>
      </template>
      <template #isDefault="{ row }">
        <el-tag v-if="row.isDefault" type="success" effect="plain">是</el-tag>
        <el-tag v-else type="danger" effect="plain">否</el-tag>
      </template>
      <template #operate="{ row }">
        <el-button v-permission="[ `POST /admin${api.keywordUpdate}` ]" size="mini" @click="handleUpdate(row)">
          编辑
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.keywordDelete}` ]" type="danger" size="mini"
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
  keywordDelete
} from '@/api/goods/keyword'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import { columns } from './table'

export default {
  name: 'Keyword',
  components: {
    VxeTable,
    TableTools,
    EditModal
  },
  filters: {
    typeFilter(val, list = []) {
      const obj = list.find((item) => +item.code === +val)
      return obj ? obj.value : '--'
    }
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'keyword',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        keyword: '',
        url: ''
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
    async handleUpdate({ id, keyword, url, isHot, isDefault }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, keyword, url, isHot, isDefault })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await keywordDelete({ id })
      this.$elMessage('删除成功!')
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
a {
	color: #1890ff;
	text-decoration: underline;
}
</style>
