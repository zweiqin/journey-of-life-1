<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.search" clearable class="filter-item" style="width: 200px;"
        placeholder="请输入业务名称、业务内容、备注等"
        @keyup.enter.native="getList"
      />
      <el-button
        v-permission="[ `GET /admin${api.commissionQueryCommissionList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" style="margin-left:10px;" @click="getList"
      >
        查找
      </el-button>
      <br />
      <el-button
        v-permission="[ `POST /admin${api.commissionInsertSelective}` ]" size="mini" type="primary" icon="el-icon-plus"
        class="filter-item" @click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
      >
        添加
      </el-button>
    </div>
    <!-- 查询结果 -->
    <div v-tableHeight>
      <el-table
        v-loading="listLoading"
        element-loading-text="正在查询中。。。"
        :data="list"
        border
        height="100%"
        :span-method="spanMethod"
      >
        <el-table-column align="center" min-width="100" label="板块" prop="_parentName" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="业务名称" prop="businessName" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="费用" prop="expense" show-overflow-tooltip>
          <span v-if="row._hasParent" slot-scope="{ row }">
            {{ row.expense ? row.expenseType === 1 ? `¥${commafyFn(row.expense)}` : `${row.expense}%` : '--' }}
          </span>
        </el-table-column>

        <el-table-column align="center" label="超级合伙人" min-width="600">
          <el-table-column align="center" label="拓展收入">
            <el-table-column align="center" label="直接" min-width="150" show-overflow-tooltip>
              <span v-if="row._hasParent" slot-scope="{ row }">
                {{ row.directIncome !== 'undefined' && row.directIncome !== null ? row.directIncome : '--' }}
              </span>
            </el-table-column>
            <el-table-column align="center" label="间接" min-width="150" show-overflow-tooltip>
              <span v-if="row._hasParent" slot-scope="{ row }">
                {{ row.indirectIncome !== 'undefined' && row.indirectIncome !== null ? row.indirectIncome : '--' }}
              </span>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="业务收入">
            <el-table-column align="center" label="直接" min-width="150" show-overflow-tooltip>
              <span v-if="row._hasParent" slot-scope="{ row }">
                {{ row.directIncome2 !== 'undefined' && row.directIncome2 !== null ? row.directIncome2 : '--' }}
              </span>
            </el-table-column>
            <el-table-column align="center" label="间接" min-width="150" show-overflow-tooltip>
              <span v-if="row._hasParent" slot-scope="{ row }">
                {{ row.indirectIncome2 !== 'undefined' && row.indirectIncome2 !== null ? row.indirectIncome2 : '--' }}
              </span>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="合伙人" min-width="300">
          <el-table-column align="center" label="拓展" min-width="150" show-overflow-tooltip>
            <span v-if="row._hasParent" slot-scope="{ row }">
              {{ row.directIncome3 !== 'undefined' && row.directIncome3 !== null ? row.directIncome3 : '--' }}
            </span>
          </el-table-column>
          <el-table-column align="center" label="业务" min-width="150" show-overflow-tooltip>
            <span v-if="row._hasParent" slot-scope="{ row }">
              {{ row.indirectIncome3 !== 'undefined' && row.indirectIncome3 !== null ? row.indirectIncome3 : '--' }}
            </span>
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" min-width="200" label="业务内容" prop="businessContent" show-overflow-tooltip />
        <!-- <el-table-column align="center" min-width="200" label="业务内容" prop="remarks" show-overflow-tooltip /> -->

        <el-table-column
          align="center"
          label="操作"
          width="200"
          class-name="small-padding fixed-width"
          fixed="right"
        >
          <template slot-scope="{ row }">
            <el-button v-permission="[ `GET /admin${api.commissionSelectByPrimaryKey}` ]" size="mini" @click="handleDetail(row)">
              查看
            </el-button>
            <el-button
              v-permission="[ `POST /admin${api.commissionUpdateByPrimaryKeySelective}` ]"
              type="warning"
              size="mini"
              @click="handleUpdate(row)"
            >
              编辑
            </el-button>
            <el-button
              v-permission="[ `GET /admin${api.commissionDeleteByPrimaryKey}` ]" type="danger" size="mini"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 设置比例 -->
    <EditModal ref="EditModal" @success="getList" />
    <!-- 查看详情 -->
    <DetailModal ref="DetailModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  commissionQueryCommissionList,
  commissionDeleteByPrimaryKey
} from '@/api/brand/commissionQuery'
import EditModal from './components/EditModal'
import DetailModal from './components/DetailModal'
import { commafyFn } from '@/utils'

export default {
  name: 'CommissionQuery',
  components: {
    EditModal,
    DetailModal
  },
  data() {
    return {
      api,
      list: undefined,
      total: 0,
      listLoading: true,
      listQuery: {
        search: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    commafyFn,
    async getList() {
      this.listLoading = true
      try {
        const res = await commissionQueryCommissionList(this.listQuery)
        const item = res.data.items.map((item) => {
          if (Array.isArray(item.list) && item.list.length) {
            item.list = item.list.map((list) => ({
              ...list,
              _hasParent: true,
              _parentName: item.plateTypeName
            }))
          }
          return item.list
        }).flat()
        this.list = item
        console.log(this.list)
      } finally {
        this.listLoading = false
      }
    },
    handleSearch() {
      // this.listQuery.page = 1
      this.getList()
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      const visibleData = this.list
      const fields = [ '_parentName' ]
      const cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) { // 指定_parentName那一列
        const prevRow = visibleData[rowIndex - 1]
        let nextRow = visibleData[rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        }
        let countRowspan = 1
        while (nextRow && nextRow[column.property] === cellValue) {
          nextRow = visibleData[++countRowspan + rowIndex]
        }
        if (countRowspan > 1) {
          return { rowspan: countRowspan, colspan: 1 }
        }
      }
    },
    handleDetail(row) {
      this.$refs.DetailModal && this.$refs.DetailModal.handleOpen(row)
    },
    handleUpdate(row) {
      this.$refs.EditModal && this.$refs.EditModal.handleOpen(row)
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await commissionDeleteByPrimaryKey({ id })
      this.$elMessage('删除成功!')
      this.handleSearch()
    }
  }
}
</script>
