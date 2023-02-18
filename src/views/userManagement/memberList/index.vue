<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<el-input
				v-model="listQuery.nickname"
				clearable
				class="filter-item"
				style="width: 200px;"
				placeholder="请输入昵称"
			/>
			<el-input
				v-model="listQuery.mobile"
				clearable
				class="filter-item"
				style="width: 200px;"
				placeholder="请输入电话"
			/>
			<el-select
				v-model="listQuery.userLevel"
				clearable
				class="filter-item"
				style="width: 200px;"
				placeholder="选择层级"
			>
				<el-option label="普通会员" :value="5" />
				<el-option label="合伙人" :value="6" />
				<el-option label="超级合伙人" :value="7" />
				<el-option label="超级合伙人（门店）" :value="1" />
			</el-select>
			<el-cascader
				v-model="listQuery.region_arr"
				placeholder="选择区域"
				:options="common_regionList"
				:props="{ checkStrictly: true, label: 'name', value: 'code', expandTrigger: 'hover' }"
				clearable
				size="mini"
				class="filter-item"
				style="width: 200px;"
			/>
			<el-button
				v-permission="[ `GET /admin${api.userList}` ]"
				size="mini"
				type="primary"
				icon="el-icon-search"
				class="filter-item"
				@click="handleSearch"
			>
				查找
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig"
			download
			custom-field
			@update-fields="updateFields"
			@refresh="getList"
			@download="toolsMixin_exportMethod($refs.vxeTable, '会员管理')"
		>
			<!-- 超管专属 -->
			<template v-if="isAdminRole">
				<el-button
					v-permission="[ `POST /admin${api.bdUserAdd}` ]"
					:disabled="bdUserAddBtnDisabled"
					icon="el-icon-lock"
					type="success"
					size="mini"
					@click="handleBind(true)"
				>
					添加绑定
				</el-button>
				<el-button
					v-permission="[ `POST /admin${api.bdUserDeleted}` ]"
					:disabled="bdUserDeletedBtnDisabled"
					icon="el-icon-unlock"
					type="danger"
					size="mini"
					@click="handleBind(false)"
				>
					解除绑定
				</el-button>
			</template>

			<!-- 门店专属 -->
			<template v-if="isShopRole">
				<el-button
					v-permission="[ `POST /admin${api.orderSVsAdd}` ]"
					:disabled="orderSVsAddBtnDisabled"
					icon="el-icon-lock"
					type="success"
					size="mini"
					@click="handleAssign(true)"
				>
					指派业务员
				</el-button>
				<el-button
					v-permission="[ `POST /admin${api.orderSVsDeleted}` ]"
					:disabled="orderSVsDeletedBtnDisabled"
					icon="el-icon-unlock"
					type="danger"
					size="mini"
					@click="handleAssign(false)"
				>
					解除业务员
				</el-button>
			</template>
		</TableTools>

		<VxeTable
			ref="vxeTable"
			v-model="listQuery"
			:localKey="customColumnsConfig.localKey"
			:isRequest="false"
			:loading="listLoading"
			:tableData="tableData"
			:pageTotal="pageTotal"
			:columns="columns"
			:gridOptions="gridOptions"
			@pageChange="pageChange"
			@select-change="handleSelectionChange"
		>
			<template #gender="{ row }">
				{{ row.gender | genderFilter }}
			</template>
			<template #avatar="{ row }">
				<el-image v-if="row.avatar" :src="row.avatar" style="width:40px; height:40px" fit="cover" :preview-src-list="[ row.avatar ]" />
			</template>
			<template #brandLevelDesc="{ row }">
				<span v-if="isAdminRole">{{ row.brandLevelDesc || '--' }}</span>
				<span v-else>--</span>
			</template>
			<template #principalName="{ row }">
				<span v-if="isAdminRole || isShopRole">{{ row.principalName || '团蜂' }}</span>
				<span v-else>--</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `POST /admin${api.userUpdate}` ]"
					size="mini"
					@click="handleEdit(row)"
				>
					编辑
				</el-button>
				<!-- 超管专属 -->
				<template v-if="isAdminRole">
					<el-button
						v-permission="[ `POST /admin${api.userupSaveAndSignin}` ]"
						:disabled="row.userLevel !== 7"
						type="primary"
						size="mini"
						@click="handleShopApply(row)"
					>
						门店申请
					</el-button>
					<el-button
						v-permission="[ `POST /admin${api.partnerApplySaveAndSignin}` ]"
						:disabled="row.userLevel !== 5"
						type="warning"
						@click="handlePartnerApply(row, 6)"
					>
						会员升级
					</el-button>
					<el-button
						v-permission="[ `POST /admin${api.partnerApplySaveAndSignin}` ]"
						:disabled="row.userLevel !== 6"
						type="warning"
						@click="handlePartnerApply(row, 7)"
					>
						合伙人升级
					</el-button>
				</template>
			</template>
		</VxeTable>

		<!-- <div v-show="!!total" class="statistics-container">
			<div class="card-container">
				<el-card>
					<div slot="header"><span>平台角色统计</span></div>
					<div class="card-table" style="overflow: auto;">
						<table cellspacing="0" style="width: 100%;">
							<thead>
								<tr>
									<th><div>平台角色</div></th>
									<th><div>数量</div></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in RoleCountList" :key="item.userLevel">
									<td><div class="cell">{{ item.userLevelDesc }}</div></td>
									<td><div class="cell">{{ item.count }}</div></td>
								</tr>
							</tbody>
						</table>
					</div>
				</el-card>
			</div>
			<Pagination
				:total="total"
				:page.sync="listQuery.page"
				:limit.sync="listQuery.limit"
				@pagination="getList"
			/>
		</div> -->

		<!-- 新增编辑 -->
		<EditModal ref="EditModal" @success="getList" />
		<!-- 绑定用户 -->
		<BindUserModal ref="BindUserModal" @success="getList" />
		<!-- 门店申请 -->
		<ShopApplyModal ref="ShopApplyModal" @success="getList" />
		<!-- 合伙人申请 -->
		<PartnerApplyModal ref="PartnerApplyModal" @success="getList" />
		<!-- 指派业务员 -->
		<AssignModal ref="AssignModal" @success="getList" />
	</div>
</template>

<script>
import {
	api,
	userList,
	bdUserDeleted,
	orderSVsDeleted,
	getRoleCount
} from '@/api/userManagement/memberList'
import EditModal from './components/EditModal'
import BindUserModal from './components/BindUserModal'
import ShopApplyModal from './components/ShopApplyModal'
import PartnerApplyModal from './components/PartnerApplyModal'
import AssignModal from './components/AssignModal'
import { mapGetters } from 'vuex'
import { columns } from './table'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'

export default {
	name: 'MemberList',
	components: {
		VxeTable,
		TableTools,
		EditModal,
		BindUserModal,
		ShopApplyModal,
		PartnerApplyModal,
		AssignModal
	},
	filters: {
		genderFilter(val) {
			return {
				0: '未知',
				1: '男',
				2: '女'
			}[val] || '--'
		}
	},
	data() {
		return {
			customColumnsConfig: {
				localKey: 'MemberList',
				columnsOptions: columns
			},
			api,
			columns,
			gridOptions: {
				checkboxConfig: {
					checkMethod: this.checCheckboxkMethod
				}
			},
			tableData: [],
			pageTotal: 0,
			listLoading: true,
			listQuery: {
				page: 1,
				limit: 20,
				nickname: '',
				mobile: '',
				userLevel: '',
				region_arr: []
			},
			multipleSelection: [],
			RoleCountList: []
		}
	},
	computed: {
		...mapGetters([
			'roles',
			'common_regionList'
		]),
		isAdminRole() {
			return this.roles.includes('超级管理员')
		},
		isShopRole() {
			return this.roles.includes('门店')
		},
		bdUserAddBtnDisabled() {
			return !(this.multipleSelection.length && this.multipleSelection.every((v) => !v.principalId))
		},
		bdUserDeletedBtnDisabled() {
			return !(this.multipleSelection.length && this.multipleSelection.every((v) => v.principalId))
		},
		orderSVsAddBtnDisabled() {
			return !(this.multipleSelection.length && this.multipleSelection.every((v) => !v.principalId))
		},
		orderSVsDeletedBtnDisabled() {
			return !(this.multipleSelection.length && this.multipleSelection.every((v) => v.principalId))
		}
	},
	created() {
		this.getList()
		this.getRoleCount()
	},
	methods: {
		// 勾选
		checCheckboxkMethod({ row }) {
			return this.isAdminRole ? row.userLevel === 5 || row.userLevel === 6 || row.userLevel === 7 || row.userLevel === 1 : true
		},
		handleSelectionChange({ $table }) {
			const records = $table.getCheckboxRecords()
			this.multipleSelection = records
		},
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
			this.listLoading = true
			try {
				const { region_arr, ...other } = this.listQuery
				const region = Array.isArray(region_arr) && region_arr.length ? region_arr[region_arr.length - 1] : ''
				const params = {
					...other,
					region
				}
				const res = await userList(params)
				const { page, limit } = this.listQuery
				this.tableData = res.data.items.map((item, index) => ({
					...item,
					$index: (page - 1) * limit + (index + 1)
				}))
				this.pageTotal = res.data.total
				this.multipleSelection = []
			} finally {
				this.listLoading = false
			}
		},
		async getRoleCount() {
			this.listLoading = true
			try {
				const res = await getRoleCount()
				this.RoleCountList = res.data.map((item) => {
					switch (item.userLevel) {
						case 5:
							item.order = 1
							break
						case 6:
							item.order = 2
							break
						case 7:
							item.order = 3
							break
						case 1:
							item.order = 4
							break
						default:
							break
					}
					return item
				}).sort((a, b) => a.order - b.order)
			} finally {
				this.listLoading = false
			}
		},
		handleSearch() {
			this.listQuery.page = 1
			this.getList()
		},
		async handleEdit({ id, birthday, regionCode, brandRemark, platformRemark }) {
			this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, birthday, regionCode, brandRemark, platformRemark })
		},
		async handleBind(flag) {
			if (!this.multipleSelection.length) {
				return this.$elMessage('请勾选', 'warning')
			}
			const userIds = this.multipleSelection.map((v) => v.id)
			if (flag) {
				this.$refs.BindUserModal && this.$refs.BindUserModal.handleOpen({ userIds })
			} else {
				await bdUserDeleted({ userIds })
				this.$elMessage('解除绑定成功!')
				this.getList()
			}
		},
		handleShopApply({ id }) {
			this.$refs.ShopApplyModal && this.$refs.ShopApplyModal.handleOpen({ userId: id })
		},
		handlePartnerApply({ id, regionCode, principalId, principalName }, applicationType) {
			this.$refs.PartnerApplyModal && this.$refs.PartnerApplyModal.handleOpen({
				userId: id,
				applicationType,
				principalId,
				principalName
			}, regionCode)
		},
		async handleAssign(flag) {
			if (!this.multipleSelection.length) {
				return this.$elMessage('请勾选', 'warning')
			}
			const userIds = this.multipleSelection.map((v) => v.id)
			if (flag) {
				this.$refs.AssignModal && this.$refs.AssignModal.handleOpen({ userIds })
			} else {
				await orderSVsDeleted({ userIds })
				this.$elMessage('取消指派成功!')
				this.getList()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.cell {
	text-align: center;
	white-space: nowrap;
}
.app-container {
	height: 100%;
}
.table-container {
	flex: 1;
	height: 0;
}
.statistics-container {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	max-height: 175px;
	white-space: nowrap;
}
.card-container {
	flex: 1;
	width: 0;
	word-break:break-all;
}
.card-table {
	box-sizing: border-box;
	width: 100%;
  max-width: 100%;
	background-color: #FFFFFF;
  font-size: 14px;
  color: #606266;
}
</style>
