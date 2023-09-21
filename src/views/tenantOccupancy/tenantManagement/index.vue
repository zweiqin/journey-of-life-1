<!-- eslint-disable no-console -->
<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.brandId" clearable class="filter-item" style="width: 150px;"
        disabled
        placeholder="请输入ID" @keyup.enter.native="console.log('delete')"
      />
      <el-input
        v-model="listQuery.lowerPrice" clearable class="filter-item" style="width: 150px;"
        disabled
        placeholder="请输入管理员账号" @keyup.enter.native="console.log('delete')"
      />
      <el-button
        size="mini" class="filter-item" disabled
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
      :grid-options="{ rowConfig: { height: 75 } }" @pageChange="pageChange"
    >
      <template #avatar="{ row }">
        <img style="width: 50px;height:50px;background-Color: #dfe4ed;" :src="row.avatar" alt="" srcset="" @error="handleImageError($event, row)">
      </template>
      <!-- selectParams[5].sysDictItems  类型筛选对应的数据 -->
      <template #isTenantAccount="{ row }">
        <el-tag :type="row.isTenantAccount == 1 ? '' : 'danger'">{{ row.isTenantAccount == 1 ? '是' : '否' }}</el-tag>
      </template>
      <template #status="{ row }">
        <el-tag :type="row.status == 1 ? '' : 'danger'">{{ row.status == 1 ? '正常' : '审核中' }}</el-tag>
      </template>
      <template #function="{ row }">
        <el-button type="warning" size="mini" @click="handleDetail(row)">
          详情
        </el-button>
        <el-button v-permission="[ `POST /admin` ]" size="mini" @click="handleEdit(row)">
          编辑
        </el-button>
        <el-button
          v-permission="[ `POST /admin/` ]" type="danger" size="mini"
          @click="deleteUser(row.id)"
        >
          删除
        </el-button>
      </template>
    </Vxetable>
    <DetailModal ref="DetailModal" />
    <!-- <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" :is-request="false"
      :loading="listLoading" :table-data="tableData" :page-total="pageTotal" :columns="columns"
      :grid-options="{ height: heightTable - 50 + 'px' }" @pageChange="pageChange"
      ></VxeTable> -->
  </div>
</template>

<script>
import {
  getTenantList,
  deleteTenant
} from '@/api/tenantOccupancy/tenantManagement'
import DetailModal from './components/DetailModal'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from './table'
export default {
  // eslint-disable-next-line vue/match-component-file-name, vue/component-definition-name-casing
  name: 'shabiTuanFengXuRuiLi',
  components: {
    VxeTable,
    TableTools,
    DetailModal
  },
  data() {
    return {
      listLoading: false,
      columns,
      selectParams: null,
      customColumnsConfig: {
        // localKey: 'designCase',
        columnsOptions: columns
      },
      pageTotal: 0,
      listQuery: {
        page: 1,
        size: 10
      },
      tableData: []
    }
  },
  created() {
    this.getDesignCompanyList()
    // getDescignCompanyList(this.listQuery).then((res) => {
    //   console.log(res)
    // })
  },
  methods: {
    // 筛选目标的tag类型
    pageChange(params) {
      // console.log(params)
      this.listQuery.size = params.limit
      this.listQuery = {
        ...this.listQuery,
        ...params
      }
      this.getDesignCompanyList()
    },
    getDesignCompanyList() {
      this.listLoading = true
      getTenantList(this.listQuery).then((res) => {
        // console.log(res)
        this.tableData = res.data.records
        this.pageTotal = res.data.total
        console.log(this.tableData)
        this.listLoading = false
      })
        .catch((err) => {
          console.log(err)
        })
    },
    handleCreate() {
      this.$router.push({ name: 'tenantCreate' })
    },
    handleDetail(row) {
      this.$refs.DetailModal && this.$refs.DetailModal.handleOpen(row)
    },
    handleEdit(row) {
      this.$router.push({ name: 'tenantEdit', query: { id: row.id } })
    },
    handleImageError(ev, item) { // 图片加载错误的处理
      item.avatar = require('@/assets/home/lujing.png')
    },
    async deleteUser(id) {
      await this.$elConfirm('确定删除租户吗?')
      await deleteTenant(id)
      this.$elMessage('删除成功!')
      this.getDesignCompanyList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
