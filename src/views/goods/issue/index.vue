<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<el-input
				v-model="listQuery.question"
				clearable
				class="filter-item"
				style="width: 200px;"
				placeholder="输入问题内容"
			/>
			<el-select
				v-model="listQuery.type"
				clearable
				class="filter-item"
				style="width: 200px;"
				placeholder="选择问题范围"
			>
				<el-option
					v-for="item in issueGetTypeEnumList"
					:key="item.code"
					:label="item.value"
					:value="item.code"
				/>
			</el-select>
			<el-select
				v-model="listQuery.brandId"
				clearable
				class="filter-item"
				style="width: 200px;"
				placeholder="选择门店"
			>
				<el-option
					v-for="item in brandList"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				/>
			</el-select>
			<el-button
				v-permission="[ `GET /admin${api.issueList}` ]"
				size="mini"
				class="filter-item"
				type="primary"
				icon="el-icon-search"
				@click="handleSearch"
			>
				查找
			</el-button>
			<br />
			<el-button
				v-permission="[ `POST /admin${api.issueCreate}` ]"
				size="mini"
				type="primary"
				icon="el-icon-plus"
				@click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
			>
				添加
			</el-button>
		</div>

		<!-- 查询结果 -->
		<div v-tableHeight>
			<el-table
				v-loading="listLoading"
				height="100%"
				element-loading-text="正在查询中。。。"
				:data="list"
				v-bind="$tableCommonOptions"
			>

				<el-table-column align="center" width="100" label="序号" prop="id" fixed="left" />
				<el-table-column align="center" width="150" label="问题范围" prop="type" show-overflow-tooltip>
					<template slot-scope="{ row }">
						{{ row.type | typeFilter(issueGetTypeEnumList) }}
					</template>
				</el-table-column>
				<el-table-column align="center" min-width="150" label="问题内容" prop="question" show-overflow-tooltip />
				<el-table-column align="center" min-width="300" label="问题回复" prop="answer" show-overflow-tooltip />

				<el-table-column align="center" width="100" label="状态" prop="isEnable">
					<template slot-scope="{ row }">
						<el-tag v-if="row.isEnable" type="success" effect="plain">是</el-tag>
						<el-tag v-else type="danger" effect="plain">否</el-tag>
					</template>
				</el-table-column>

				<el-table-column align="center" width="150" label="创建时间" prop="addTime" />
				<el-table-column align="center" width="150" label="更新时间" prop="updateTime" />
				<el-table-column
					align="center"
					label="操作"
					width="200"
					fixed="right"
					class-name="small-padding fixed-width"
				>
					<template slot-scope="{ row }">
						<el-button
							v-permission="[ `POST /admin${api.issueUpdate}` ]"
							size="mini"
							@click="handleEdit(row)"
						>
							编辑
						</el-button>
						<el-button
							v-if="row.isEnable"
							v-permission="[ `GET /admin${api.issueChangeEnable}` ]"
							type="info"
							size="mini"
							@click="handleUpdate(row)"
						>
							下架
						</el-button>
						<el-button
							v-else
							v-permission="[ `GET /admin${api.issueChangeEnable}` ]"
							type="warning"
							size="mini"
							@click="handleUpdate(row)"
						>
							上架
						</el-button>
						<el-button
							v-permission="[ `POST /admin${api.issueDelete}` ]"
							type="danger"
							size="mini"
							@click="handleDelete(row)"
						>
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<Pagination
			:total="total"
			:page.sync="listQuery.page"
			:limit.sync="listQuery.size"
			@pagination="getList"
		/>

		<!-- 新增编辑 -->
		<EditModal ref="EditModal" :list="issueGetTypeEnumList" @success="getList" />
	</div>
</template>

<script>
import {
	api,
	issueGetTypeEnum,
	issueList,
	issueDelete,
	issueChangeEnable
} from '@/api/goods/issue'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import EditModal from './components/EditModal'
import { goodsCatAndBrand } from '@/api/goods/goodsList'

export default {
	name: 'Issue',
	components: {
		Pagination,
		EditModal
	},
	filters: {
		typeFilter(val, list = []) {
			const obj = list.find((item) => +item.code === +val)
			return obj ? obj.value : '--'
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
				question: '',
				type: '',
				brandId: ''
			},
			brandList: [],
			issueGetTypeEnumList: []
		}
	},
	created() {
		this.getBrandList()
		this.getIssueGetTypeEnumList()
		this.getList()
	},
	methods: {
		async getIssueGetTypeEnumList() {
			const res = await issueGetTypeEnum()
			this.issueGetTypeEnumList = res.data
		},
		async getBrandList() {
			const res = await goodsCatAndBrand()
			// console.log(res)
			this.brandList = res.data.brandList
		},
		async getList() {
			this.listLoading = true
			try {
				const res = await issueList(this.listQuery)
				this.list = res.data.items
				this.total = res.data.total
			} finally {
				this.listLoading = false
			}
		},
		handleSearch() {
			this.listQuery.page = 1
			this.getList()
		},
		async handleEdit({ id, type, question, answer }) {
			this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, type, question, answer })
		},
		async handleUpdate({ id, isEnable }) {
			await issueChangeEnable({
				id,
				isEnable: !isEnable
			})
			this.$elMessage()
			this.getList()
		},
		async handleDelete({ id }) {
			await this.$elConfirm('确认删除?')
			await issueDelete({ id })
			this.$elMessage('删除成功!')
			this.handleSearch()
		}
	}
}
</script>
