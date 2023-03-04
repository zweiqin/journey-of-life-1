<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.orderSn" clearable class="filter-item" style="width: 200px;" placeholder="请输入订单编号" @keyup.enter.native="getList" />
      <el-input v-model="listQuery.consignee" clearable class="filter-item" style="width: 200px;" placeholder="请输入收货人" @keyup.enter.native="getList" />
      <el-cascader
        v-model="listQuery.region_arr" placeholder="选择区域" :options="common_regionList"
        :props="{ checkStrictly: true, label: 'name', value: 'code', expandTrigger: 'hover' }" clearable size="mini"
        class="filter-item" style="width: 200px;"
      />
      <el-select
        v-model="listQuery.orderType" clearable multiple class="filter-item"
        style="width: 200px;"
        placeholder="选择订单类型"
      >
        <el-option label="线上订单" :value="1" />
        <el-option label="线下订单" :value="2" />
      </el-select>
      <el-select
        v-model="listQuery.orderStatusArray" clearable multiple class="filter-item"
        style="width: 150px;"
        placeholder="选择订单状态"
      >
        <el-option v-for="(key, val) in statusList" :key="key" :label="key" :value="val" />
      </el-select>
      <el-button
        v-permission="[ `GET /admin${api.orderList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" style="margin-left:10px;" @click="handleSearch"
      >
        查找
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '订单列表')"
    >
      <el-button
        v-if="isShopRole" v-permission="[ `POST /admin${api.orderAddLineOrder}` ]" size="mini" type="primary"
        icon="el-icon-plus" @click="$refs.CreateOrderModal && $refs.CreateOrderModal.handleOpen({ id: '' })"
      >
        添加线下订单
      </el-button>
    </TableTools>

    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey"
      :page="{ current: listQuery.page }" :is-request="false" :loading="listLoading" :table-data="tableData"
      :page-total="pageTotal" :columns="columns" @pageChange="pageChange"
    >
      <template #orderType="{ row }">
        {{ row.orderType | orderTypeFilter }}
      </template>
      <template #orderStatus="{ row }">
        {{ row.orderStatus | orderStatusFilter }}
      </template>
      <template #freightType="{ row }">
        {{ row.freightType | freightTypeFilter }}
      </template>
      <template #useVoucher="{ row }">
        <template v-if="row.useVoucher">
          <el-tag type="success" effect="plain" style="margin-right:4px">是</el-tag>
          <span>ID：{{ row.voucherId }}</span>
        </template>
        <el-tag v-else type="danger" effect="plain">否</el-tag>
      </template>
      <template #isFreeze="{ row }">
        <el-tag v-if="row.isFreeze" type="success" effect="plain">是</el-tag>
        <el-tag v-else type="danger" effect="plain">否</el-tag>
      </template>
      <template #freezeType="{ row }">
        {{ row.freezeType | freezeTypeFilter }}
      </template>

      <template #operate="{ row }">
        <el-button v-permission="[ `GET /admin${api.orderDetail}` ]" size="mini" @click="handleDetail(row)">
          查看
        </el-button>
        <el-button
          v-if="isShopRole" v-permission="[ `POST /admin${api.orderChangePrice}` ]"
          :disabled="row.orderStatus != 101" size="mini" type="warning" @click="handleChangePrice(row)"
        >
          改价
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.orderShip}` ]" :disabled="row.orderStatus != 201" size="mini"
          type="primary" @click="handleDeliver(row)"
        >
          发货
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.orderRefund}` ]" :disabled="row.orderStatus != 202" size="mini"
          type="warning" @click="handleRefund(row)"
        >
          退款
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.orderIsFreeze}` ]" :disabled="row.isFreeze" size="mini" type="danger"
          @click="handleFreeze(row, true)"
        >
          冻结
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.orderIsFreeze}` ]" :disabled="!row.isFreeze" size="mini"
          type="success" @click="handleFreeze(row, false)"
        >
          解冻
        </el-button>
      </template>
    </VxeTable>

    <!-- 发货 -->
    <DeliverModal ref="DeliverModal" @success="getList" />
    <!-- 发货 -->
    <ChangePriceModal ref="ChangePriceModal" @success="getList" />
    <!-- 退款 -->
    <RefundModal ref="RefundModal" @success="getList" />
    <!-- 创建订单 -->
    <CreateOrderModal ref="CreateOrderModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  orderList,
  orderIsFreeze
} from '@/api/orderManagement/order'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
// import Pagination from '@/components/Pagination'
import DeliverModal from './components/DeliverModal'
import ChangePriceModal from './components/ChangePriceModal'
import RefundModal from './components/RefundModal'
import CreateOrderModal from './components/CreateOrderModal'
import { mapGetters } from 'vuex'
import { columns } from './table'

const statusList = {
  101: '未付款',
  102: '用户取消',
  103: '系统取消',
  201: '已付款',
  202: '申请退款',
  203: '已退款',
  301: '已发货',
  401: '用户收货',
  402: '系统收货'
}

export default {
  name: 'OrderList',
  components: {
    VxeTable,
    TableTools,
    DeliverModal,
    ChangePriceModal,
    RefundModal,
    CreateOrderModal
  },
  filters: {
    orderTypeFilter(val) {
      return {
        1: '线上订单',
        2: '线下订单'
      }[val] || '--'
    },
    orderStatusFilter(val) {
      return statusList[val] || '--'
    },
    freightTypeFilter(val) {
      return {
        0: '快递',
        1: '自提'
      }[val] || '--'
    },
    freezeTypeFilter(val) {
      return {
        0: '未冻结',
        1: '客户投诉',
        2: '平台冻结'
      }[val] || '--'
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'common_regionList'
    ]),
    isShopRole() {
      return this.roles.includes('门店')
    }
  },
  data() {
    return {
      customColumnsConfig: {
        localKey: 'OrderList',
        columnsOptions: columns
      },
      api,
      columns,
      tableData: [],
      pageTotal: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        orderSn: '',
        consignee: '',
        region_arr: [],
        orderStatusArray: []
      },
      statusList
    }
  },
  created() {
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
    async getList() {
      const { brandId = '' } = this.$route.query
      // console.log(brandId)
      this.listLoading = true
      try {
        const { region_arr, ...other } = this.listQuery
        const regionId = Array.isArray(region_arr) && region_arr.length ? region_arr[region_arr.length - 1] : ''
        const params = {
          ...other,
          brandId,
          regionId
        }
        const res = await orderList(params)
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
    async handleDetail({ id }) {
      this.$router.push({ name: 'OrderDetail', query: { id } })
    },
    async handleCreate({ id }) {
      this.$router.push({ name: 'OrderDetail', query: { id } })
    },
    // 发货
    async handleDeliver({ id }) {
      this.$refs.DeliverModal && this.$refs.DeliverModal.handleOpen({ orderId: id })
    },
    // 改价
    async handleChangePrice({ id, actualPrice }) {
      this.$refs.ChangePriceModal && this.$refs.ChangePriceModal.handleOpen({ orderId: id, actualPrice })
    },
    // 退款
    async handleRefund({ id, actualPrice }) {
      this.$refs.RefundModal && this.$refs.RefundModal.handleOpen({ orderId: id, refundMoney: actualPrice })
    },
    // 冻结
    async handleFreeze({ id }, isFreeze) {
      await this.$elConfirm(`确认${isFreeze ? '冻结' : '解冻'}?`)
      await orderIsFreeze({
        orderId: id,
        isFreeze
      })
      this.$elMessage()
      this.getList()
    }
  }
}
</script>
