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
				v-permission="[ `GET ${api.tradeLeadsList}` ]" size="mini" class="filter-item" type="primary"
				icon="el-icon-search" @click="getList"
			>
				查找
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
			@refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '供求信息')"
		>
			<el-button
				v-permission="[ `POST ${api.tradeLeadsAdd}` ]" size="mini" type="primary"
				icon="el-icon-plus" @click="handleCreate"
			>
				添加
			</el-button>
		</TableTools>

		<!-- 供求信息列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
			:api-path="api.tradeLeadsList" size-alias="size" :columns="columns"
		>
			<template #status="{ row }">
				<span>{{ row.status === 0 ? '采购' : row.status === 1 ? '供应' : '未知' }}</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `POST ${api.tradeLeadsUpdate}` ]" size="mini"
					@click="handleUpdate(row)"
				>
					编辑
				</el-button>
				<el-button
					v-permission="[ `POST ${api.tradeLeadsDelete}` ]" type="danger" size="mini"
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
				<el-form-item v-if="dialogStatus !== 'create'" label="ID" prop="id">
					{{ dataForm.id }}
					<!-- <el-input v-model="dataForm.id" /> -->
				</el-form-item>

				<el-form-item label="类名" prop="materialsCategory">
					<el-input v-model="dataForm.materialsCategory" />
				</el-form-item>

				<el-form-item label="材质" prop="materialsTexture">
					<el-input v-model="dataForm.materialsTexture" />
				</el-form-item>

				<el-form-item label="地区" prop="materialsRegion">
					<el-input v-model="dataForm.materialsRegion" />
				</el-form-item>

				<el-form-item label="颜色" prop="materialsColor">
					<el-input v-model="dataForm.materialsColor" />
				</el-form-item>

				<el-form-item label="数量" prop="materialsNumber">
					<el-input v-model="dataForm.materialsNumber" />
				</el-form-item>

				<el-form-item label="联系方式" prop="materialsPhone" oninput="value=value.replace(/^0|[^\d]/g,'')">
					<el-input v-model="dataForm.materialsPhone" />
				</el-form-item>

				<el-form-item label="销量" prop="sales" oninput="value=value.replace(/^0|[^\d]/g,'')">
					<el-input v-model="dataForm.sales" />
				</el-form-item>

				<el-form-item label="参考价" prop="referenceMoney" oninput="value=value.replace(/^0|[^\d]/g,'')">
					<el-input v-model="dataForm.referenceMoney" />
				</el-form-item>

				<el-form-item label="状态" prop="status">
					<!-- <el-input v-model="dataForm.status" /> -->
					<el-select v-model="dataForm.status" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
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
import { api, tradeLeadsDelete, tradeLeadsAdd, tradeLeadsUpdate } from '@/api/materialManagement/tradeLeads'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from './table'

export default {
	name: 'TradeLeads',
	components: {
		VxeTable,
		TableTools
	},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'tradeLeads',
				columnsOptions: columns
			},
			listQuery: {
				page: 1,
				size: 20,
				id: undefined,
				materialsCategory: undefined,
				materialsName: undefined,
				sort: 'add_time',
				order: 'desc'
			},
			dataForm: {
				id: undefined,
				materialsCategory: undefined,
				materialsTexture: undefined,
				materialsRegion: undefined,
				materialsColor: undefined,
				materialsNumber: undefined,
				materialsPhone: undefined,
				sales: undefined,
				referenceMoney: undefined,
				status: undefined
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
					{ required: true, message: '类名不能为空', trigger: 'blur' }
				],
				materialsTexture: [
					{ required: true, message: '材质不能为空', trigger: 'blur' }
				],
				materialsRegion: [
					{ required: true, message: '地区不能为空', trigger: 'blur' }
				],
				materialsColor: [
					{ required: true, message: '颜色不能为空', trigger: 'blur' }
				],
				materialsNumber: [
					{ required: true, message: '数量不能为空', trigger: 'blur' }
				],
				materialsPhone: [
					{ required: true, message: '联系方式不能为空', trigger: 'blur' }
				],
				sales: [
					{ required: true, message: '销量不能为空', trigger: 'blur' }
				],
				referenceMoney: [
					{ required: true, message: '参考价不能为空', trigger: 'blur' }
				],
				status: [
					{ required: true, message: '状态不能为空', trigger: 'blur' }
				]
			},
			downloadLoading: false,
			options: [{
				value: '0',
				label: '采购'
			}, {
				value: '1',
				label: '供应'
			}]
		}
	},
	computed: {},
	created() {},
	methods: {
		// 自定义列
		updateFields(columns) {
			this.columns = columns
		},
		getList() {
			this.listQuery = {
				...this.listQuery,
				page: 1
			}
		},
		resetForm() {
			this.dataForm = {
				id: undefined,
				materialsCategory: undefined,
				materialsTexture: undefined,
				materialsRegion: undefined,
				materialsColor: undefined,
				materialsNumber: undefined,
				materialsPhone: undefined,
				sales: undefined,
				referenceMoney: undefined,
				status: undefined
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
					this.dataForm.materialsNumber = parseInt(this.dataForm.materialsNumber)
					tradeLeadsAdd(this.dataForm)
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
			// 更换状态的类型
			this.dataForm.status = this.dataForm.status.toString()
			this.dialogStatus = 'update'
			this.dialogFormVisible = true
			this.$nextTick(() => {
				this.$refs.dataForm.clearValidate()
			})
		},
		updateData() {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					this.dataForm.materialsNumber = parseInt(this.dataForm.materialsNumber)
					tradeLeadsUpdate(this.dataForm)
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
			tradeLeadsDelete(row)
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
</style>
