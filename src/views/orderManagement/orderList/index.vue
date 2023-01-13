<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.orderSn"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入订单编号"
      />
      <el-input
        v-model="listQuery.consignee"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入收货人"
      />
      <el-cascader
        v-model="listQuery.region_arr"
        placeholder="选择区域"
        :options="common_regionList"
        :props="{ checkStrictly: true, label: 'name', value: 'code' }"
        expand-trigger="hover"
        clearable
        size="mini"
        class="filter-item"
        style="width: 200px;"
      />
      <el-select
        v-model="listQuery.orderType"
        clearable
        multiple
        class="filter-item"
        style="width: 200px;"
        placeholder="选择订单类型"
      >
        <el-option label="线上订单" :value="1" />
        <el-option label="线下订单" :value="2" />
      </el-select>
      <el-select
        v-model="listQuery.orderStatusArray"
        clearable
        multiple
        class="filter-item"
        style="width: 300px;"
        placeholder="选择订单状态"
      >
        <el-option
          v-for="(key, val) in statusList"
          :key="key"
          :label="key"
          :value="val"
        />
      </el-select>
      <el-button
        v-permission="[`GET /admin${api.orderList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="handleSearch"
      >查找</el-button>
      <br />
      <el-button
        v-if="isShopRole"
        v-permission="[`POST /admin${api.orderAddLineOrder}`]"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.CreateOrderModal && $refs.CreateOrderModal.handleOpen({ id: '' })"
      >添加线下订单</el-button>
    </div>

    <!-- 查询结果 -->
    <div v-tableHeight>
      <el-table
        height="100%"
        v-loading="listLoading"
        element-loading-text="正在查询中。。。"
        :data="list"
        v-bind="$tableCommonOptions"
      >
        <el-table-column align="center" width="100" label="ID" prop="id" fixed="left" />
        <el-table-column align="center" min-width="150" label="订单编号" prop="orderSn" show-overflow-tooltip fixed="left" />
        <el-table-column align="center" min-width="100" label="用户ID" prop="userId" show-overflow-tooltip fixed="left" />
        <el-table-column align="center" min-width="100" label="订单类型" prop="orderType">
          <template slot-scope="{row}">
            {{ row.orderType | orderTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="100" label="订单状态" prop="orderStatus" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{ row.orderStatus | orderStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="100" label="收货人名称" prop="consignee" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="收货人手机号" prop="mobile" show-overflow-tooltip />
        <el-table-column align="center" min-width="300" label="收货地址" prop="address" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="区域" prop="regionName" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="订单留言" prop="message" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="商品总价" prop="goodsPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="快递费用" prop="freightPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="优惠券减免" prop="couponPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="用户积分减免" prop="integralPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="代金券减免" prop="voucherPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="团购减免" prop="grouponPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="订单费用" prop="orderPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="实付费用" prop="actualPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="微信付款编号" prop="payId" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="付款时间" prop="payTime" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="快递单号" prop="shipSn" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="发货快递" prop="shipChannel" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="发货时间" prop="shipTime" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="业务员名称" prop="salesman" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="确认收货时间" prop="confirmTime" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="待评价商品数" prop="comments" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="订单关闭时间" prop="endTime" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="代理结算金额" prop="settlementMoney" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="结算状态" prop="settlementStatus" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="配送方式" prop="freightType">
          <template slot-scope="{row}">
            {{ row.freightType | freightTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="100" label="推广用户" prop="shareUserId" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="提货码" prop="fetchCode" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="原始创建人" prop="createUserId" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="转赠发送时间" prop="giftSendTime" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="转增接收时间" prop="giftReceiveTime" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="使用代金券" prop="useVoucher">
          <template slot-scope="{row}">
            <template v-if="row.useVoucher">
              <el-tag type="success" effect="plain" style="margin-right:4px">是</el-tag>
              <span>ID：{{ row.voucherId }}</span>
            </template>
            <el-tag v-else type="danger" effect="plain">否</el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" min-width="100" label="是否冻结" prop="isFreeze">
          <template slot-scope="{row}">
            <el-tag v-if="row.isFreeze" type="success" effect="plain">是</el-tag>
            <el-tag v-else type="danger" effect="plain">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="100" label="冻结类型" prop="freezeType">
          <template slot-scope="{row}">
            {{ row.freezeType | freezeTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="200" label="投诉原因" prop="complainReason" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span v-if="row.freezeType==1">{{ row.complainReason }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        
        <el-table-column align="center" min-width="150" label="创建时间" prop="addTime" />
        <el-table-column align="center" min-width="150" label="更新时间" prop="updateTime" />
        <el-table-column
          label="操作"
          width="200"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-permission="[`GET /admin${api.orderDetail}`]"
              size="mini"
              @click="handleDetail(row)"
            >查看</el-button>
            <el-button
              v-if="isShopRole && row.orderStatus==101"
              v-permission="[`POST /admin${api.orderChangePrice}`]"
              size="mini"
              type="warning"
              @click="handleChangePrice(row)"
            >改价</el-button>
            <el-button
              v-if="row.orderStatus==201"
              v-permission="[`POST /admin${api.orderShip}`]"
              size="mini"
              type="success"
              @click="handleDeliver(row)"
            >发货</el-button>
            <el-button
              v-if="row.orderStatus==202"
              v-permission="[`POST /admin${api.orderRefund}`]"
              size="mini"
              type="warning"
              @click="handleRefund(row)"
            >退款</el-button>
            <el-button
              v-if="!row.isFreeze"
              v-permission="[`POST /admin${api.orderIsFreeze}`]"
              size="mini"
              type="danger"
              @click="handleFreeze(row, true)"
            >冻结</el-button>
            <el-button
              v-if="row.isFreeze"
              v-permission="[`POST /admin${api.orderIsFreeze}`]"
              size="mini"
              type="success"
              @click="handleFreeze(row, false)"
            >解冻</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <Pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />

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
  orderIsFreeze,
} from '@/api/orderManagement/order'
import Pagination from '@/components/Pagination';
import DeliverModal from './components/DeliverModal'
import ChangePriceModal from './components/ChangePriceModal'
import RefundModal from './components/RefundModal'
import CreateOrderModal from './components/CreateOrderModal'
import { mapGetters } from 'vuex'

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
    Pagination,
    DeliverModal,
    ChangePriceModal,
    RefundModal,
    CreateOrderModal,
  },
  filters: {
    orderTypeFilter(val) {
      return {
        1: '线上订单',
        2: '线下订单',
      }[val] || '--'
    },
    orderStatusFilter(val) {
      return statusList[val] || '--'
    },
    freightTypeFilter(val) {
      return {
        0: '快递',
        1: '自提',
      }[val] || '--'
    },
    freezeTypeFilter(val) {
      return {
        0: '未冻结',
        1: '客户投诉',
        1: '平台冻结',
      }[val] || '--'
    },
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
      api,
      list: undefined,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
        orderSn: '',
        consignee: '',
        region_arr: [],
        orderStatusArray: [],
      },
      statusList
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const { brandId = '' } = this.$route.query
      this.listLoading = true;
      try {
        const { region_arr, ...other } = this.listQuery
        const regionId = Array.isArray(region_arr) && region_arr.length ? region_arr[region_arr.length - 1] : ''
        const params = {
          ...other,
          brandId,
          regionId
        }
        const res = await orderList(params)
        this.list = res.data.items;
        this.total = res.data.total;
      } finally {
        this.listLoading = false;
      }
    },
    handleSearch() {
      this.listQuery.page = 1;
      this.getList();
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
    },
  }
};
</script>
