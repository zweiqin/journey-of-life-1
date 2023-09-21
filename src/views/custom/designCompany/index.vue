<!-- eslint-disable no-console -->
<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.brandId" clearable class="filter-item" style="width: 150px;"
        placeholder="请输入商家ID" @keyup.enter.native="pageChange"
      />
      <el-input
        v-model="listQuery.lowerPrice" clearable class="filter-item" style="width: 150px;"
        placeholder="请输入价格下限: 元/平方米" @keyup.enter.native="pageChange"
      />
      <el-input
        v-model="listQuery.upperPrice" clearable class="filter-item" style="width: 150px;"
        placeholder="请输入价格上限: 元/平方米" @keyup.enter.native="pageChange"
      />
      <el-input
        v-model="listQuery.practiceYear" clearable class="filter-item" style="width: 150px;"
        placeholder="请输入从业年限" @keyup.enter.native="pageChange"
      />
      <el-select v-if="selectParams" v-model="listQuery.comType" clearable class="filter-item" placeholder="请选择品牌商类型" @change="pageChange">
        <el-option
          v-for="item in selectParams[5].sysDictItems"
          :key="item.value"
          :label="item.label"
          :value="item.dictItemKey"
        >
        </el-option>
      </el-select>
      <el-select v-if="selectParams" v-model="listQuery.combType" clearable class="filter-item" placeholder="请选择搭配风格" @change="pageChange">
        <el-option
          v-for="item in selectParams[2].sysDictItems"
          :key="item.value"
          :label="item.label"
          :value="item.dictItemKey"
        >
        </el-option>
      </el-select>
      <el-select v-if="selectParams" v-model="listQuery.designType" clearable class="filter-item" placeholder="选择设计风格" @change="pageChange">
        <el-option
          v-for="item in selectParams[3].sysDictItems"
          :key="item.value"
          :label="item.label"
          :value="item.dictItemKey"
        >
        </el-option>
      </el-select>
      <el-select v-if="selectParams" v-model="listQuery.serviceScope" clearable class="filter-item" placeholder="请选择服务范围" @change="pageChange">
        <el-option
          v-for="item in selectParams[4].sysDictItems"
          :key="item.value"
          :label="item.label"
          :value="item.dictItemKey"
        >
        </el-option>
      </el-select>
      <el-button
        size="mini" class="filter-item"
        type="primary" icon="el-icon-search" style="margin-left:10px;" @click="getList"
      >
        查找
      </el-button>
      <el-button
        size="mini" class="filter-item"
        type="primary" icon="el-icon-edit" style="margin-left:10px;" @click="handleCreate()"
      >
        添加
      </el-button>
    </div>
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" :is-request="false"
      :loading="listLoading" :table-data="tableData" :page-total="pageTotal" :columns="columns"
      :grid-options="{ rowConfig: { height: 75 } }" @page-change="pageChange()"
    >
      <template #name="{ row }">
        {{ row.brandVo.name }}
      </template>
      <template #picUrl="{ row }">
        <img style="width: 50px;height:50px;" :src="row.brandVo.picUrl" alt="" srcset="">
      </template>
      <!-- selectParams[5].sysDictItems  类型筛选对应的数据 -->
      <template #comType="{ row }">
        <el-tag type="">{{ screenTagValue(selectParams[5].sysDictItems, row.comType, "其他商家类型") }}</el-tag>
      </template>
      <template #designType="{ row }">
        <el-tag type="">{{ screenTagValue(selectParams[3].sysDictItems, row.designType, "其他设计风格") }}</el-tag>
      </template>
      <template #combType="{ row }">
        <el-tag type="">{{ screenTagValue(selectParams[2].sysDictItems, row.combType, "其他搭配风格") }}</el-tag>
      </template>
      <template #serviceScope="{ row }">
        <el-tag type="">{{ screenTagValue(selectParams[4].sysDictItems, row.serviceScope, "其他服务范围") }}</el-tag>
      </template>
      <template #function="{ row }">
        <el-button type="warning" size="mini" @click="handleDetail(row)">
          详情
        </el-button>
        <el-button v-permission="[ `POST /admin` ]" size="mini" @click="handleEdit(row)">
          编辑
        </el-button>
        <el-button
          v-permission="[ `POST /admin/` ]" type="danger" size="mini"
          @click="handleDelete(row)"
        >
          删除
        </el-button>
      </template>
    </Vxetable>
    <DetailModal ref="DetailModal" />
    <!-- <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" :is-request="false"
      :loading="listLoading" :table-data="tableData" :page-total="pageTotal" :columns="columns"
      :grid-options="{ height: heightTable - 50 + 'px' }" @pageChange="pageChange"
      ></VxeTable> -->
  </div>
</template>

<script>
import {
  getDescignType,
  getDescignCompanyList,
  deleteDescignCompanyItem
} from '@/api/custom/designCompany'
import DetailModal from './components/DetailModal'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from './table'
export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'DesignCase',
  components: {
    VxeTable,
    TableTools,
    DetailModal
  },
  data() {
    return {
      listLoading: false,
      columns,
      selectParams: null,
      customColumnsConfig: {
        localKey: 'designCase',
        columnsOptions: columns
      },
      pageTotal: 0,
      listQuery: {
        page: 1,
        size: 10,
        brandId: '',  // 商户ID
        comType: '',  // 商户类型
        combType: '',  // 搭配风格
        designType: '',  // 设计风格
        lowerPrice: '',  // 价格下限
        practiceYear: '',  // 从业年限
        serviceScope: '', // 服务范围
        upperPrice: ''  // 价格下限
      },
      tableData: []
    }
  },
  created() {
    getDescignType({ page: 1, size: 10 }).then((res) => {
      // console.log(res)
      this.selectParams = res.data.records
    })
    this.getdesignCompanyList()
    console.log(this.columns)
    // getDescignCompanyList(this.listQuery).then((res) => {
    //   console.log(res)
    // })
  },
  methods: {
    // 筛选目标的tag类型
    screenTagValue(arr = [], value, errText) {
      if (arr.filter((item) => item.dictItemKey == value).length > 0) {
        return arr.filter((item) => item.dictItemKey == value)[0].label
      }
      return errText
    },
    // 自定义列
    updateFields(columns) {
      this.columns = columns
    },
    getList(meaning) {
      meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
    },
    pageChange(params) {
      this.listQuery = {
        ...this.listQuery,
        ...params
      }
      this.getdesignCompanyList()
    },
    getdesignCompanyList() {
      this.listLoading = true
      getDescignCompanyList(this.listQuery).then((res) => {
        // console.log(res)
        this.tableData = res.data.records
        this.pageTotal = res.data.total
        console.log(this.tableData)
        this.listLoading = false
      })
        .catch((err) => {
          console.log(err)
        })
    },
    handleCreate() {
      console.log('create')
    },
    handleEdit() {
      console.log('edit')
    },
    handleDetail(row) {
      this.$refs.DetailModal && this.$refs.DetailModal.handleOpen(row)
    },
    async handleDelete(row) {
      await this.$elConfirm('确认删除?')
      await deleteDescignCompanyItem({ id: row.id })
      this.$elMessage('删除成功!')
      this.pageChange()
    }
  }
}
</script>

<style lang="scss" scope>

</style>
