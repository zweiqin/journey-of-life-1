<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<el-input
				v-model="listQuery.name" clearable size="mini" class="filter-item"
				style="width: 200px;"
				placeholder="请输入优惠券标题"
			/>
			<el-select
				v-model="listQuery.type" clearable size="mini" style="width: 200px"
				class="filter-item"
				placeholder="请选择优惠券类型"
			>
				<el-option v-for="type in typeOptions" :key="type.value" :label="type.label" :value="type.value" />
			</el-select>
			<el-select
				v-model="listQuery.status" clearable size="mini" style="width: 200px"
				class="filter-item"
				placeholder="请选择优惠券状态"
			>
				<el-option v-for="type in statusOptions" :key="type.value" :label="type.label" :value="type.value" />
			</el-select>
			<el-button
				v-permission="[ `GET ${api.couponList}` ]" size="mini" class="filter-item" type="primary"
				icon="el-icon-search" @click="getList"
			>
				查找
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
			@refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '优惠券')"
		>
			<el-button
				v-permission="[ `POST ${api.couponCreate}` ]" size="mini" type="primary"
				icon="el-icon-plus" @click="handleCreate"
			>
				添加
			</el-button>
			<!-- <el-button
				:loading="downloadLoading" size="mini" class="filter-item" type="warning"
				icon="el-icon-download"
				@click="handleDownload"
				>
				导出
				</el-button> -->
		</TableTools>

		<!-- 优惠券列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
			:api-path="api.couponList" :columns="columns" @post-data="handlePostData"
		>
			<template #min="{ row }">
				<span>满{{ row.min }}元可用</span>
			</template>
			<template #discount="{ row }">
				<span>减免{{ row.discount }}元</span>
			</template>
			<template #limit="{ row }">
				<span>{{ row.limit != 0 ? row.limit : "不限" }}</span>
			</template>
			<template #goodsType="{ row }">
				<span>{{ row.goodsType | formatGoodsType }}</span>
			</template>
			<template #type="{ row }">
				<span>{{ row.type | formatType }}</span>
			</template>
			<template #total="{ row }">
				<span>{{ row.total != 0 ? row.total : "不限" }}</span>
			</template>
			<template #status="{ row }">
				<span>{{ row.status | formatStatus }}</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `GET ${api.couponRead}` ]" size="mini"
					@click="handleDetail(row)"
				>
					详情
				</el-button>
				<el-button
					v-permission="[ `POST ${api.couponUpdate}` ]" type="info" size="mini"
					@click="handleUpdate(row)"
				>
					编辑
				</el-button>
				<el-button
					v-permission="[ `POST ${api.couponDelete}` ]" type="danger" size="mini"
					@click="handleDelete(row)"
				>
					删除
				</el-button>
			</template>
		</VxeTable>

		<!-- 添加或修改对话框 -->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form
				ref="dataForm" :rules="rules" :model="dataForm" status-icon
				label-position="left" label-width="100px"
				style="width: 400px; margin-left:50px;"
			>
				<el-form-item label="优惠券名称" prop="name">
					<el-input v-model="dataForm.name" />
				</el-form-item>
				<el-form-item label="介绍" prop="desc">
					<el-input v-model="dataForm.desc" />
				</el-form-item>
				<el-form-item label="标签" prop="tag">
					<el-input v-model="dataForm.tag" />
				</el-form-item>
				<el-form-item label="最低消费" prop="min">
					<el-input v-model="dataForm.min">
						<template #append>元</template>
					</el-input>
				</el-form-item>
				<el-form-item label="满减金额" prop="discount">
					<el-input v-model="dataForm.discount">
						<template #append>元</template>
					</el-input>
				</el-form-item>
				<el-form-item label="每人限领" prop="limit">
					<el-input v-model="dataForm.limit">
						<template #append>张</template>
					</el-input>
				</el-form-item>
				<el-form-item label="分发类型" prop="type">
					<el-select v-model="dataForm.type">
						<el-option v-for="type in typeOptions" :key="type.value" :label="type.label" :value="type.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="优惠券数量" prop="total">
					<el-input v-model="dataForm.total">
						<template #append>张</template>
					</el-input>
				</el-form-item>
				<el-form-item label="有效期">
					<el-radio-group v-model="dataForm.timeType">
						<el-radio-button :label="0">领券相对天数</el-radio-button>
						<el-radio-button :label="1">指定绝对时间</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-show="dataForm.timeType === 0">
					<el-input v-model="dataForm.days">
						<template #append>天</template>
					</el-input>
				</el-form-item>
				<el-form-item v-show="dataForm.timeType === 1">
					<el-col :span="11">
						<el-date-picker
							v-model="dataForm.startTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
							style="width: 100%;"
						/>
					</el-col>
					<el-col :span="2" class="line">至</el-col>
					<el-col :span="11">
						<el-date-picker
							v-model="dataForm.endTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
							style="width: 100%;"
						/>
					</el-col>
				</el-form-item>
				<el-form-item label="商品限制范围">
					<el-radio-group v-model="dataForm.goodsType">
						<el-radio-button :label="0">全场通用</el-radio-button>
						<el-radio-button :label="1">指定分类</el-radio-button>
						<el-radio-button :label="2">指定商品</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-show="dataForm.goodsType === 1">
					目前不支持
				</el-form-item>
				<el-form-item v-show="dataForm.goodsType === 2">
					目前不支持
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button v-if="dialogStatus == 'create'" type="primary" @click="createData">确定</el-button>
				<el-button v-else type="primary" @click="updateData">确定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
import { api, couponCreate, couponUpdate, couponDelete } from '@/api/business/coupon'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from './table'

const defaultTypeOptions = [
	{
		label: '通用领券',
		value: 0
	},
	{
		label: '注册赠券',
		value: 1
	},
	{
		label: '兑换码',
		value: 2
	}
]
const defaultStatusOptions = [
	{
		label: '正常',
		value: 0
	},
	{
		label: '已过期',
		value: 1
	},
	{
		label: '已下架',
		value: 2
	}
]

export default {
	name: 'Coupon',
	components: {
		VxeTable,
		TableTools
	},
	filters: {
		formatType(type) {
			for (let i = 0; i < defaultTypeOptions.length; i++) {
				if (type === defaultTypeOptions[i].value) {
					return defaultTypeOptions[i].label
				}
			}
			return ''
		},
		formatGoodsType(goodsType) {
			if (goodsType === 0) {
				return '全场通用'
			} else if (goodsType === 1) {
				return '指定分类'
			}
			return '指定商品'
		},
		formatStatus(status) {
			if (status === 0) {
				return '正常'
			} else if (status === 1) {
				return '已过期'
			}
			return '已下架'
		}
	},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'coupon',
				columnsOptions: columns
			},
			typeOptions: Object.assign({}, defaultTypeOptions),
			statusOptions: Object.assign({}, defaultStatusOptions),
			listQuery: {
				page: 1,
				limit: 20,
				name: undefined,
				type: undefined,
				status: undefined,
				sort: 'add_time',
				order: 'desc'
			},
			list: undefined,
			dataForm: {
				id: undefined,
				name: undefined,
				desc: undefined,
				tag: undefined,
				total: 0,
				discount: 0,
				min: 0,
				limit: 1,
				type: 0,
				status: 0,
				goodsType: 0,
				goodsValue: [],
				timeType: 0,
				days: 0,
				startTime: null,
				endTime: null
			},
			dialogFormVisible: false,
			dialogStatus: '',
			textMap: {
				update: '编辑',
				create: '创建'
			},
			rules: {
				name: [
					{ required: true, message: '优惠券标题不能为空', trigger: 'blur' }
				]
			}
		}
	},
	created() {},
	methods: {
		// 自定义列
		updateFields(columns) {
			this.columns = columns
		},
		getList(meaning) {
			meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
		},
		handlePostData(postData) {
			this.list = postData
		},
		resetForm() {
			this.dataForm = {
				id: undefined,
				name: undefined,
				desc: undefined,
				tag: undefined,
				total: 0,
				discount: 0,
				min: 0,
				limit: 1,
				type: 0,
				status: 0,
				goodsType: 0,
				goodsValue: [],
				timeType: 0,
				days: 0,
				startTime: null,
				endTime: null
			}
		},
		handleCreate() {
			this.resetForm()
			this.dialogStatus = 'create'
			this.dialogFormVisible = true
			this.$nextTick(() => {
				this.$refs.dataForm.clearValidate()
			})
		},
		createData() {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					couponCreate(this.dataForm)
						.then((response) => {
							this.list.unshift(response.data)
							this.dialogFormVisible = false
							this.$notify.success({
								title: '成功',
								message: '创建优惠券成功'
							})
						})
						.catch((response) => {
							this.$notify.error({
								title: '失败',
								message: response.errmsg
							})
						})
				}
			})
		},
		handleUpdate(row) {
			this.dataForm = Object.assign({}, row)
			this.dialogStatus = 'update'
			this.dialogFormVisible = true
			this.$nextTick(() => {
				if (this.dataForm.days === 0) {
					this.dataForm.daysType = 1
				} else {
					this.dataForm.daysType = 0
				}
				this.$refs.dataForm.clearValidate()
			})
		},
		updateData() {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					couponUpdate(this.dataForm)
						.then(() => {
							for (const v of this.list) {
								if (v.id === this.dataForm.id) {
									const index = this.list.indexOf(v)
									this.list.splice(index, 1, this.dataForm)
									break
								}
							}
							this.dialogFormVisible = false
							this.$notify.success({
								title: '成功',
								message: '更新优惠券成功'
							})
							this.getList('keepPage')
						})
						.catch((response) => {
							this.$notify.error({
								title: '失败',
								message: response.errmsg
							})
						})
				}
			})
		},
		handleDelete(row) {
			couponDelete(row)
				.then((response) => {
					this.$notify.success({
						title: '成功',
						message: '删除优惠券成功'
					})
					const index = this.list.indexOf(row)
					this.list.splice(index, 1)
				})
				.catch((response) => {
					this.$notify.error({
						title: '失败',
						message: response.errmsg
					})
				})
		},
		handleDetail(row) {
			this.$router.push({ path: '/marketingManagement/couponDetail', query: { id: row.id } })
		}
		// handleDownload() {
		// 	this.downloadLoading = true
		// 	import('@/vendor/Export2Excel').then((excel) => {
		// 		const tHeader = [
		// 			'优惠券ID',
		// 			'名称',
		// 			'内容',
		// 			'标签',
		// 			'最低消费',
		// 			'减免金额',
		// 			'每人限领',
		// 			'优惠券数量'
		// 		]
		// 		const filterVal = [
		// 			'id',
		// 			'name',
		// 			'desc',
		// 			'tag',
		// 			'min',
		// 			'discount',
		// 			'limit',
		// 			'total'
		// 		]
		// 		excel.export_json_to_excel2(tHeader, this.list, filterVal, '优惠券信息')
		// 		this.downloadLoading = false
		// 	})
		// }
	}
}
</script>

<style>
</style>
