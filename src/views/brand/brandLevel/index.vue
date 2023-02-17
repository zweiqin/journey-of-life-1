<template>
  <div class="app-container">
    <TableTools
			:custom-columns-config="customColumnsConfig"
			download
      custom-field
			@update-fields="updateFields"
			@refresh="getList"
			@download="toolsMixin_exportMethod($refs.vxeTable, '等级列表')"
		>
			<el-button
        v-permission="[`POST /admin${api.brandLevelCreate}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >添加</el-button>
		</TableTools>

		<VxeTable
		  ref="vxeTable"
      v-model="listQuery"
      :local-key="customColumnsConfig.localKey"
      api-method="GET"
			:api-path="api.brandLevelList"
      :columns="columns"
		>
			<template #operate="{ row }">
        <el-button
          v-permission="[`POST /admin${api.brandLevelUpdate}`]"
          size="mini"
          @click="handleUpdate(row)"
        >编辑</el-button>
        <el-button
          v-permission="[`POST /admin${api.brandLevelDelete}`]"
          type="danger"
          size="mini"
          @click="handleDelete(row)"
        >删除</el-button>
      </template>
		</VxeTable>
    <!-- 新增编辑 -->
    <EditModal ref="EditModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  brandLevelDelete
} from '@/api/brand/brandLevel'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import { columns } from './table'

export default {
  name: 'BrandLevel',
  components: {
    VxeTable,
		TableTools,
    EditModal,
  },
  data() {
    return {
      api,
      columns,
			customColumnsConfig: {
				localKey: 'BrandLevel',
				columnsOptions: columns
			},
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
      },
    };
  },
  methods: {
    // 自定义列
		updateFields(columns) {
			this.columns = columns
		},
    getList(meaning) {
			this.listQuery = { ...this.listQuery, ...(meaning === 'keepPage' ? {} : { page : 1 }) }
		},
    async handleUpdate({ id, levelTier, name, discount, description, moneyCriterion, countCriterion, goodIdCriterion }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, levelTier, name, discount, description, moneyCriterion, countCriterion, goodIdCriterion })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await brandLevelDelete({ id })
      this.$elMessage('删除成功!')
      this.getList('keepPage')
    }
  }
};
</script>
