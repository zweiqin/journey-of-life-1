<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入风格名称"
      />
      <el-button
        v-permission="[`GET /admin${api.brandStyleList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="getList"
      >查找</el-button>
    </div>

    <TableTools
			:custom-columns-config="customColumnsConfig"
			download
      custom-field
			@update-fields="updateFields"
			@refresh="getList"
			@download="toolsMixin_exportMethod($refs.vxeTable, '门店风格')"
		>
		  <el-button
        v-permission="[`POST /admin${api.brandStyleCreate}`]"
        size="mini"
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
			:api-path="api.brandStyleList"
      :columns="columns"
		>
      <template #picUrl="{row}">
        <el-image v-if="row.picUrl" :src="row.picUrl" style="width:40px; height:40px" fit="cover" :preview-src-list="[row.picUrl]" />
      </template>
			<template #operate="{ row }">
        <el-button
          v-permission="[`POST /admin${api.brandStyleUpdate}`]"
          size="mini"
          @click="handleUpdate(row)"
        >编辑</el-button>
        <el-button
          v-permission="[`POST /admin${api.brandStyleDelete}`]"
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
  brandStyleDelete
} from '@/api/brand/brandStyle'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import { columns } from './table'

export default {
  name: 'BrandStyle',
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
				localKey: 'BrandStyle',
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
    async handleUpdate({ id, value, sortOrder }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, value, sortOrder })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await brandStyleDelete({ id })
      this.$elMessage('删除成功!')
      this.getList('keepPage')
    }
  }
};
</script>
