<template>
  <div class="app-container">
    <TableTools
			:custom-columns-config="customColumnsConfig"
			download
      custom-field
			@update-fields="updateFields"
			@refresh="getList"
			@download="toolsMixin_exportMethod($refs.vxeTable, '佣金报表')"
		>
      <el-select
        v-model="listQuery.type"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="选择状态"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-permission="[`GET /admin${api.commissionRecordList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="getList"
      >查找</el-button>
		</TableTools>

		<VxeTable
		  ref="vxeTable"
      v-model="listQuery"
      :local-key="customColumnsConfig.localKey"
      api-method="GET"
			:api-path="api.commissionRecordList"
      :columns="columns"
		>
      <template #type="{row}">
        {{ row.type | typeFilter(statusList) }}
      </template>
		</VxeTable>

  </div>
</template>

<script>
import {
  api,
} from '@/api/brand/commission'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from './table'

export default {
  name: 'CommissionRecordList',
  components: {
    VxeTable,
		TableTools,
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
				localKey: 'CommissionRecordList',
				columnsOptions: columns
			},
      listQuery: {
        page: 1,
        limit: 20,
        // userId: '',
        // produceUserId: '',
        type: '',
      },
      statusList: [
        { label: '升级产生', value: 1 },
        { label: '商品购买产生', value: 2 },
        { label: '佣金提现', value: 3 },
      ]
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
  }
};
</script>
