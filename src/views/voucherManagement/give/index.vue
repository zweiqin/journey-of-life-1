<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<el-input
				v-show="isAdminRole" v-model="listQuery.holdId" clearable size="mini"
				class="filter-item"
				style="width: 200px;" placeholder="请输入赠与方ID"
			/>
			<el-input
				v-model="listQuery.userId" clearable size="mini" class="filter-item"
				style="width: 200px;"
				placeholder="请输入被赠与方ID"
			/>
			<el-input
				v-model="listQuery.voucherId" clearable size="mini" class="filter-item"
				style="width: 200px;"
				placeholder="请输入代金券ID"
			/>
			<el-button
				v-permission="[ `GET ${api.circulaList}` ]" size="mini" class="filter-item" type="primary"
				icon="el-icon-search" @click="getList"
			>

				查找
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
			@refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '转赠记录')"
		>
			<el-button
				v-permission="[ `GET ${api.circulaList}` ]" size="mini" type="primary"
				icon="el-icon-plus" @click="handleTransfer"
			>
				添加
			</el-button>
		</TableTools>

		<!-- 转赠记录列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
			:api-path="api.circulaList" :columns="columns"
		></VxeTable>

	</div>
</template>

<script>
import { api } from '@/api/voucherManagement/give'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from './table'
import { mapGetters } from 'vuex'

export default {
	name: 'VoucherManagementGive',
	components: {
		VxeTable,
		TableTools
	},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'voucherManagementGive',
				columnsOptions: columns
			},
			listLoading: true,
			list: [],
			total: 0,
			listQuery: {
				page: 1,
				limit: 20,
				holdId: undefined,
				userId: undefined,
				voucherId: undefined
			}
		}
	},
	computed: {
		...mapGetters([
			'roles',
			'userId'
		]),
		isAdminRole() {
			return this.roles.includes('超级管理员')
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
		handleTransfer() {
			this.$router.push({ name: 'voucherManagementGiveCreate', query: { isAdmin: this.isAdminRole, userId: this.userId } })
		}
	}
}
</script>

<style scoped>

</style>
