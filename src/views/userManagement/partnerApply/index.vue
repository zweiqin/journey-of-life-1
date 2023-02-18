<template>
  <div class="app-container">

    <TableTools
			:custom-columns-config="customColumnsConfig"
			download
      custom-field
			@update-fields="updateFields"
			@refresh="getList"
			@download="toolsMixin_exportMethod($refs.vxeTable, '合伙人申请')"
		>
      <el-input
        v-model="listQuery.userId"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入用户ID"
      />
      <el-select
        v-model="listQuery.status"
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
        v-permission="[`GET /admin${api.partnerApplyList}`]"
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
			:api-path="api.partnerApplyList"
      :columns="columns"
		>
      <template #status="{row}">
        {{ row.status | typeFilter(statusList) }}
      </template>
			<template #operate="{ row }">
        <el-button
          v-permission="[`POST /admin${api.partnerApplyManage}`]"
          :disabled="row.status !== 0"
          size="mini"
          @click="handleUpdate(row.id, 5)"
        >开始审核</el-button>
        <el-button
          v-permission="[`POST /admin${api.partnerApplyManage}`]"
          :disabled="row.status !== 1"
          type="danger"
          size="mini"
          @click="handleReject(row.id, 2)"
        >驳回</el-button>
        <el-button
          v-permission="[`POST /admin${api.partnerApplyManage}`]"
          :disabled="row.status !== 1"
          type="success"
          size="mini"
          @click="handleUpdate(row.id, 7)"
        >通过</el-button>
        <el-button
          v-permission="[`POST /admin${api.partnerApplySignin}`]"
          :disabled="row.status !== 5"
          type="warning"
          size="mini"
          @click="handleUpgrade(row)"
        >手动升级</el-button>
      </template>
		</VxeTable>

  </div>
</template>

<script>
import {
  api,
  partnerApplyManage,
  partnerApplySignin,
} from '@/api/userManagement/partnerApply'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from './table'

export default {
  name: 'PartnerApply',
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
				localKey: 'PartnerApply',
				columnsOptions: columns
			},
      listQuery: {
        page: 1,
        limit: 20,
        userId: '',
        status: '',
      },
      statusList: [
        { label: '用户主动撤销', value: -2 },
        { label: '已驳回', value: -3 },
        { label: '待审核', value: 0 },
        { label: '审核中', value: 1 },
        { label: '已通过,待付款', value: 2 },
        { label: '已付款', value: 4 },
        { label: '未升级', value: 5 },
        { label: '已升级', value: 6 },
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
    async handleUpdate(id, stateEnum) {
      await partnerApplyManage({
        id,
        stateEnum
      })
      this.$elMessage('操作成功!')
      this.getList()
    },
    // 驳回
    async handleReject(id) {
      const comment = await this.$elPrompt('驳回理由')
      await partnerApplyManage({
        id,
        comment,
        stateEnum: 2,
      })
      this.$elMessage('操作成功!')
      this.getList('keepPage')
    },
    // 状态5的时候，手动升级
    async handleUpgrade({ id, userId }) {
      await partnerApplySignin({
        id,
        userId
      })
      this.$elMessage('操作成功!')
      this.getList('keepPage')
    },
  }
};
</script>
