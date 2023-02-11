<template>
	<div class="app-container">
		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<el-input
				v-model="listQuery.userId" clearable size="mini" class="filter-item"
				style="width: 200px;"
				placeholder="请输入持有用户编号ID"
			/>
			<el-button
				v-permission="[ `GET ${api.holdList}` ]" size="mini" class="filter-item" type="primary"
				icon="el-icon-search" @click="getList"
			>
				查找
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
			@refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '持有管理')"
		>
		</TableTools>

		<!-- 信息哨兵列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
			:api-path="api.holdList" size-alias="size" :columns="columns"
		>
		</VxeTable>

	</div>
</template>

<script>
import { api } from '@/api/voucherManagement/possess'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from './table'

export default {
	name: 'VoucherManagementPossess',
	components: {
		VxeTable,
		TableTools
	},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'voucherManagementPossess',
				columnsOptions: columns
			},
			listQuery: {
				page: 1,
				size: 20,
				userId: undefined
			}
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
		}
	}
}
</script>

<style scoped>

</style>
