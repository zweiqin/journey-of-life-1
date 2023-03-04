<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.question" clearable class="filter-item" style="width: 200px;"
        placeholder="输入问题内容"
        @keyup.enter.native="getList"
      />
      <el-select v-model="listQuery.type" clearable class="filter-item" style="width: 200px;" placeholder="选择问题范围">
        <el-option v-for="item in issueGetTypeEnumList" :key="item.code" :label="item.value" :value="item.code" />
      </el-select>
      <el-select v-model="listQuery.brandId" clearable class="filter-item" style="width: 200px;" placeholder="选择门店">
        <el-option v-for="item in brandList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button
        v-permission="[ `GET /admin${api.issueList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" @click="getList"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '通用问题')"
    >
      <el-button
        v-permission="[ `POST /admin${api.issueCreate}` ]" size="mini" type="primary" icon="el-icon-plus"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >
        添加
      </el-button>
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
      :api-path="api.issueList" :columns="columns"
    >
      <template #type="{ row }">
        {{ row.type | typeFilter(issueGetTypeEnumList) }}
      </template>
      <template #isEnable="{ row }">
        <el-tag v-if="row.isEnable" type="success" effect="plain">是</el-tag>
        <el-tag v-else type="danger" effect="plain">否</el-tag>
      </template>
      <template #operate="{ row }">
        <el-button v-permission="[ `POST /admin${api.issueUpdate}` ]" size="mini" @click="handleEdit(row)">
          编辑
        </el-button>
        <el-button
          v-permission="[ `GET /admin${api.issueChangeEnable}` ]" :disabled="!row.isEnable" type="info"
          size="mini" @click="handleUpdate(row)"
        >
          下架
        </el-button>
        <el-button
          v-permission="[ `GET /admin${api.issueChangeEnable}` ]" :disabled="row.isEnable" type="warning"
          size="mini" @click="handleUpdate(row)"
        >
          上架
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.issueDelete}` ]" type="danger" size="mini"
          @click="handleDelete(row)"
        >
          删除
        </el-button>
      </template>
    </VxeTable>

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" :list="issueGetTypeEnumList" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  issueGetTypeEnum,
  issueDelete,
  issueChangeEnable
} from '@/api/goods/issue'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import { goodsCatAndBrand } from '@/api/goods/goodsList'
import { columns } from './table'

export default {
  name: 'Issue',
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
        localKey: 'issue',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        question: '',
        type: '',
        brandId: ''
      },
      brandList: [],
      issueGetTypeEnumList: []
    }
  },
  created() {
    this.getBrandList()
    this.getIssueGetTypeEnumList()
  },
  methods: {
    // 自定义列
    updateFields(columns) {
      this.columns = columns
    },
    getList(meaning) {
      meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
    },
    async getIssueGetTypeEnumList() {
      const res = await issueGetTypeEnum()
      this.issueGetTypeEnumList = res.data
    },
    async getBrandList() {
      const res = await goodsCatAndBrand()
      this.brandList = res.data.brandList
    },
    async handleEdit({ id, type, question, answer }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, type, question, answer })
    },
    async handleUpdate({ id, isEnable }) {
      await this.$elConfirm(`确认${isEnable ? '下架' : '上架'}?`)
      await issueChangeEnable({
        id,
        isEnable: !isEnable
      })
      this.$elMessage()
      this.getList()
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await issueDelete({ id })
      this.$elMessage('删除成功!')
      this.getList()
    }
  }
}
</script>
