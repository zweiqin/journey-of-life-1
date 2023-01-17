<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<el-input
				v-model="listQuery.value"
				clearable
				class="filter-item"
				style="width: 200px;"
				placeholder="请输入标签值"
			/>
			<el-button
				v-permission="[ `GET /admin${api.goodsStyleList}` ]"
				size="mini"
				class="filter-item"
				type="primary"
				icon="el-icon-search"
				style="margin-left:10px;"
				@click="handleSearch"
			>
				查找
			</el-button>
			<br />
			<el-button
				v-permission="[ `POST /admin${api.goodsTagCreate}` ]"
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
        <el-table-column align="center" width="50" label="序号" type="index" :index="tableMixin_indexMethod" fixed="left" />
				<el-table-column align="center" width="100" label="ID" prop="id" fixed="left" />
				<el-table-column align="center" min-width="150" label="标签值" prop="value" show-overflow-tooltip />
				<el-table-column align="center" min-width="100" label="排序" prop="sortOrder" />
				<el-table-column align="center" min-width="150" label="创建时间" prop="addTime" />
				<el-table-column align="center" min-width="150" label="更新时间" prop="updateTime" />
				<el-table-column
					label="操作"
					width="150"
					fixed="right"
					class-name="small-padding fixed-width"
				>
					<template slot-scope="{ row }">
						<el-button
							v-permission="[ `POST /admin${api.goodsStyleUpdate}` ]"
							size="mini"
							@click="handleUpdate(row)"
						>
							编辑
						</el-button>
						<el-button
							v-permission="[ `POST /admin${api.goodsStyleDelete}` ]"
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
			:limit.sync="listQuery.limit"
			@pagination="getList"
		/>

		<!-- 新增编辑 -->
		<EditModal ref="EditModal" @success="getList" />
	</div>
</template>

<script>
import {
	api,
	goodsStyleList,
	goodsStyleDelete
} from '@/api/goods/goodsStyle'
import Pagination from '@/components/Pagination'
import EditModal from './components/EditModal'

export default {
	name: 'GoodsStyle',
	components: {
		Pagination,
		EditModal
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
				value: ''
			}
		}
	},
	created() {
		this.getList()
	},
	methods: {
		async getList() {
			this.listLoading = true
			try {
				const res = await goodsStyleList(this.listQuery)
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
		async handleUpdate({ id, value, sortOrder }) {
			this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, value, sortOrder })
		},
		async handleDelete({ id }) {
			await this.$elConfirm('确认删除?')
			await goodsStyleDelete({ id })
			this.$elMessage('删除成功!')
			this.handleSearch()
		}
	}
}
</script>
