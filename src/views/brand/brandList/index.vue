<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="输入公司名称"
        @keyup.enter.native="getList" />
      <el-input v-model="listQuery.keeperName" clearable class="filter-item" style="width: 200px;" placeholder="输入店主名称"
        @keyup.enter.native="getList" />
      <el-input v-model="listQuery.phone" clearable class="filter-item" style="width: 200px;" placeholder="输入电话"
        @keyup.enter.native="getList" />
      <el-cascader v-model="listQuery.region_arr" placeholder="选择区域" :options="common_regionList"
        :props="{ checkStrictly: true, label: 'name', value: 'code', expandTrigger: 'hover' }" clearable size="mini"
        class="filter-item" style="width: 200px;" />
      <el-select v-model="listQuery.styleId" placeholder="选择门店风格" clearable filterable class="filter-item"
        style="width: 200px;">
        <el-option v-for="item in brandStyleList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.labelId" placeholder="选择门店标签" clearable filterable class="filter-item"
        style="width: 200px;">
        <el-option v-for="item in brandLabelList" :key="item.code" :label="item.value" :value="item.code" />
      </el-select>
      <el-select v-model="listQuery.administratorId" placeholder="选择负责人" clearable filterable class="filter-item"
        style="width: 200px;">
        <el-option v-for="item in staffList" :key="item.id" :label="item.name" :value="item.id">
          {{ item.roleName }}-{{ item.name }}
        </el-option>
      </el-select>
      <el-button v-permission="[`GET /admin${api.brandList}`]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" style="margin-left:10px;" @click="handleSearch">
        查找
      </el-button>
    </div>

    <TableTools :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '门店列表')">
      <el-button v-permission="[`POST /admin${api.brandCreate}`]" size="mini" type="primary" icon="el-icon-plus"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })">
        添加
      </el-button>
    </TableTools>

    <VxeTable ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey"
      :page="{ current: listQuery.page }" :is-request="false" :loading="listLoading" :table-data="tableData"
      :page-total="pageTotal" :columns="columns" @pageChange="pageChange">
      <template #picUrl="{ row }">
        <el-image v-if="row.picUrl" :src="row.picUrl" style="width:40px; height:40px" fit="cover"
          :preview-src-list="[row.picUrl]" />
      </template>

      <template #user="{ row }">
        <span>{{ row.user ? row.user.nickname : '--' }}</span>
      </template>

      <template #operate="{ row }">
        <el-button size="mini" @click="handleDetail(row)">
          查看
        </el-button>
        <el-button size="mini" @click="handleUpdate(row)">
          编辑
        </el-button>
        <el-button size="mini" type="success" @click="handleGoods(row)">
          商品
        </el-button>
        <el-button size="mini" type="success" @click="handleOrder(row)">
          订单
        </el-button>
        <el-button size="mini" type="success" @click="$refs.SetUserModal && $refs.SetUserModal.handleOpen(row)">
          设置用户
        </el-button>
        <el-button v-permission="[`POST /admin${api.freezeBrand}`]" type="warning" size="mini" @click="handleFreeze(row)">
          冻结
        </el-button>
        <el-button v-permission="[`POST /admin${api.brandDelete}`]" type="danger" size="mini" @click="handleDelete(row)">
          删除
        </el-button>
      </template>
    </VxeTable>

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" @success="getList" />
    <!-- 查看详情 -->
    <DetailModal ref="DetailModal" @success="getList" />
    <!-- 设置用户 -->
    <SetUserModal ref="SetUserModal" @success="getList"></SetUserModal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import DetailModal from './components/DetailModal'
import SetUserModal from './components/SetUserModal.vue'
import {
  api,
  brandList,
  brandDelete,
  freezeBrand,
  brandLabelList
} from '@/api/brand/brandList'
import { brandStyleList } from '@/api/brand/brandStyle'
import { staffList } from '@/api/enterprise/staff'
import { columns } from './table'

export default {
  name: 'BrandList',
  components: {
    VxeTable,
    TableTools,
    EditModal,
    DetailModal,
    SetUserModal
  },
  computed: {
    ...mapGetters([
      'common_regionList'
    ])
  },
  data() {
    return {
      customColumnsConfig: {
        localKey: 'BrandList',
        columnsOptions: columns
      },
      api,
      columns,
      tableData: [],
      pageTotal: 0,
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        region_arr: [],
        keeperName: '',
        phone: '',
        labelId: '',
        styleId: '',
        administratorId: ''
      },
      brandLabelList: [],
      brandStyleList: [],
      staffList: []
    }
  },
  created() {
    this.getBrandLabelList()
    this.getBrandStyleList()
    this.getStaffList()
    this.getList()
  },
  methods: {
    // 自定义列
    updateFields(columns) {
      this.columns = columns
    },
    pageChange(params) {
      this.listQuery = {
        ...this.listQuery,
        ...params
      }
      this.getList()
    },
    // 商品标签
    async getBrandLabelList() {
      const res = await brandLabelList()
      this.brandLabelList = res.data.data
    },
    // 商品风格
    async getBrandStyleList() {
      const res = await brandStyleList({
        page: 1,
        limit: 9999
      })
      this.brandStyleList = res.data.items
    },
    // 员工列表
    async getStaffList() {
      const res = await staffList({
        page: 1,
        limit: 9999
      })
      this.staffList = res.data.items
    },
    async getList() {
      this.listLoading = true
      try {
        const { region_arr, ...other } = this.listQuery
        const regionCode = Array.isArray(region_arr) && region_arr.length ? region_arr[region_arr.length - 1] : ''
        const params = {
          ...other,
          regionCode
        }
        const res = await brandList(params)
        const { page, limit } = this.listQuery
        this.tableData = res.data.items.map((item, index) => ({
          ...item,
          $index: (page - 1) * limit + (index + 1)
        }))
        this.pageTotal = res.data.total
      } finally {
        this.listLoading = false
      }
    },
    handleSearch() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDetail(row) {
      this.$refs.DetailModal && this.$refs.DetailModal.handleOpen(row)
    },
    handleUpdate(row) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen(row)
    },
    handleGoods(row) {
      this.$router.push({ name: 'BrandGoods', query: { brandId: row.id } })
    },
    handleOrder(row) {
      this.$router.push({ name: 'OrderList', query: { brandId: row.id } })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await brandDelete({ id })
      this.$elMessage('删除成功!')
      this.handleSearch()
    },
    async handleFreeze({ id }) {
      await this.$elConfirm('确认冻结?')
      await freezeBrand({ id })
      this.$elMessage('冻结成功!')
      this.handleSearch()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-rate__icon {
  margin-right: 2px;
}
</style>
