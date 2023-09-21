<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.type" class="filter-item" style="width: 150px;"
        placeholder="请输入类型" @keyup.enter.native="console.log('delete')"
      />
      <el-button
        size="mini" class="filter-item"
        type="primary" icon="el-icon-search" style="margin-left:10px;" @click="console.log('delete')"
      >
        查找
      </el-button>
      <el-button
        size="mini" class="filter-item"
        type="primary" icon="el-icon-edit" style="margin-left:10px;" @click="handleCreate()"
      >
        添加
      </el-button>
    </div>
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" :is-request="false"
      :loading="listLoading" :table-data="tableData" :page-total="pageTotal" :columns="columns"
      @pageChange="pageChange"
    >
      <template #function="{ row }">
        <el-button type="warning" size="mini" @click="handleDetail(row)">
          详情
        </el-button>
        <el-button size="mini" @click="handleEdit(row)">
          编辑
        </el-button>
        <el-button
          type="danger" size="mini"
          @click="deleteUser(row.id)"
        >
          删除
        </el-button>
      </template>
    </VxeTable>
    <DetailModal ref="DetailModal" />
    <CreateModal ref="CreateModal" @success="getList"></CreateModal>
    <UpdatedModal ref="UpdatedModal" @success="getList"></UpdatedModal>
  </div>
</template>

<script>
import { columns } from './table'
import VxeTable from '@/components/VxeTable'
import DetailModal from './components/DetailModal'
import CreateModal from './components/CreateModal'
import UpdatedModal from './components/UpdatedModal'
import { getTenanConfigList, deleteTenanConfig } from '@/api/tenantOccupancy/tenantConfig'
export default {
  // eslint-disable-next-line vue/match-component-file-name, vue/component-definition-name-casing
  name: 'tenantConfig',
  components: {
    VxeTable,
    DetailModal,
    CreateModal,
    UpdatedModal
  },
  data() {
    return {
      listLoading: true,
      columns,
      pageTotal: 0,
      customColumnsConfig: {
        localKey: 'makabaka',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        size: 10,
        type: ''
      },
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    pageChange(params) {
      this.listQuery.size = params.limit
      this.listQuery = {
        ...this.listQuery,
        ...params
      }
      this.getList()
    },
    getList() {
      this.listLoading = true
      getTenanConfigList(this.listQuery).then((res) => {
        this.tableData = res.data.records
        const { page, size } = this.listQuery
        this.tableData = res.data.records.map((item, index) => ({
          ...item,
          $index: (page - 1) * size + (index + 1)
        }))
        this.pageTotal = res.data.total
        this.listLoading = false
        console.log(this.tableData)
      })
    },
    handleCreate() { // 创建
      this.$refs.CreateModal && this.$refs.CreateModal.handleOpen()
    },
    handleDetail(row) { // 详情模态框
      this.$refs.DetailModal && this.$refs.DetailModal.handleOpen(row)
    },
    handleEdit(row) { // 修改功能模态框
      this.$refs.UpdatedModal && this.$refs.UpdatedModal.handleOpen(row)
    },
    async deleteUser(id) {
      await this.$elConfirm('确定删除租户吗?')
      await deleteTenanConfig({ id })
      this.$elMessage('删除成功!')
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
