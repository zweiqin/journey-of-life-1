<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<!-- <el-input
				v-model="listQuery.name"
				clearable
				class="filter-item"
				style="width: 200px;"
				placeholder="输入类目名称"
				/>
				<el-button
				v-permission="[ `GET /admin${api.categoryList}` ]"
				size="mini"
				class="filter-item"
				type="primary"
				icon="el-icon-search"
				@click="handleSearch"
				>
				查找
				</el-button>
				<br /> -->
			<el-button
				v-permission="[ `POST /admin${api.categoryCreate}` ]"
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
				ref="multipleTable"
				v-loading="listLoading"
				height="100%"
				element-loading-text="正在查询中。。。"
				:data="list"
				v-bind="$tableCommonOptions"
				row-key="id"
				border
				lazy
				:load="load"
				:default-expand-all="false"
				:tree-props="{ children: 'children', hasChildren: 'id' }"
			>
				<el-table-column align="left" width="140" label="序号" prop="id" fixed="left" />
				<el-table-column align="center" width="150" label="类目名" prop="name" show-overflow-tooltip />
				<el-table-column align="center" width="100" label="类目图标" prop="iconUrl">
					<template slot-scope="{ row }">
						<el-image v-if="row.iconUrl" :src="row.iconUrl" style="width:40px; height:40px" fit="cover" :preview-src-list="[ row.iconUrl ]" />
					</template>
				</el-table-column>
				<el-table-column align="center" width="100" label="类目图片" prop="picUrl">
					<template slot-scope="{ row }">
						<el-image v-if="row.picUrl" :src="row.picUrl" style="width:40px; height:40px" fit="cover" :preview-src-list="[ row.picUrl ]" />
					</template>
				</el-table-column>
				<el-table-column align="center" min-width="150" label="搜索关键字" prop="keywords" show-overflow-tooltip />
				<el-table-column align="center" min-width="150" label="简介" prop="desc" show-overflow-tooltip />
				<el-table-column align="center" width="100" label="级别" prop="level">
					<template slot-scope="{ row }">
						<el-tag v-if="row.level === 'L1'" type="primary" effect="plain">一级类目</el-tag>
						<el-tag v-else-if="row.level === 'L2'" type="success" effect="plain">二级类目</el-tag>
						<el-tag v-else-if="row.level === 'L3'" type="info" effect="plain">三级类目</el-tag>
						<el-tag v-else type="info">{{ row.level }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column align="center" width="100" label="父类目ID" prop="pid" />
				<el-table-column align="center" width="150" label="创建时间" prop="addTime" />
				<el-table-column align="center" width="150" label="更新时间" prop="updateTime" />
				<el-table-column
					align="center"
					label="操作"
					width="120"
					fixed="right"
					class-name="small-padding fixed-width"
				>
					<template slot-scope="{ row }">
						<el-button
							v-permission="[ `POST /admin${api.categoryUpdate}` ]"
							size="mini"
							@click="handleUpdate(row)"
						>
							编辑
						</el-button>
						<el-button
							v-permission="[ `POST /admin${api.categoryDelete}` ]"
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

		<!-- 新增编辑 -->
		<EditModal ref="EditModal" @success="reStore()" />
	</div>
</template>

<script>
import {
	api,
	categoryL1,
	categoryL2,
	categoryList,
	categoryAllList,
	categoryDelete,
	categoryTreeList,
	categoryReadTree
} from '@/api/goods/goodsCategory'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import EditModal from './components/EditModal'
import { goodsCatAndBrand } from '@/api/goods/goodsList'

export default {
	name: 'Category',
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
				level: 'L1',
				parentId: ''
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
				const res = await categoryAllList(this.listQuery)
				console.log(res)
				this.list = res.data.data
				this.total = res.data.total
			} finally {
				this.listLoading = false
			}
		},
		reStore() {
			this.list = []
			this.total = 0
			this.$nextTick(() => {
				this.getList()
			})
		},
		async load(tree, treeNode, resolve) {
			// console.log(tree, treeNode)
			try {
				const tempLevel = 'L' + (Number(tree.level.substring(1)) + 1)
				const res = await categoryAllList({ level: tempLevel, parentId: tree.id })
				console.log(res)
				resolve(res.data.data)
				if (res.data.total === 0) this.$message.warning(`没有更多数据了！`)
			} finally {
				this.listLoading = false
			}
		},
		// handleSearch() {
		// 	this.listQuery.page = 1
		// 	this.getList()
		// },
		handleUpdate(row) {
			console.log(row)
			this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id: row.id })
		},
		async handleDelete({ id }) {
			await this.$elConfirm('确认删除?')
			await categoryDelete({ id })
			this.$elMessage('删除成功！')
			this.list = []
			this.total = 0
			this.$nextTick(() => {
				this.getList()
			})
		}
	}
}
</script>
