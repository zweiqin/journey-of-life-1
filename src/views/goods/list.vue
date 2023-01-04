<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.goodsSn"
        clearable
        size="mini"
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入商品编号"
      />
      <el-input
        v-model="listQuery.name"
        clearable
        size="mini"
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入商品名称"
      />
      <el-select
        v-model="listQuery.goodType"
        size="mini"
        class="filter-item"
        clearable
        placeholder="请选择商品类型"
      >
        <el-option
          v-for="item in goodTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-permission="[`GET /admin${api.goodsList}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查找</el-button>
      <el-button
        v-permission="[`POST /admin${api.goodsCreate}`]"
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
      <el-button
        v-permission="[`GET /admin${api.goodsList}`]"
        :loading="downloadLoading"
        size="mini"
        class="filter-item"
        type="warning"
        icon="el-icon-download"
        @click="handleDownload"
      >导出</el-button>
    </div>

    <!-- 查询结果 -->
    <div v-tableHeight>
      <el-table
        v-loading="listLoading"
        element-loading-text="正在查询中。。。"
        :data="list"
        v-bind="$tableCommonOptions"
      >
        <el-table-column align="center" width="100" label="商品编号" prop="goodsSn" fixed="left" />
        <el-table-column align="center" width="150" label="品类名称" prop="categoryName" fixed="left" show-overflow-tooltip />
        <el-table-column align="center" min-width="200" label="商品名称" prop="name" fixed="left" show-overflow-tooltip />
        <el-table-column align="center" width="80" label="商品类型" prop="goodsType" >
          <template slot-scope="{row}">
            {{ typeFilterFn(row.goodsType, goodTypeList) }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="80" prop="picUrl" label="商品图片" >
          <template slot-scope="{row}">
            <img :src="row.picUrl" width="40" />
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="宣传图片" prop="gallery">
          <template slot-scope="{row}">
            <img
              v-for="(item, index) in row.gallery"
              :key="index"
              :src="item"
              width="40"
              style="margin:4px;"
            >
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="150" label="商品简介" prop="brief" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="关键字" prop="keywords" show-overflow-tooltip />
        <el-table-column align="center" min-width="100" label="商品单位" prop="unit" />
        <el-table-column align="center" width="100" label="零售价格" prop="counterPrice" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="会员价格" prop="vipPrice" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="优惠价格" prop="retailPrice" show-overflow-tooltip />
        <el-table-column align="center" width="80" prop="isOnSale" label="上架状态" >
          <template slot-scope="{row}">
            <el-tag v-if="row.isOnSale" type="success" effect="plain">是</el-tag>
            <el-tag v-else type="danger" effect="plain">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="支持代金券" prop="supportVoucher">
          <template slot-scope="{row}">
            <el-tag v-if="row.supportVoucher" type="success" effect="plain">是</el-tag>
            <el-tag v-else type="danger" effect="plain">否</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="在售状态" prop="saleType">
          <template slot-scope="{row}">
            {{ row.saleType | saleTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品标签" prop="productTag">
          <template slot-scope="{row}">
            <el-tag v-if="row.productTag==0" effect="plain">常规</el-tag>
            <el-tag v-else-if="row.productTag==1" effect="plain" type="danger">热卖</el-tag>
            <el-tag v-else-if="row.productTag==2" effect="plain" type="warning">爆款</el-tag>
            <el-tag v-else-if="row.productTag==3" effect="plain" type="success">新品</el-tag>
            <el-tag v-else-if="row.productTag==4" effect="plain" type="info">原创</el-tag>
            <span v-else>{{ row.productTag }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="在售状态" prop="deliveryDay" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span v-if="row.deliveryDay==0">现货</span>
            <span v-else>{{row.deliveryDay}}天内发出</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="商品风格" prop="styleName" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="大类标签" prop="tagName" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="产地名称" prop="placeName" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="浏览量" prop="browse" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="已销售总量" prop="sales" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="排序" prop="sortOrder" show-overflow-tooltip />
        <el-table-column align="center" width="150" label="创建时间" prop="addTime" show-overflow-tooltip />
        <el-table-column align="center" width="150" label="更新时间" prop="updateTime" show-overflow-tooltip />

        <el-table-column align="center" label="审批状态" prop="approveStatus">
          <template slot-scope="{row}">
            <el-tag v-if="row.approveStatus==0" effect="plain">待审批</el-tag>
            <el-tag v-else-if="row.approveStatus==1" effect="plain" type="success">审批通过</el-tag>
            <el-tag v-else-if="row.approveStatus==2" effect="plain" type="danger">审批拒绝</el-tag>
            <el-tag v-else-if="row.approveStatus==4" effect="plain" type="info">未提交</el-tag>
            <span v-else>{{ row.approveStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="150" label="佣金类型" prop="brokerageType">
          <template slot-scope="{row}">
            <span>{{ row.brokerageType | brokerageTypeFilter }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="操作"
          width="200"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              v-permission="[`POST /admin${api.goodsUpdate}`]"
              type="primary"
              size="mini"
              @click="handleEdit(row)"
            >编辑</el-button>
            <el-button
              v-if="row.isOnSale"
              v-permission="[`POST /admin${api.goodsUpOnSale}`]"
              type="info"
              size="mini"
              @click="handleUpdate(row)"
            >下架</el-button>
            <el-button
              v-else
              v-permission="[`POST /admin${api.goodsUpOnSale}`]"
              type="warning"
              size="mini"
              @click="handleUpdate(row)"
            >上架</el-button>
            <el-button
              v-permission="[`POST /admin${api.goodsDelete}`]"
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

  </div>
</template>

<script>
import {
  api,
  goodsList,
  goodsDelete,
  goodsUpOnSale
} from '@/api/business/goods'
import { getUserInfo } from '@/api/login'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'GoodsList',
  components: {
    Pagination
  },
  filters: {
    saleTypeFilter(val) {
      return {
        0: '在售',
        1: '预售',
        2: '售罄'
      }[val] || '--'
    },
    brokerageTypeFilter(val) {
      return {
        0: '无推广佣金',
        1: '自定义佣金',
        2: '代理审批比例',
      }[val] || '--'
    },
  },
  data () {
    return {
      api,
      goodTypeList: [
        {
          value: 1,
          label: '家具'
        }, {
          value: 2,
          label: '材料'
        }
      ],
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        goodsSn: undefined,
        name: undefined,
        goodType: undefined,
        cateId: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      downloadLoading: false
    }
  },
  created () {
    this.getRoles()
    // this.getList()
  },
  methods: {
    getRoles () {
      getUserInfo(getToken())
        .then(response => {
          if (response.data.roles[0] === '超级管理员') {
            this.$router.push({ name: 'brandGoodsList' })
          } else if (response.data.roles[0] === '门店' || response.data.roles[0] === '营销策划') {
            this.getList()
          }
        })
        .catch()
    },
    getList () {
      this.listLoading = true
      goodsList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate () {
      this.$router.push({ name: 'GoodsCreate' })
    },
    handleEdit (row) {
      this.$router.push({ name: 'GoodsEdit', query: { id: row.id } })
    },
    async handleDelete({ id }) {
      await this.$elConfirm('确认删除?')
      await goodsDelete({ id })
      this.$elMessage('删除成功!')
      this.handleFilter()
    },
    async handleUpdate({ id, isOnSale }) {
      const loading =  this.$elLoading()
      await goodsUpOnSale({
        idList: [id],
        isOnSale: !isOnSale
      })
      loading.close()
      this.$elMessage()
      this.getList()
    },
    typeFilterFn(val, list) {
      const obj = list.find(item => +item.value === +val)
      return obj ? obj.label : '--'
    },
    handleDownload () {
      if (!this.list.length) return
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tableKeys = {
          goodsSn: '商品编号',
          categoryName: '品类名称',
          name: '商品名称',
          goodsType: '商品类型',
          brief: '商品简介',
          keywords: '关键字',
          unit: '商品单位',
          counterPrice: '零售价格',
          vipPrice: '会员价格',
          retailPrice: '优惠价格',
          isOnSale: '上架状态',
          supportVoucher: '支持代金券',
          saleType: '在售状态',
          productTag: '产品标签',
          deliveryDay: '在售状态',
          styleName: '商品风格',
          tagName: '大类标签',
          placeName: '产地名称',
          browse: '浏览量',
          sales: '已销售总量',
          sortOrder: '排序',
          addTime: '创建时间',
          updateTime: '更新时间',
        }
        const tHeader = Object.keys(tableKeys).map(key => tableKeys[key])
        const filterVal = Object.keys(tableKeys).map(key => key)
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '商品信息')
        this.downloadLoading = false
      })
    }
  }
}
</script>
