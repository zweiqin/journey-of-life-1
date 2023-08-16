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
        <div v-if="formData.gallery">
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
        title: '查看设计公司详情'
      },
      visible: false,
      formData: {
        'id': 9,
        'brandId': 1001257,
        'comType': '',
        'practiceYear': 0,
        'lowerPrice': 0,
        'upperPrice': 0,
        'serviceScope': '',
        'designType': '',
        'combType': '',
        'labels': '',
        'subscribeCnt': 0,
        'pics1': '',
        'pics2': '',
        'pics3': '',
        'pics4': '',
        'pics5': '',
        'tenantId': 0,
        'revision': null,
        'createdBy': 0,
        'createdTime': '2023-07-31 11:29:20',
        'updatedBy': 0,
        'updatedTime': '2023-07-31 11:29:20',
        'deleted': '0',
        'brandVo': {
          'id': 1001257,
          'brandgenre': null,
          'name': '圣益办公配件有限公司',
          'keeperName': '兰小姐',
          'desc': '圣益办公配件有限公司专注于五金配件的主营产品为中高档多用途五金转盘，自创立以来，秉承“以人为本、学习、创新、共赢”的经营理念，不断优化管理体系，追求质量至上，精益求精。欢迎各界朋友洽谈合作。',
          'phone': '',
          'picUrl': 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/wjeuosv48edcoanyuksn.png',
          'logoUrl': 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/wdwtgte8ar460haen0p6.jpg',
          'picUrls': [
            'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/0cqy02hm0q4zoedwtei1.jpg'
          ],
          'sortOrder': 50,
          'floorPrice': 0,
          'addTime': '2023-07-31 11:29:20',
          'updateTime': '2023-07-31 11:29:20',
          'shareUrl': null,
          'adminId': null,
          'deleted': false,
          'commpany': null,
          'autoUpdateGood': null,
          'shopUrl': null,
          'defaultCategoryId': null,
          'defaultPages': null,
          'addPrecent': null,
          'address': '',
          'longitude': 1000,
          'latitude': 1000,
          'regionCode': 440606,
          'fetchTimeRules': null,
          'startTime': '',
          'endTime': '',
          'licenseUrl': '',
          'idcardProsUrl': null,
          'idcardConsUrl': null,
          'explain': '',
          'browse': 10,
          'styleId': 1,
          'labelId': 2,
          'prefix': null,
          'materialCityId': 4,
          'brandSort': 1,
          'clickVolume': 75,
          'trafficVolume': 259,
          'collectVolume': 5,
          'materialBrandStyleId': null
        }
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

