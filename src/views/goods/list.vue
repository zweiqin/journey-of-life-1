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
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查找</el-button>
      <el-button
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
      <el-button
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
        :data="list"
        v-bind="$tableCommonOptions"
      >
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              class="table-expand"
            >
              <el-form-item label="宣传画廊">
                <img
                  v-for="pic in props.row.gallery"
                  :key="pic"
                  :src="pic"
                  class="gallery"
                >
              </el-form-item>
              <el-form-item label="商品介绍">
                <span>{{ props.row.brief }}</span>
              </el-form-item>
              <el-form-item label="商品单位">
                <span>{{ props.row.unit }}</span>
              </el-form-item>
              <el-form-item label="关键字">
                <span>{{ props.row.keywords }}</span>
              </el-form-item>
              <el-form-item label="类目ID">
                <span>{{ props.row.categoryId }}</span>
              </el-form-item>
              <el-form-item label="品牌商ID">
                <span>{{ props.row.brandId }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column> -->

        <el-table-column align="center" width="100" label="商品编号" prop="goodsSn" fixed="left" />
        <el-table-column align="center" width="100" label="商品名称" prop="categoryName" fixed="left"  show-overflow-tooltip />
        <el-table-column align="center" min-width="150" label="商品描述" prop="name" show-overflow-tooltip />
        <el-table-column align="center" width="80" label="商品主类" prop="goodsType" >
          <template slot-scope="{row}">
            {{ row.goodsType | typeFilter(goodTypeList) }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="80" prop="picUrl" label="图片" >
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
        <el-table-column align="center" min-width="50" label="单位" prop="unit" />
        <el-table-column align="center" width="100" label="零售价格" prop="counterPrice" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="会员价格" prop="vipPrice" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="优惠价格" prop="retailPrice" show-overflow-tooltip />
        <el-table-column align="center" width="80" prop="isOnSale" label="是否上架" >
          <template slot-scope="{row}">
            <el-switch :value ="row.isOnSale" />
          </template>
        </el-table-column>

        <!-- <el-table-column
          align="center"
          label="详情"
          prop="detail"
        >
          <template slot-scope="scope">
            <el-dialog
              :visible.sync="detailDialogVisible"
              title="商品详情"
            >
              <div v-html="goodsDetail" />
            </el-dialog>
            <el-button
              type="primary"
              size="mini"
              @click="showDetail(scope.row.detail)"
            >查看</el-button>
          </template>
        </el-table-column> -->

     
        <el-table-column align="center" width="100" label="支持代金券" prop="supportVoucher">
          <template slot-scope="{row}">
            <el-tag v-if="row.supportVoucher" type="success">是</el-tag>
            <el-tag v-else type="error">否</el-tag>
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
            <el-tag v-if="row.productTag==1" effect="plain" type="danger">热卖</el-tag>
            <el-tag v-if="row.productTag==2" effect="plain" type="warning">爆款</el-tag>
            <el-tag v-if="row.productTag==3" effect="plain" type="success">新品</el-tag>
            <el-tag v-if="row.productTag==4" effect="plain" type="info">原创</el-tag>
            <span v-else>{{ row.productTag }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="在售状态" prop="saleType" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span v-if="row.deliveryDay==0">现货</span>
            <span v-else>{{row.deliveryDay}}天内发出</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="商品风格编号" prop="styleId" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="大类标签编号" prop="tagId" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="产地名称" prop="placeName" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="浏览量" prop="browse" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="已销售总量" prop="sales" show-overflow-tooltip />
        <el-table-column align="center" width="100" label="排序字段" prop="sortOrder" show-overflow-tooltip />
        <el-table-column align="center" width="150" label="创建时间" prop="addTime" show-overflow-tooltip />
        <el-table-column align="center" width="150" label="更新时间" prop="updateTime" show-overflow-tooltip />
        <el-table-column align="center" width="150" label="是否新品" prop="isNew">
          <template slot-scope="{row}">
            <el-tag v-if="row.isNew" type="success">是</el-tag>
            <el-tag v-else type="error">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="150" label="是否人气" prop="isHot">
          <template slot-scope="{row}">
            <el-tag v-if="row.isHot" type="success">是</el-tag>
            <el-tag v-else type="error">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审批状态" prop="approveStatus">
          <template slot-scope="{row}">
            <el-tag v-if="row.approveStatus==0" effect="plain">待审批</el-tag>
            <el-tag v-if="row.approveStatus==1" effect="plain" type="success">审批通过</el-tag>
            <el-tag v-if="row.approveStatus==2" effect="plain" type="danger">审批拒绝</el-tag>
            <el-tag v-if="row.approveStatus==4" effect="plain" type="info">未提交</el-tag>
            <span v-else>{{ row.approveStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="佣金类型" prop="brokerageType">
          <template slot-scope="{row}">
            <span>{{ row.brokerageType | brokerageTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="150" label="商品详情" prop="detail" show-overflow-tooltip />

        <!--
        <el-table-column align="center" label="是否在售" prop="isOnSale">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isOnSale ? 'success' : 'error' ">{{ scope.row.isOnSale ? '在售' : '未售' }}</el-tag>
          </template>
        </el-table-column>
        -->

        <el-table-column
          align="center"
          label="操作"
          width="150"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleUpdate(scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

  </div>
</template>

<style>
.el-dialog {
  width: 60%;
}
.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 100px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
.gallery {
  width: 80px;
  margin-right: 10px;
}
</style>

<script>
import { goodsList, goodsDelete } from '@/api/business/goods'
import { getUserInfo } from '@/api/login'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'GoodsList',
  components: {
    Pagination
  },
  filters: {
    typeFilter(val, list) {
      const obj = list.find(item => +item.value === +val)
      return obj ? obj.label : '--'
    },
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
      goodsDetail: '',
      detailDialogVisible: false,
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
      this.$router.push({ name: 'goodsCreate' })
    },
    handleUpdate (row) {
      this.$router.push({ name: 'goodsEdit', query: { id: row.id } })
    },
    showDetail (detail) {
      this.goodsDetail = detail
      this.detailDialogVisible = true
    },
    handleDelete (row) {
      goodsDelete(row).then(response => {
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.errmsg
        })
      })
    },
    handleDownload () {
      if (!this.list.length) return
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['商品ID', '商品编号', '名称', '专柜价格', '当前价格', '是否新品', '是否热品', '是否在售', '首页主图', '宣传图片列表', '商品介绍', '详细介绍', '商品图片', '商品单位', '关键字', '类目ID', '品牌商ID']
        const filterVal = ['id', 'goodsSn', 'name', 'counterPrice', 'retailPrice', 'isNew', 'isHot', 'isOnSale', 'listPicUrl', 'gallery', 'brief', 'detail', 'picUrl', 'goodsUnit', 'keywords', 'categoryId', 'brandId']
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '商品信息')
        this.downloadLoading = false
      })
    }
  }
}
</script>
