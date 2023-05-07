<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <el-select
        v-model="listQuery.brandId" clearable size="mini" class="filter-item"
        style="width: 200px;"
        placeholder="选择门店"
        >
        <el-option v-for="item in brandList" :key="item.id" :label="(item.name || '') + '-' + (item.keeperName || '')" :value="item.id" />
        </el-select> -->
      <el-input
        v-model="listQuery.goodsSn" clearable size="mini" class="filter-item"
        style="width: 200px;" placeholder="请输入商品编号"
        @keyup.enter.native="getList"
      />
      <el-input
        v-model="listQuery.name" clearable size="mini" class="filter-item"
        style="width: 200px;" placeholder="请输入商品名称"
        @keyup.enter.native="getList"
      />
      <el-select
        v-model="listQuery.styleId" clearable size="mini" class="filter-item"
        style="width: 200px;"
        placeholder="选择商品风格"
      >
        <el-option v-for="item in goodsStyleList" :key="item.id" :label="item.value" :value="item.id" />
      </el-select>
      <el-cascader
        v-model="listQuery.category_arr" placeholder="请选择商品类型" :options="categoryList"
        :props="{ checkStrictly: true, expandTrigger: 'hover' }" clearable size="mini" class="filter-item"
        style="width: 200px;"
      />
      <el-button
        v-permission="[ `GET /admin${api.goodsList}` ]" size="mini" class="filter-item" type="primary"
        icon="el-icon-search" @click="getList"
      >
        查找
      </el-button>
      <!-- <el-button
        v-permission="[ `GET /admin${api.goodsList}` ]" :loading="downloadLoading" size="mini"
        class="filter-item" type="warning" icon="el-icon-download" @click="handleDownload"
        >
        导出
        </el-button> -->
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
      @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '门店商品')"
    >
      <el-button
        v-permission="[ `POST /admin${api.goodsCreate}` ]" size="mini" type="primary"
        icon="el-icon-plus" @click="handleCreate"
      >
        添加
      </el-button>
    </TableTools>

    <!-- 查询结果 -->
    <VxeTable
      ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
      :api-path="api.goodsList" :columns="columns"
    >
      <template #picUrl="{ row }">
        <el-image
          v-if="row.picUrl" :src="row.picUrl" style="width:40px; height:40px" fit="cover"
          :preview-src-list="[ row.picUrl ]"
        />
        <span v-else>--</span>
      </template>
      <template #gallery="{ row }">
        <div v-if="row.gallery && row.gallery.length">
          <el-image
            :src="row.gallery[0]" style="width:40px; height:40px" fit="cover"
            :preview-src-list="row.gallery"
          />
          <span v-if="row.gallery.length > 1" style="margin-left:8px;">+{{ row.gallery.length }}</span>
        </div>
        <span v-else>--</span>
      </template>
      <template #isOnSale="{ row }">
        <el-tag v-if="row.isOnSale" type="success" effect="plain">是</el-tag>
        <el-tag v-else type="danger" effect="plain">否</el-tag>
      </template>
      <template #supportVoucher="{ row }">
        <el-tag v-if="row.supportVoucher" type="success" effect="plain">是</el-tag>
        <el-tag v-else type="danger" effect="plain">否</el-tag>
      </template>
      <template #saleType="{ row }">
        {{ row.saleType | saleTypeFilter }}
      </template>
      <template #productTag="{ row }">
        <el-tag v-if="row.productTag == 0" effect="plain">常规</el-tag>
        <el-tag v-else-if="row.productTag == 1" effect="plain" type="danger">热卖</el-tag>
        <el-tag v-else-if="row.productTag == 2" effect="plain" type="warning">爆款</el-tag>
        <el-tag v-else-if="row.productTag == 3" effect="plain" type="success">新品</el-tag>
        <el-tag v-else-if="row.productTag == 4" effect="plain" type="info">原创</el-tag>
        <span v-else>{{ row.productTag }}</span>
      </template>
      <template #deliveryDay="{ row }">
        <span v-if="row.deliveryDay == 0">现货</span>
        <span v-else>{{ row.deliveryDay }}天内发出</span>
      </template>
      <template #operate="{ row }">
        <el-button type="warning" size="mini" @click="handleDetail(row)">
          详情
        </el-button>
        <el-button v-permission="[ `POST /admin${api.goodsUpdate}` ]" size="mini" @click="handleEdit(row)">
          编辑
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.goodsUpOnSale}` ]" :disabled="!row.isOnSale" type="info"
          size="mini" @click="handleUpdate(row)"
        >
          下架
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.goodsUpOnSale}` ]" :disabled="row.isOnSale" type="primary"
          size="mini" @click="handleUpdate(row)"
        >
          上架
        </el-button>
        <el-button
          v-permission="[ `POST /admin${api.goodsDelete}` ]" type="danger" size="mini"
          @click="handleDelete(row)"
        >
          删除
        </el-button>
      </template>
    </VxeTable>

    <!-- 查看详情 -->
    <DetailModal ref="DetailModal" />

  </div>
</template>

<script>
import {
  api,
  goodsDelete,
  goodsUpOnSale
} from '@/api/goods/goodsList'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
// import { brandList } from '@/api/brand/brandList'
import { goodsStyleList } from '@/api/goods/goodsStyle'
import { categoryTreeList } from '@/api/goods/goodsCategory'
import DetailModal from './components/DetailModal'
import { columns } from './table'

export default {
  name: 'BrandGoods',
  components: {
    VxeTable,
    TableTools,
    DetailModal
  },
  filters: {
    saleTypeFilter(val) {
      return {
        0: '在售',
        1: '预售',
        2: '售罄'
      }[val] || '--'
    }
    // brokerageTypeFilter(val) {
    //   return {
    //     0: '无推广佣金',
    //     1: '自定义佣金',
    //     2: '代理审批比例'
    //   }[val] || '--'
    // }
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'brandGoods',
        columnsOptions: columns
      },
      listQuery: {
        brandId: '',
        page: 1,
        limit: 20,
        goodsSn: '',
        name: '',
        styleId: '',
        category_arr: [],
        sort: 'add_time',
        order: 'desc'
      },
      // brandList: [], // 门店列表
      goodsStyleList: [], // 商品风格
      categoryList: [], // 商品类目-树结构
      downloadLoading: false
    }
  },
  created() {
    // this.getBrandList()
    this.getCategoryTreeList()
    this.getGoodsStyleList()
  },
  activated() {
    const { brandId = '' } = this.$route.query
    if (brandId) {
      this.listQuery.brandId = brandId
    }
    this.getList('keepPage')
  },
  methods: {
    // 自定义列
    updateFields(columns) {
      this.columns = columns
    },
    getList(meaning) {
      const { category_arr, ...other } = this.listQuery
      const cateId = Array.isArray(category_arr) && category_arr.length ? category_arr[category_arr.length - 1] : ''
      meaning === 'keepPage' ? this.listQuery = { ...other, cateId } : this.listQuery = { ...other, cateId, page: 1 }
    },
    // 商品风格
    async getGoodsStyleList() {
      const res = await goodsStyleList({
        page: 1,
        limit: 9999
      })
      this.goodsStyleList = res.data.items
    },
    // // 门店列表
    // async getBrandList() {
    //   const res = await brandList({
    //     page: 1,
    //     limit: 9999
    //   })
    //   this.brandList = res.data.items
    // },
    // 商品类目
    async getCategoryTreeList() {
      const res = await categoryTreeList()
      this.categoryList = res.data.items
    },
    handleCreate() {
      this.$router.push({ name: 'GoodsCreate', query: { brandId: this.listQuery.brandId } })
    },
    handleEdit(row) {
      this.$router.push({ name: 'GoodsEdit', query: { id: row.id, brandId: this.listQuery.brandId } })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await goodsDelete({ id })
      this.$elMessage('删除成功!')
      this.getList()
    },
    async handleUpdate({ id, isOnSale }) {
      await this.$elConfirm(`确认${isOnSale ? '下架' : '上架'}?`)
      const loading = this.$elLoading()
      await goodsUpOnSale({
        idList: [ id ],
        isOnSale: !isOnSale
      })
      loading.close()
      this.$elMessage()
      this.getList('keepPage')
    },
    typeFilterFn(val, list) {
      const obj = list.find((item) => +item.value === +val)
      return obj ? obj.label : '--'
    },
    // handleDownload() {
    //   if (!this.list.length) return
    //   this.downloadLoading = true
    //   import('@/vendor/Export2Excel').then((excel) => {
    //     const tableKeys = {
    //       goodsSn: '商品编号',
    //       categoryName: '品类名称',
    //       name: '商品名称',
    //       goodsType: '商品类型',
    //       brief: '商品简介',
    //       keywords: '搜索关键字',
    //       unit: '商品单位',
    //       counterPrice: '零售价格',
    //       vipPrice: '会员价格',
    //       retailPrice: '优惠价格',
    //       isOnSale: '上架状态',
    //       supportVoucher: '支持代金券',
    //       saleType: '在售状态',
    //       productTag: '产品标签',
    //       deliveryDay: '在售状态',
    //       styleName: '商品风格',
    //       tagName: '大类标签',
    //       placeName: '产地名称',
    //       browse: '浏览量',
    //       sales: '已销售总量',
    //       sortOrder: '排序',
    //       addTime: '创建时间',
    //       updateTime: '更新时间'
    //     }
    //     const tHeader = Object.keys(tableKeys).map((key) => tableKeys[key])
    //     const filterVal = Object.keys(tableKeys).map((key) => key)
    //     excel.export_json_to_excel2(tHeader, this.list, filterVal, '商品信息')
    //     this.downloadLoading = false
    //   })
    // },
    handleDetail(row) {
      this.$refs.DetailModal && this.$refs.DetailModal.handleOpen(row)
    }
  }
}
</script>
