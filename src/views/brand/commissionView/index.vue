<template>
  <div class="app-container">
    <!-- 查询结果 -->
    <div v-tableHeight>
      <el-table
        v-loading="listLoading"
        element-loading-text="正在查询中。。。"
        :data="list"
        border
        :span-method="spanMethod"
      >
        <el-table-column align="center" min-width="100" label="板块" prop="_parentName" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="业务名称" prop="name" show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="费用" prop="cost" show-overflow-tooltip>
          <span v-if="row._hasParent" slot-scope="{row}">
            {{ row.cost | costFilter(row.costType) }}
          </span>
        </el-table-column>

         <el-table-column align="center" label="超级合伙人" min-width="600">
            <el-table-column align="center" label="拓展收入">
              <el-table-column align="center" label="直接" min-width="150" show-overflow-tooltip>
                <span v-if="row._hasParent" slot-scope="{row}">
                  {{ row.commissionRatios | commissionRatiosFilter(7, 'directExpandRatio') }}
                </span>
              </el-table-column>
              <el-table-column align="center" label="间接" min-width="150" show-overflow-tooltip>
                <span v-if="row._hasParent" slot-scope="{row}">
                  {{ row.commissionRatios | commissionRatiosFilter(7, 'indirectExpandRatio') }}
                </span>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="业务收入">
              <el-table-column align="center" label="直接" min-width="150" show-overflow-tooltip>
                <span v-if="row._hasParent" slot-scope="{row}">
                  {{ row.commissionRatios | commissionRatiosFilter(7, 'directBusinessRatio') }}
                </span>
              </el-table-column>
              <el-table-column align="center" label="间接" min-width="150" show-overflow-tooltip>
                <span v-if="row._hasParent" slot-scope="{row}">
                  {{ row.commissionRatios | commissionRatiosFilter(7, 'indirectBusinessRatio') }}
                </span>
              </el-table-column>
            </el-table-column>
         </el-table-column>
         <el-table-column align="center" label="合伙人" min-width="300">
          <el-table-column align="center" label="拓展" min-width="150" show-overflow-tooltip>
            <span v-if="row._hasParent" slot-scope="{row}">
              {{ row.commissionRatios | commissionRatiosFilter(6, 'directExpandRatio') }}
            </span>
          </el-table-column>
          <el-table-column align="center" label="业务" min-width="150" show-overflow-tooltip>
            <span v-if="row._hasParent" slot-scope="{row}">
              {{ row.commissionRatios | commissionRatiosFilter(6, 'directBusinessRatio') }}
            </span>
          </el-table-column>
         </el-table-column>

        <el-table-column align="center" min-width="200" label="业务内容" prop="content" show-overflow-tooltip />
      
        <el-table-column
          align="center"
          label="操作"
          width="120"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.level == 2"
              v-permission="[`POST /admin${api.comModuleSaveRatio}`]"
              type="warning"
              size="mini"
              @click="handleRatio(row)"
            >设置比例</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 设置比例 -->
    <RatioModal ref="RatioModal" @success="getList" />
  </div>
</template>

<script>
import {
  api,
  comModuleModuleList,
} from '@/api/brand/commissionSetting'
import RatioModal from './components/RatioModal'
import { commafyFn } from '@/utils'

export default {
  name: 'CommissionSetting',
  components: {
    RatioModal,
  },
  filters: {
    costFilter(val, costType) {
      return costType === 1 ? `¥${commafyFn(val)}` : `${val}%`
    },
    commissionRatiosFilter(list, level, key) {
      // level 6合伙人 7超级合伙人
      const obj = list.find(item => item.levelId === level)
      if (obj && typeof obj[key] !== 'undefined' && obj[key] !== null) {
        const number = `${obj[key] || 0}%`
        return number
      }
      return '--'
    }
  },
  data() {
    return {
      api,
      list: undefined,
      total: 0,
      listLoading: true,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      try {
        const res = await comModuleModuleList()
        const item = res.data.items.map(item => {
          if (Array.isArray(item.child) && item.child.length) {
            item.child = item.child.map(child => ({
              ...child,
              _hasParent: true,
              _parentName: item.name,
              _parentId: item.id,
              _parentLevel: item.level,
            }))
          }
          return item.child
        }).flat(true)
        this.list = item
      } finally {
        this.listLoading = false;
      }
    },
    handleSearch() {
      this.listQuery.page = 1;
      this.getList();
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      const visibleData = this.list
      const fields = ['_parentName']
      const cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[rowIndex - 1]
        let nextRow = visibleData[rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    },
    async handleRatio({ id }) {
      this.$refs.RatioModal && this.$refs.RatioModal.handleOpen({
        moduleId: id,
        // directExpandRatio,
        // directBusinessRatio,
        // indirectBusinessRatio,
        // indirectExpandRatio
      })
    }
  }
};
</script>
