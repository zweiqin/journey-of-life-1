<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.userId"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入用户ID"
      />
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
      <el-button
        v-permission="[`GET /admin${api.orderList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="handleFilter"
      >查找</el-button>
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
        <el-table-column align="center" min-width="100" label="订单状态" prop="orderStatus" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="收货人名称" prop="consignee" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="收货人手机号" prop="mobile" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="收货地址" prop="address" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="区域" prop="regionId" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="用户订单留言" prop="message" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="商品总费用" prop="goodsPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="配送费用" prop="freightPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="优惠券减免" prop="couponPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="用户积分减免" prop="integralPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="使用代金券数" prop="voucherPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="团购优惠减免" prop="grouponPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="订单费用" prop="orderPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="实付费用" prop="actualPrice" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="微信付款编号" prop="payId" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="付款时间" prop="payTime" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="发货时间" prop="shipSn" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="发货快递" prop="shipChannel" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="发货开始时间" prop="shipTime" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="业务员名称" prop="salesman" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="用户确认收货时间" prop="confirmTime" show-overflow-tooltip />
        <el-table-column align="center" min-width="90" label="待评价订单商品数量" prop="comments" show-overflow-tooltip />
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
        <el-table-column align="center" min-width="150" label="是否使用代金券" prop="useVoucher" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="代金券ID" prop="voucherId" show-overflow-tooltip />
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
        <!-- <el-table-column
          label="操作"
          width="150"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-permission="[`POST /admin${api.userUpdate}`]"
              type="primary"
              size="mini"
              @click="handleEdit(row)"
            >编辑</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>

    <Pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />

    <!-- 新增编辑 -->
    <EditModal ref="EditModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  orderList,
} from '@/api/orderManagement/order'
import Pagination from '@/components/Pagination';
import EditModal from './components/EditModal'
import { mapGetters } from 'vuex'

export default {
  name: 'OrderList',
  components: {
    Pagination,
    EditModal,
  },
  filters: {
    orderTypeFilter(val) {
      return {
        1: '线上订单',
        2: '线下订单',
      }[val] || '--'
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
      'common_regionList',
    ]),
    isAdmin() {
      return this.roles.includes('超级管理员')
    },
    isShop() {
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
        userId: '',
        orderSn: '',
        consignee: '',
        region_arr: [],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      try {
        const { region_arr, ...other } = this.listQuery
        const regionId = Array.isArray(region_arr) && region_arr.length ? region_arr[region_arr.length - 1] : ''
        const params = {
          ...other,
          regionId
        }
        const res = await orderList(params)
        this.list = res.data.items;
        this.total = res.data.total;
      } finally {
        this.listLoading = false;
      }
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    async handleEdit({ id, birthday, regionCode, brandRemark, platformRemark }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, birthday, regionCode, brandRemark, platformRemark })
    },
  }
};
</script>
