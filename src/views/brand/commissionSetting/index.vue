<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-select
        v-model="listQuery.level"
        class="filter-item"
        style="width: 200px;"
        placeholder="选择类型"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-permission="[`GET /admin${api.comModuleList}`]"
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
			@download="toolsMixin_exportMethod($refs.vxeTable, '佣金板块 ')"
		>
      <el-button
        v-permission="[`POST /admin${api.comModuleAdd}`]"
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
			:api-path="api.comModuleList"
      :columns="columns"
		>
      <template #level="{row}">
        {{ row.level | typeFilter(statusList) }}
      </template>
      <template #costType="{row}">
        {{ row.costType | typeFilter(costTypeList) }}
      </template>
      <template #operate="{row}">
        <el-button
          v-permission="[`POST /admin${api.comModuleUpdate}`]"
          size="mini"
          @click="handleUpdate(row)"
        >编辑</el-button>
        <el-button
          v-permission="[`POST /admin${api.comModuleDeleted}`]"
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
  comModuleDeleted
} from '@/api/brand/commissionSetting'
import EditModal from './components/EditModal'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from './table'

export default {
  name: 'CommissionSetting',
  components: {
    VxeTable,
		TableTools,
    EditModal,
  },
  filters: {
    typeFilter(val, list = []) {
      const obj = list.find(item => item.value === +val)
      return obj ? obj.label : '--'
    }
  },
  data() {
    return {
      api,
      columns,
			customColumnsConfig: {
				localKey: 'CommissionSetting',
				columnsOptions: columns
			},
      listQuery: {
        page: 1,
        limit: 20,
        level: 1,
      },
      statusList: [
        { label: '板块', value: 1 },
        { label: '业务', value: 2 },
      ],
      costTypeList: [
        { label: '金额', value: 1 },
        { label: '比例', value: 2 },
      ],
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
    async handleUpdate({ id, level, pid, name, cost, content, remark, costType }) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, level, pid, name, cost, content, remark, costType })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await comModuleDeleted({ id })
      this.$elMessage('删除成功!')
      this.getList()
    },
  }
};
</script>
