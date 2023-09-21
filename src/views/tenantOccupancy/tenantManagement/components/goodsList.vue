<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<!-- eslint-disable vue/require-explicit-emits -->
<!-- eslint-disable vue/match-component-file-name -->
<template>
  <el-dialog
    :visible.sync="visible"
  >
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" :is-request="false"
      :loading="listLoading" :table-data="tableData" :page-total="pageTotal" :columns="columns"
      :grid-options="gridOptions" @pageChange="pageChange" @select-change="handleSelectionChange"
    >
      <template #picUrl="{ row }">
        <el-image
          v-if="row.picUrl" :src="row.picUrl" style="width:40px; height:40px" fit="cover"
          :preview-src-list="[ row.picUrl ]"
        />
        <span v-else>--</span>
      </template>
    </Vxetable>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="visible = false">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getGoodsList
} from '@/api/tenantOccupancy/tenantManagement'
import { columns } from './TableStructure/goodsStucture'
import VxeTable from '@/components/VxeTable'
export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'GoodsList',
  components: {
    VxeTable
  },
  data() {
    return {
      listLoading: true,
      tableData: null,
      gridOptions: {
        rowConfig: { height: 75 },
        checkboxConfig: {
          checkMethod: this.checCheckboxkMethod
        }
      },
      customColumnsConfig: {
        localKey: 'designCase',
        columnsOptions: columns
      },
      multipleSelection: null,
      columns,
      listQuery: {
        page: 1,
        size: 10
      },
      pageTotal: 0,
      visible: false,
      listDataL: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    pageChange(params) {
      this.listQuery.size = params.limit
      this.listQuery = {
        ...this.listQuery,
        ...params
      }
      this.getList()
    },
    getList() {
      getGoodsList(this.listQuery).then((res) => {
        this.tableData = res.data.records
        const { page, size } = this.listQuery
        this.tableData = res.data.records.map((item, index) => ({
          ...item,
          $index: (page - 1) * size + (index + 1)
        }))
        this.pageTotal = res.data.total
        this.listLoading = false
      })
    },
    checCheckboxkMethod({ row }) {
      return true
    },
    handleSelectionChange({ $table }) {
      const records = $table.getCheckboxRecords()
      console.log(records)
      this.multipleSelection = records
    },
    handleSubmit() {
      // eslint-disable-next-line vue/custom-event-name-casing, vue/require-explicit-emits
      this.$emit('getGoods', this.multipleSelection)
      this.visible = false
    }
  }
}
</script>

<style lang="scss">

</style>
