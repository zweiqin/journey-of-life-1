<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="modalOptions"
  >
    <el-form
      ref="formData"
      :model="formData"
      size="mini"
      label-suffix=":"
      label-width="120px"
    >
      <!-- 商品信息 -->
      <el-form-item label="零售价格" prop="name">
        {{ formData.counterPrice || '--' }}
      </el-form-item>
      <el-form-item label="会员价格" prop="vipPrice">
        {{ formData.vipPrice || '--' }}
      </el-form-item>
      <el-form-item label="优惠价格" prop="retailPrice">
        {{ formData.retailPrice || '--' }}
      </el-form-item>
      <el-form-item label="商品图片" prop="picUrl">
        <el-image v-if="formData.picUrl" :src="formData.picUrl" style="width:80px; height:80px" fit="cover" :preview-src-list="[ formData.picUrl ]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="商品宣传图片" prop="gallery">
        <div v-if="formData.gallery && formData.gallery.length">
          <el-image v-for="(item, index) in formData.gallery" :key="index" :src="item" style="width:80px; height:80px; margin-right: 10px;" fit="cover" :preview-src-list="[ formData.picUrl ]" />
        </div>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="产品标签" prop="productTag">
        <span v-if="formData.productTag === 0">常规</span>
        <span v-else-if="formData.productTag === 1">热卖</span>
        <span v-else-if="formData.productTag === 2">爆款</span>
        <span v-else-if="formData.productTag === 3">新品</span>
        <span v-else-if="formData.productTag === 4">原创</span>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="品类名称" prop="categoryName">
        {{ formData.categoryName || '--' }}
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        {{ formData.unit || '--' }}
      </el-form-item>
      <el-form-item label="商品简介" prop="brief">
        {{ formData.brief || '--' }}
      </el-form-item>
      <el-form-item label="搜索关键字" prop="keywords">
        {{ formData.keywords || '--' }}
      </el-form-item>
      <el-form-item label="是否上架" prop="isOnSale">
        <span v-if="formData.isOnSale">是</span>
        <span v-else>否</span>
      </el-form-item>
      <el-form-item label="是否支持代金券" prop="supportVoucher">
        <span v-if="formData.supportVoucher">是</span>
        <span v-else>否</span>
      </el-form-item>
      <el-form-item label="支持代金券数量" prop="voucherAmount">
        {{ typeof formData.voucherAmount === 'number' ? formData.voucherAmount : '--' }}
      </el-form-item>
      <el-form-item label="在售状态" prop="saleType">
        <span v-if="formData.saleType === 0">在售</span>
        <span v-else-if="formData.saleType === 1">预售</span>
        <span v-else-if="formData.saleType === 2">售罄</span>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="商品状态" prop="deliveryDay">
        <span v-if="formData.deliveryDay === 0">现货</span>
        <span v-else>几天内能发出</span>
      </el-form-item>
      <el-form-item label="商品风格名称" prop="styleName">
        {{ formData.styleName || '--' }}
      </el-form-item>
      <el-form-item label="大类标签名称" prop="tagName">
        {{ formData.tagName || '--' }}
      </el-form-item>
      <el-form-item label="商品产地名称" prop="placeName">
        {{ formData.placeName || '--' }}
      </el-form-item>
      <el-form-item label="浏览量" prop="browse">
        {{ formData.browse || '--' }}
      </el-form-item>
      <el-form-item label="已销售总量" prop="sales">
        {{ formData.sales || '--' }}
      </el-form-item>
      <el-form-item label="是否新品" prop="isNew">
        <span v-if="formData.isNew">是</span>
        <span v-else>否</span>
      </el-form-item>
      <el-form-item label="是否人气" prop="isHot">
        <span v-if="formData.isHot">是</span>
        <span v-else>否</span>
      </el-form-item>
      <el-form-item label="审批状态" prop="approveStatus">
        <span v-if="formData.approveStatus === 4">未提交</span>
        <span v-else-if="formData.approveStatus === 0">待审批</span>
        <span v-else-if="formData.approveStatus === 1">审批通过</span>
        <span v-else-if="formData.approveStatus === 2">审批拒绝</span>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="审批状态" prop="brokerageType">
        <span v-if="formData.brokerageType === 0">无推广佣金</span>
        <span v-else-if="formData.brokerageType === 1">自定义佣金</span>
        <span v-else-if="formData.brokerageType === 2">代理审批比例</span>
        <span v-else>--</span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '查看商品详情'
      },
      visible: false,
      formData: {
        id: '',
        counterPrice: '',
        vipPrice: '',
        retailPrice: '',
        picUrl: '',
        gallery: '',
        productTag: '',
        categoryName: '',
        unit: '',
        brief: '',
        keywords: '',
        isOnSale: '',
        supportVoucher: '',
        voucherAmount: '',
        saleType: '',
        deliveryDay: '',
        styleName: '',
        tagName: '',
        placeName: '',
        browse: '',
        sales: '',
        isNew: '',
        isHot: '',
        approveStatus: '',
        brokerageType: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
    }
  }
}
</script>

