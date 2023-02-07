<template>
	<div class="app-container">
		<div class="body-container">
			<el-card>
				<div slot="header" class="header">
					<h4>订单编号：{{ orderInfo.orderSn }}（{{ orderInfo.orderType | orderTypeFilter }}）</h4>
					<h4>订单状态：{{ orderInfo.orderStatus | orderStatusFilter }}</h4>
				</div>
				<el-row>
					<el-col :span="12" class="item">
						<span class="label label-left">下单人</span>
						<el-image
							:src="userInfo.avatar"
							style="width: 30px; height: 30px;border-radius:50%;margin-right:8px;"
							fit="contain"
						/>
						{{ userInfo.nickname }}
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-right">区域</span>
						<span>{{ orderInfo.regionId }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-left">收货人</span>
						<span>{{ orderInfo.consignee }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-right">收货人手机号</span>
						<span>{{ orderInfo.mobile }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-left">收货地址</span>
						<span>{{ orderInfo.address }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-right">区域</span>
						<span>{{ orderInfo.regionName }}</span>
					</el-col>
					<el-col :span="24" class="item">
						<span class="label label-left">订单留言</span>
						<span>{{ orderInfo.message }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-left">配送方式</span>
						<span>{{ orderInfo.freightType | freightTypeFilter }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-right">待评价商品数</span>
						<span>{{ orderInfo.comments }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-left">发货快递</span>
						<span>{{ orderInfo.shipChannel }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-right">快递单号</span>
						<span>{{ orderInfo.shipSn }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-left">提货码</span>
						<span>{{ orderInfo.fetchCode }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-right">发货时间</span>
						<span>{{ orderInfo.shipTime }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-left">确认收货时间</span>
						<span>{{ orderInfo.confirmTime }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-right">订单关闭时间</span>
						<span>{{ orderInfo.endTime }}</span>
					</el-col>
					<el-col :span="24" class="item">
						<span class="label label-left">费用明细</span>
						<span>
							(实际费用){{ orderInfo.actualPrice }}元 =
							(商品总价){{ orderInfo.goodsPrice }}元 +
							(快递费用){{ orderInfo.freightPrice }}元 -
							(优惠券减免){{ orderInfo.couponPrice }}元 -
							(代金券减免){{ orderInfo.voucherPrice }}元 -
							(团购减免){{ orderInfo.grouponPrice }}元 -
							(积分减免){{ orderInfo.integralPrice }}元
						</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-left">支付方式</span>
						<span>{{ orderInfo.orderTypeFilter == 1 ? '线上' : '微信支付' }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-right">支付时间</span>
						<span>{{ orderInfo.payTime }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-left">业务员名称</span>
						<span>{{ orderInfo.salesman }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-right">代理结算金额</span>
						<span>{{ orderInfo.settlementMoney }}</span>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-left">使用代金券</span>
						<template v-if="orderInfo.useVoucher">
							<el-tag type="success" effect="plain" style="margin-right:4px">是</el-tag>
							<span>{{ orderInfo.voucherId }}</span>
						</template>
						<el-tag v-else type="danger" effect="plain">否</el-tag>
					</el-col>
					<el-col :span="12" class="item">
						<span class="label label-right">是否冻结</span>
						<el-tag v-if="orderInfo.isFreeze" type="success" effect="plain">是</el-tag>
						<el-tag v-else type="danger" effect="plain">否</el-tag>
					</el-col>
					<el-col v-if="orderInfo.isFreeze" :span="12" class="item">
						<span class="label label-right">冻结类型</span>
						<span>{{ orderInfo.freezeType | freezeTypeFilter }}</span>
					</el-col>
					<el-col v-if="orderInfo.freezeType == 1" :span="12" class="item">
						<span class="label label-right">投诉原因</span>
						<span>{{ orderInfo.complainReason }}</span>
					</el-col>
				</el-row>
			</el-card>
			<el-card>
				<div slot="header" class="header">
					<h4>订单商品</h4>
				</div>
				<el-table
					:data="orderGoods"
					v-bind="$tableCommonOptions"
				>
					<el-table-column align="center" width="100" label="商品图片" prop="picUrl">
						<template slot-scope="{ row }">
							<el-image v-if="row.picUrl" :src="row.picUrl" style="width:40px; height:40px" fit="cover" :preview-src-list="[ row.picUrl ]" />
						</template>
					</el-table-column>
					<el-table-column align="center" min-width="150" label="商品名称" prop="goodsName" />
					<el-table-column align="center" min-width="150" label="商品编号" prop="goodsSn" />
					<el-table-column align="center" min-width="150" label="货品规格" prop="specifications" />
					<el-table-column align="center" width="100" label="货品价格" prop="price" />
					<el-table-column align="center" width="100" label="货品数量" prop="number" />
				</el-table>
			</el-card>
		</div>

		<div class="footer-container">
			<el-button size="medium" @click="handleBack">返回</el-button>
			<el-button
				v-if="isShopRole && orderInfo.orderStatus == 101"
				v-permission="[ `POST /admin${api.orderChangePrice}` ]"
				size="medium"
				type="warning"
				@click="handleChangePrice(orderInfo)"
			>
				改价
			</el-button>
			<el-button
				v-if="orderInfo.orderStatus == 201"
				v-permission="[ `POST /admin${api.orderShip}` ]"
				size="medium"
				type="success"
				@click="handleDeliver(orderInfo)"
			>
				发货
			</el-button>
			<el-button
				v-if="orderInfo.orderStatus == 202"
				v-permission="[ `POST /admin${api.orderRefund}` ]"
				size="medium"
				type="warning"
				@click="handleRefund(orderInfo)"
			>
				退款
			</el-button>
			<el-button
				v-if="!orderInfo.isFreeze"
				v-permission="[ `POST /admin${api.orderIsFreeze}` ]"
				size="medium"
				type="danger"
				@click="handleFreeze(orderInfo, true)"
			>
				冻结
			</el-button>
			<el-button
				v-if="orderInfo.isFreeze"
				v-permission="[ `POST /admin${api.orderIsFreeze}` ]"
				size="medium"
				type="success"
				@click="handleFreeze(orderInfo, false)"
			>
				解冻
			</el-button>
		</div>

		<!-- 发货 -->
		<DeliverModal ref="DeliverModal" @success="getInfo" />
		<!-- 发货 -->
		<ChangePriceModal ref="ChangePriceModal" @success="getInfo" />
		<!-- 退款 -->
		<RefundModal ref="RefundModal" @success="getInfo" />
	</div>
</template>

<script>
import {
	api,
	orderDetail
} from '@/api/orderManagement/order'
import { mapGetters } from 'vuex'
import DeliverModal from '@/views/orderManagement/orderList/components/DeliverModal'
import ChangePriceModal from '@/views/orderManagement/orderList/components/ChangePriceModal'
import RefundModal from '@/views/orderManagement/orderList/components/RefundModal'

export default {
	name: 'OrderDetail',
	components: {
		DeliverModal,
		ChangePriceModal,
		RefundModal
	},
	filters: {
		orderTypeFilter(val) {
			return {
				1: '线上订单',
				2: '线下订单'
			}[val] || '--'
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
		},
		orderStatusFilter(val) {
			return {
				101: '未付款',
				102: '用户取消',
				103: '系统取消',
				201: '已付款',
				202: '申请退款',
				203: '已退款',
				301: '已发货',
				401: '用户收货',
				402: '系统收货'
			}[val] || '--'
		}
	},
	computed: {
		...mapGetters([
			'roles'
		]),
		isShopRole() {
			return this.roles.includes('门店')
		}
	},
	data() {
		return {
			api,
			userInfo: {},
			orderInfo: {},
			orderGoods: []
		}
	},
	created() {
		const { id } = this.$route.query
		id && this.getInfo(id)
	},
	methods: {
		async getInfo(id) {
			const res = await orderDetail({ id })
			this.userInfo = res.data.user
			this.orderInfo = res.data.order
			this.orderGoods = res.data.orderGoods
		},
		handleBack() {
			this.$router.push({ name: 'OrderList' })
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

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    display: inline-block;
  }
}
.item {
  display: flex;
  align-items: center;
  min-height: 40px;
  flex-wrap: wrap;
}
.label {
  display: inline-block;
  width: 120px;
  // text-align-last: justify;
  &::after {
    display: inline-block;
    content: "：";
  }
}
.label-left {
	text-align: left;
}
.label-right {
	text-align: right;
}
.app-container {
  height: 100%;
  padding: 0;
  .body-container {
    flex: 1;
    overflow-y: auto;
		padding: 20px 20px 0 20px;
  }
  .footer-container {
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
}
</style>

