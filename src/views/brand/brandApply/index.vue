<template>
  <div class="app-container">

    <TableTools
      :custom-columns-config="customColumnsConfig"
      download
      custom-field
      @update-fields="updateFields"
      @refresh="getList"
      @download="toolsMixin_exportMethod($refs.vxeTable, '门店申请')"
    >
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
        v-permission="[ `GET /admin${api.userupList}` ]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="getList"
      >
        查找
      </el-button>
    </TableTools>

    <VxeTable
      ref="vxeTable"
      v-model="listQuery"
      :local-key="customColumnsConfig.localKey"
      api-method="GET"
      :api-path="api.userupList"
      :columns="columns"
    >
      <template #status="{ row }">
        {{ row.status | typeFilter(statusList) }}
      </template>
      <template #operate="{ row }">
        <el-button
          v-permission="[ `POST /admin${api.userupManage}` ]"
          :disabled="row.status !== 0"
          size="mini"
          @click="handleUpdate(row.id, 5)"
        >
          开始审核
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.userupSetCharge}` ]"
          size="mini"
          type="primary"
          @click="handleSetCharge(row)"
        >
          负责人设置
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.userupManage}` ]"
          :disabled="row.status != 1"
          type="warning"
          size="mini"
          @click="handleExamine(row)"
        >
          门店审核
        </el-button>
      </template>
    </VxeTable>

    <!-- 查询结果 -->
    <!-- <div v-tableHeight>
    	<el-table
    	v-loading="listLoading"
    	height="100%"
    	element-loading-text="正在查询中。。。"
    	:data="list"
    	v-bind="$tableCommonOptions"
    	>
    	<el-table-column align="center" width="50" label="序号" type="index" :index="tableMixin_indexMethod" fixed="left" />
    	<el-table-column align="center" width="100" label="ID" prop="id" fixed="left" />
    	<el-table-column align="center" min-width="150" label="会员名称" prop="username" show-overflow-tooltip />
    	<el-table-column align="center" min-width="150" label="门店名称" prop="brandname" show-overflow-tooltip />
    	<el-table-column align="center" min-width="150" label="联系电话" prop="brandPhone" show-overflow-tooltip />
    	<el-table-column align="center" min-width="100" label="申请会员ID" prop="userId" show-overflow-tooltip />
    	<el-table-column align="center" min-width="100" label="审核人账户" prop="operatorname" show-overflow-tooltip />
    	<el-table-column align="center" min-width="100" label="审核状态" prop="status">
    	<template slot-scope="{ row }">
    	{{ row.status | typeFilter(statusList) }}
    	</template>
    	</el-table-column>
    	<el-table-column align="center" min-width="200" label="驳回理由" prop="comment" show-overflow-tooltip />
    	<el-table-column align="center" min-width="150" label="标签名" prop="labelName" show-overflow-tooltip />
    	<el-table-column align="center" min-width="150" label="会员昵称" prop="nickname" show-overflow-tooltip />
    	<el-table-column align="center" min-width="150" label="区域" prop="regionName" show-overflow-tooltip />
    	<el-table-column align="center" min-width="150" label="创建时间" prop="createtime" />
    	<el-table-column align="center" min-width="150" label="更新时间" prop="updatetime" />
    	<el-table-column
    	align="center"
    	label="操作"
    	width="280"
    	fixed="right"
    	class-name="small-padding fixed-width"
    	>
    	<template slot-scope="{ row }">
    	<el-button
    	v-permission="[ `POST /admin${api.userupManage}` ]"
    	:disabled="row.status !== 0"
    	size="mini"
    	@click="handleUpdate(row.id, 5)"
    	>
    	开始审核
    	</el-button>
    	<el-button
    	v-permission="[ `POST /admin${api.userupSetCharge}` ]"
    	size="mini"
    	type="primary"
    	@click="handleSetCharge(row)"
    	>
    	负责人设置
    	</el-button>
    	<el-button
    	v-permission="[ `POST /admin${api.userupManage}` ]"
    	:disabled="row.status != 1"
    	type="warning"
    	size="mini"
    	@click="handleExamine(row)"
    	>
    	门店审核
    	</el-button>
    	</template>
    	</el-table-column>
    	</el-table>
    	</div> -->

    <!-- 审核 -->
    <ExamineModal ref="ExamineModal" @success="getList" />
    <!-- 负责人设置 -->
    <ChargeModal ref="ChargeModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  userupList,
  userupManage,
  userupSignin
} from '@/api/brand/brandApply'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import ExamineModal from './components/ExamineModal'
import ChargeModal from './components/ChargeModal'
import { columns } from './table'

export default {
  name: 'BrandApply',
  components: {
    VxeTable,
    TableTools,
    ExamineModal,
    ChargeModal
  },
  filters: {
    typeFilter(val, list = []) {
      const obj = list.find((item) => item.value === +val)
      return obj ? obj.label : '--'
    }
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'BrandApply',
        columnsOptions: columns
      },
      listQuery: {
        page: 1,
        limit: 20,
        name: ''
      },
      statusList: [
        { label: '用户主动撤销', value: -2 },
        { label: '已驳回', value: -3 },
        { label: '待审核', value: 0 },
        { label: '审核中', value: 1 },
        { label: '未创建账户', value: 5 },
        { label: '已创建账户', value: 6 }
      ]
    }
  },
  methods: {
    // 自定义列
    updateFields(columns) {
      this.columns = columns
    },
    getList(meaning) {
      meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
    },
    async handleUpdate(id, stateEnum) {
      await userupManage({
        id,
        stateEnum
      })
      this.$elMessage('操作成功!')
      this.getList('keepPage')
    },
    handleSetCharge({ id }) {
      this.$refs.ChargeModal && this.$refs.ChargeModal.handleOpen({ id })
    },
    handleExamine(item) {
      this.$refs.ExamineModal && this.$refs.ExamineModal.handleOpen(item)
    }
  }
}
</script>
