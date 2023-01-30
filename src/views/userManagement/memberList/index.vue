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
				<el-option label="会员" :value="5" />
				<el-option label="门店" :value="1" />
				<el-option label="合伙人" :value="6" />
				<el-option label="超级合伙人" :value="7" />
			</el-select>
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
				v-permission="[ `GET /admin${api.userList}` ]"
				size="mini"
				type="primary"
				icon="el-icon-search"
				class="filter-item"
				@click="handleSearch"
			>
				查找
			</el-button>
			<br />

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
		</div>

		<!-- 查询结果 -->
		<div class="table-container">
			<el-table
				ref="elTable"
				v-loading="listLoading"
				height="100%"
				element-loading-text="正在查询中。。。"
				:data="list"
				v-bind="$tableCommonOptions"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55" :selectable="checkSelectable" fixed="left" />
				<el-table-column align="center" width="50" label="序号" type="index" :index="tableMixin_indexMethod" fixed="left" />
				<el-table-column align="center" width="100" label="ID" prop="id" fixed="left" />
				<el-table-column align="center" min-width="150" label="用户名" prop="username" show-overflow-tooltip fixed="left" />
				<el-table-column align="center" min-width="100" label="性别" prop="gender">
					<template slot-scope="{ row }">
						{{ row.gender | genderFilter }}
					</template>
				</el-table-column>
				<el-table-column align="center" min-width="150" label="生日" prop="birthday" show-overflow-tooltip />
				<el-table-column align="center" min-width="160" label="平台角色" prop="userLevelDesc" show-overflow-tooltip />
				<el-table-column align="center" min-width="100" label="昵称" prop="nickname" show-overflow-tooltip />
				<el-table-column align="center" min-width="100" label="电话" prop="mobile" show-overflow-tooltip />
				<el-table-column align="center" width="100" label="头像" prop="avatar">
					<template slot-scope="{ row }">
						<el-image v-if="row.avatar" :src="row.avatar" style="width:40px; height:40px" fit="cover" :preview-src-list="[ row.avatar ]" />
					</template>
				</el-table-column>
				<el-table-column align="center" min-width="150" label="区域" prop="regionList" show-overflow-tooltip />
				<el-table-column align="center" min-width="200" label="门店备注" prop="brandRemark" show-overflow-tooltip />
				<el-table-column align="center" min-width="200" label="平台备注" prop="platformRemark" show-overflow-tooltip />
				<el-table-column v-if="isAdminRole" align="center" min-width="150" label="用户在门店中的等级" prop="brandLevelDesc" show-overflow-tooltip />
				<el-table-column v-if="isAdminRole || isShopRole" align="center" min-width="150" label="推荐人" prop="principalName" show-overflow-tooltip>
					<template slot-scope="{ row }">
						{{ row.principalName || '团蜂' }}
					</template>
				</el-table-column>
				<el-table-column align="center" min-width="150" label="绑定合伙人数量" prop="todo1" show-overflow-tooltip>
					<template slot-scope="{ row }">
						<span v-if="row.userLevel === 7">{{ row.todo1 }}</span>
						<span v-else>-</span>
					</template>
				</el-table-column>
				<el-table-column align="center" min-width="150" label="绑定普通会员数量" prop="todo2" show-overflow-tooltip>
					<template slot-scope="{ row }">
						<span v-if="row.userLevel === 7">{{ row.todo2 }}</span>
						<span v-else-if="row.userLevel === 6">{{ row.todo2 }}</span>
						<span v-else>-</span>
					</template>
				</el-table-column>
				<el-table-column align="center" min-width="150" label="创建时间" prop="addTime" />
				<el-table-column align="center" min-width="150" label="更新时间" prop="updateTime" />
				<el-table-column
					label="操作"
					:width="isAdminRole ? 360 : 100"
					fixed="right"
					class-name="small-padding fixed-width"
				>
					<template slot-scope="{ row }">
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
								:disabled="row.userLevel !== 5"
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
								合伙人申请
							</el-button>
							<el-button
								v-permission="[ `POST /admin${api.partnerApplySaveAndSignin}` ]"
								:disabled="row.userLevel !== 6"
								type="warning"
								@click="handlePartnerApply(row, 7)"
							>
								超级合伙人申请
							</el-button>
						</template>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div v-show="!!total" class="statistics-container">
			<div class="card-container">
				<el-card>
					<div slot="header"><span>平台角色统计</span></div>
					<div class="el-table el-table--enable-row-hover el-table--medium">
						<table cellspacing="0" style="width: 100%;">
							<thead>
								<tr>
									<th><div>平台角色</div></th>
									<th><div>数量</div></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><div class="cell">普通会员</div></td>
									<td><div class="cell">{{ '666假数据等接口' || '--' }}</div></td>
								</tr>
								<tr>
									<td><div class="cell">合伙人</div></td>
									<td><div class="cell">{{ 2 || '--' }}</div></td>
								</tr>
								<tr>
									<td><div class="cell">超级合伙人</div></td>
									<td><div class="cell">{{ 3 || '--' }}</div></td>
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
		</div>

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
	orderSVsDeleted
} from '@/api/userManagement/memberList'
import XeUtils from 'xe-utils'
import Pagination from '@/components/Pagination'
import EditModal from './components/EditModal'
import BindUserModal from './components/BindUserModal'
import ShopApplyModal from './components/ShopApplyModal'
import PartnerApplyModal from './components/PartnerApplyModal'
import AssignModal from './components/AssignModal'
import { mapGetters } from 'vuex'

export default {
	name: 'MemberList',
	components: {
		Pagination,
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
	data() {
		return {
			api,
			list: undefined,
			total: 0,
			listLoading: true,
			listQuery: {
				page: 1,
				limit: 20,
				nickname: '',
				mobile: '',
				userLevel: '',
				region_arr: []
			},
			multipleSelection: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		// 勾选
		checkSelectable(row) {
			return this.isAdminRole ? row.userLevel === 5 : true
		},
		handleSelectionChange(val) {
			this.multipleSelection = val
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
				this.list = res.data.items
				this.total = res.data.total
				this.multipleSelection = []
				this.$refs.elTable.clearSelection()
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
		async handleBind({ id, regionCode = '' }, flag) {
			if (!this.multipleSelection.length) {
				return this.$elMessage('请勾选', 'warning')
			}
			const userIds = this.multipleSelection.map((v) => v.id)
			if (flag) {
				this.$refs.BindUserModal && this.$refs.BindUserModal.handleOpen({ userIds, region: regionCode })
			} else {
				await bdUserDeleted({ userIds })
				this.$elMessage('解除绑定成功!')
				this.getList()
			}
		},
		handleShopApply({ id }) {
			this.$refs.ShopApplyModal && this.$refs.ShopApplyModal.handleOpen({ userId: id })
		},
		handlePartnerApply({ id, regionCode }, applicationType) {
			this.$refs.PartnerApplyModal && this.$refs.PartnerApplyModal.handleOpen({
				userId: id,
				applicationType
			}, regionCode)
		},
		async handleAssign({ id }, flag) {
			if (!this.multipleSelection.length) {
				return this.$elMessage('请勾选', 'warning')
			}
			const userIds = this.multipleSelection.map((v) => v.id)
			if (flag) {
				this.$refs.AssignModal && this.$refs.AssignModal.handleOpen({ userIds })
			} else {
				await bdUserDeleted({ userIds })
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
}
.card-container {
	flex: 1;
	width: 0;
	word-break:break-all;
}
</style>
