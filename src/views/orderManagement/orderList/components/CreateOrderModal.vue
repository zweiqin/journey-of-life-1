<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions">
		<el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="100px">
			<el-form-item label="订单类型" prop="orderType">
				线下订单
			</el-form-item>
			<el-form-item label="收件人" prop="consignee">
				<el-input v-model.trim="formData.consignee" placeholder="请输入收件人" />
			</el-form-item>
			<el-form-item label="收件人电话" prop="mobile">
				<el-input v-model.trim="formData.mobile" placeholder="请输入收件人电话" />
			</el-form-item>
			<el-form-item label="区域" prop="region_arr">
				<el-cascader
					v-model="formData.region_arr" placeholder="请选择区域" :options="common_regionList"
					:props="{ label: 'name', value: 'code', expandTrigger: 'hover' }" style="width:100%" clearable
				/>
			</el-form-item>
			<el-form-item label="收货地址" prop="address">
				<el-input v-model.trim="formData.address" placeholder="请输入收货地址" />
			</el-form-item>
			<el-form-item label="订单留言" prop="message">
				<el-input
					v-model="formData.message" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }" maxlength="520"
					show-word-limit placeholder="请输入订单留言"
				/>
			</el-form-item>
			<el-form-item label="商品" prop="goodsId">
				<el-select v-model="formData.goodsId" placeholder="请选择商品" filterable @change="getGoodsDetail">
					<el-option v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.id" />
				</el-select>
			</el-form-item>
			<el-form-item label="商品规格" prop="productId">
				<el-select v-model="formData.productId" placeholder="请选择商品规格" @change="formData.goodsNum = ''">
					<el-option v-for="item in productList" :key="item.id" :label="item.specificationsStr" :value="item.id" />
				</el-select>
			</el-form-item>
			<!-- goodsNum -->
			<el-form-item label="商品数量" prop="goodsNum">
				<el-input-number v-model="formData.goodsNum" :min="1" :max="productItem.number || 0" />
			</el-form-item>
			<el-form-item label="总计" prop="goodsPrice">
				¥ {{ goodsPrice | commafyFilter }}
			</el-form-item>
			<el-form-item label="业务员" prop="salesman">
				<el-input v-model.trim="formData.salesman" placeholder="请输入业务员" />
			</el-form-item>
			<el-form-item label="配送方式" prop="freightType">
				<el-radio-group v-model="formData.freightType" @change="formData.freightPrice = ''">
					<el-radio :label="0">快递</el-radio>
					<el-radio :label="1">自提</el-radio>
				</el-radio-group>
			</el-form-item>

			<template v-if="formData.freightType == 0">
				<el-form-item label="快递公司" prop="shipChannel">
					<el-select v-model="formData.shipChannel" clearable filterable placeholder="请选择快递公司">
						<el-option v-for="item in shipChannelList" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="快递单号" prop="shipSn">
					<el-input v-model="formData.shipSn" placeholder="请输入快递单号" />
				</el-form-item>
				<el-form-item label="发货时间" prop="shipTime">
					<el-date-picker
						v-model="formData.shipTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
						placeholder="选择发货时间"
					/>
				</el-form-item>
				<el-form-item label="快递费用" prop="freightPrice">
					<el-input v-model.trim="formData.freightPrice" placeholder="请输入快递费用" />
				</el-form-item>
			</template>

			<el-form-item label="实付费用" prop="actualPrice">
				<el-input v-model.trim="formData.actualPrice" placeholder="请输入实付费用" />
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<div style="flex: 1;">
				<h4>订单费用：¥ {{ orderPrice | commafyFilter }}</h4>
				<h4>实付费用：¥ {{ formData.actualPrice | commafyFilter }}</h4>
			</div>
			<div>
				<el-button size="mini" @click="handleClose">取 消</el-button>
				<el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { regMoney } from '@/utils/reg'
import { orderListShipChannel, orderAddLineOrder } from '@/api/orderManagement/order'
import XeUtils from 'xe-utils'
import { goodsList, goodsDetail } from '@/api/goods/goodsList'
import { commafyFn } from '@/utils'

export default {
	name: 'CreateOrderModal',
	filters: {
		commafyFilter(val) {
			return commafyFn(val)
		}
	},
	computed: {
		...mapGetters([
			'common_regionList'
		]),
		goodsPrice() {
			const { goodsNum } = this.formData
			const { productItem } = this
			// const goodsItem = this.goodsList.find(v => v.id === productId)
			if (productItem.id) {
				return XeUtils.multiply(productItem.price, goodsNum)
			}
			return 0
		},
		orderPrice() {
			const { freightPrice } = this.formData
			return XeUtils.add(this.goodsPrice, freightPrice)
		},
		productItem() {
			const { productId } = this.formData
			return this.productList.find((v) => v.id === productId) || {}
		}
	},
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '800px',
				title: '创建线下订单'
			},
			visible: false,
			formData: {
				orderType: 2,
				consignee: '',
				mobile: '',
				region_arr: [],
				address: '',
				message: '',
				goodsId: '',
				productId: '',
				goodsNum: '',
				goodsPrice: '',
				freightPrice: '',
				orderPrice: '',
				actualPrice: '',
				salesman: '',
				freightType: 0,
				shipChannel: '',
				shipSn: '',
				shipTime: ''
			},
			formRules: {
				consignee: [
					{ required: true, message: '请输入收件人' }
				],
				mobile: [
					{ required: true, message: '请输入收件人电话' }
				],
				region_arr: [
					{ required: true, type: 'array', message: '请选择区域' }
				],
				address: [
					{ required: true, message: '请输入收货地址' }
				],
				message: [
					{ required: true, message: '请输入订单留言' }
				],
				goodsId: [
					{ required: true, message: '请选择商品' }
				],
				productId: [
					{ required: true, message: '请选择商品' }
				],
				goodsNum: [
					{ type: 'number', required: true, message: '请输入商品数量' }
				],
				freightPrice: [
					{ required: true, message: '请输入快递费用' },
					{ pattern: regMoney, message: '金额有误' }
				],
				actualPrice: [
					{ required: true, message: '请输入实付费用' },
					{ pattern: regMoney, message: '金额有误' }
				],
				salesman: [
					{ required: true, message: '请输入业务员' }
				],
				freightType: [
					{ required: true, message: '请选择配送方式' }
				],
				shipChannel: [
					{ required: true, message: '请选择快递公司' }
				],
				shipSn: [
					{ required: true, message: '请输入快递单号' }
				],
				shipTime: [
					{ required: true, message: '请选择发货时间' }
				]
			},
			shipChannelList: [],
			goodsList: [],
			productList: []
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.getShipChannelList()
			this.getGoodsList()
			this.formData = Object.assign(this.$options.data().formData, params)
			this.visible = true
			this.$refs.formData && this.$refs.formData.resetFields()
		},
		async getShipChannelList() {
			const res = await orderListShipChannel()
			this.shipChannelList = res.data.shipChannelList
		},
		// 商品列表
		async getGoodsList() {
			const res = await goodsList({
				page: 1,
				limit: 99999
			})
			this.goodsList = res.data.items
		},
		async getGoodsDetail(id) {
			this.formData.productId = ''
			this.formData.goodsNum = ''
			const res = await goodsDetail({ id })
			const { products } = res.data
			this.productList = products.map((v) => ({
				...v,
				specificationsStr: v.specifications.toString()
			}))
			if (Array.isArray(products) && products.length === 1) {
				this.formData.productId = products[0].id
			}
			console.log('res', res)
		},
		async handleSubmit() {
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				const {
					region_arr,
					freightType,
					shipChannel,
					shipSn,
					shipTime,
					goodsId,
					productId,
					goodsNum,
					...opts
				} = this.formData
				const params = {
					order: {
						...opts,
						regionId: region_arr[region_arr.length - 1],
						freightType,
						goodsPrice: this.goodsPrice,
						orderPrice: this.orderPrice,
						shipChannel: freightType === 0 ? shipChannel : '',
						shipSn: freightType === 0 ? shipSn : '',
						shipTime: freightType === 0 ? shipTime : ''
					},
					productId,
					goodsNum
				}
				console.log('params', params)
				const res = await orderAddLineOrder(params)
				loading.close()
				this.$elMessage()
				this.$emit('success')
				this.visible = false
			} catch (e) {
				loading.close()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.el-select {
	width: 100%;
}

.dialog-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: left;

	h4 {
		line-height: 22px;
	}
}
</style>
