<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<el-input
				v-model="listQuery.materialsCategory" clearable size="mini" class="filter-item"
				style="width: 200px;"
				placeholder="请输入材料名称"
			/>
			<el-button
				v-permission="[ `GET ${api.pricesViewList}` ]" size="mini" class="filter-item" type="primary"
				icon="el-icon-search" @click="getList"
			>
				查找
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
			@refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '价格指数图表')"
		>
			<el-button
				v-permission="[ `GET ${api.pricesViewList}` ]" size="mini" type="primary"
				icon="el-icon-plus" @click="handleCreate"
			>
				添加
			</el-button>
		</TableTools>

		<!-- 价格指数图表列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
			:api-path="api.pricesViewList" size-alias="size" :columns="columns"
		>
			<template #status="{ row }">
				<span>{{ row.status === 1 ? '涨' : '降' }}</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `POST ${api.pricesViewUpdate}` ]" size="mini"
					@click="handleUpdate(row)"
				>
					编辑
				</el-button>
				<el-button
					v-permission="[ `POST ${api.pricesViewDelete}` ]" type="danger" size="mini"
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
				label-position="left" label-width="150px"
				style="width: 400px; margin-left:50px;"
			>
				<el-form-item v-if="dialogStatus !== 'create'" label="材料ID" prop="id">
					{{ dataForm.id }}
					<!-- <el-input v-model="dataForm.id" /> -->
				</el-form-item>

				<el-form-item label="材料类名" prop="materialsCategory">
					<el-input v-model="dataForm.materialsCategory" />
				</el-form-item>

				<el-form-item label="上次价格" prop="lastMoney">
					<el-input v-model="dataForm.lastMoney" oninput="value=value.replace(/^0|[^\d]/g,'')" />
				</el-form-item>

				<el-form-item label="价格" prop="money" oninput="value=value.replace(/^0|[^\d]/g,'')">
					<el-input v-model="dataForm.money" />
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
import { api, pricesViewDelete, pricesViewAdd, pricesViewUpdate } from '@/api/materialManagement/priceIndices'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
// import { uploadPath } from '@/api/business/storage'
// import { getToken } from '@/utils/auth'
// import { getUserInfo } from '@/api/login'
import { columns } from './table'

export default {
	name: 'PriceIndices',
	components: {
		VxeTable,
		TableTools
	},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'priceIndices',
				columnsOptions: columns
			},
			listQuery: {
				page: 1,
				size: 20,
				id: undefined,
				materialsCategory: undefined,
				sort: 'add_time',
				order: 'desc'
			},
			// uploadPath,
			// list: undefined,
			// total: 0,
			// listLoading: true,
			dataForm: {
				id: undefined,
				materialsCategory: undefined,
				lastMoney: undefined,
				money: undefined
			},
			dialogFormVisible: false,
			dialogStatus: '',
			textMap: {
				update: '编辑',
				create: '创建',
				shareUrl: '店铺推广码'
			},
			rules: {
				materialsCategory: [
					{ required: true, message: '材料类名不能为空', trigger: 'blur' }
				],
				lastMoney: [
					{ required: true, message: '上次价格不能为空', trigger: 'blur' }
				],
				money: [
					{ required: true, message: '价格不能为空', trigger: 'blur' }
				]
			}
		}
	},
	computed: {
		// headers() {
		// 	return {
		// 		'X-Dts-Admin-Token': getToken()
		// 	}
		// }
	},
	created() {
		// this.getRoles()
	},
	methods: {
		// getRoles() {
		// 	getUserInfo(getToken())
		// 		.then((response) => {
		// 			this.getList()
		// 		})
		// 		.catch().then((response) => {
		// 	this.isAdmin = response.data.roles[0] === '超级管理员'
		// 	this.userId = response.data.userId
		// 	if (this.isAdmin) {
		// 		this.getList()
		// 	} else if (this.userId === undefined) {
		// 		this.$notify.error({
		// 			title: '异常',
		// 			message: '没有权限'
		// 		})
		// 		this.listLoading = false
		// 	} else {
		// 		this.listQuery.holdId = this.userId
		// 		this.getList()
		// 	}
		// })
		// },
		// uploadPicUrl(response) {
		// 	this.dataForm.picUrl = response.data.url
		// },
		// uploadLicenseUrl(response) {
		// 	this.dataForm.licenseUrl = response.data.url
		// },
		// uploadIdcardProsUrl(response) {
		// 	this.dataForm.idcardProsUrl = response.data.url
		// },
		// uploadIdcardConsUrl(response) {
		// 	this.dataForm.idcardConsUrl = response.data.url
		// },
		// 自定义列
		updateFields(columns) {
			this.columns = columns
		},
		getList() {
			// this.listLoading = true
			// listGet(this.listQuery)
			// 	.then((response) => {
			// 		this.list = response.data.items
			// 		this.total = response.data.total
			// 		this.listLoading = false
			// 	})
			// 	.catch(() => {
			// 		this.list = []
			// 		this.total = 0
			// 		this.listLoading = false
			// 	})
			this.listQuery = {
				...this.listQuery,
				page: 1
			}
		},
		resetForm() {
			this.dataForm = {
				id: undefined,
				materialsCategory: undefined,
				lastMoney: undefined,
				money: undefined
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
					pricesViewAdd(this.dataForm)
						.then((response) => {
							this.list.unshift(response.data)
							this.dialogFormVisible = false
							this.$notify.success({
								title: '成功',
								message: '创建成功'
							})
							this.getList()
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
				this.$refs.dataForm.clearValidate()
			})
		},
		updateData() {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					pricesViewUpdate(this.dataForm)
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
								message: '更新成功'
							})
							this.getList()
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
			pricesViewDelete(row)
				.then((response) => {
					this.$notify.success({
						title: '成功',
						message: '删除成功'
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
		}
	}
}
</script>

<style scoped>
/* .avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.avatar-uploader .el-upload:hover {
	border-color: #20a0ff;
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 120px;
	height: 120px;
	line-height: 120px;
	text-align: center;
}

.avatar {
	width: 145px;
	height: 145px;
	display: block;
} */
</style>
