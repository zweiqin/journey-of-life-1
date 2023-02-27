<template>
  <div class="app-container">
    <div class="body-container">
      <el-card class="box-card">
        <h3 slot="header">商品介绍</h3>
        <div class="box-card-container">
          <div class="box-card-form">
            <el-form
              ref="formData" :rules="formRules" :model="formData" size="mini"
              label-suffix=":"
              label-width="150px"
            >
              <el-form-item label="所属分类" prop="category_arr">
                <el-cascader
                  v-model="formData.category_arr" :options="categoryList"
                  :props="{ expandTrigger: 'hover' }"
                />
                <el-tooltip content="选择该商品的所属分类" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="类目名">
                <span v-if="!!formData.category_arr.length">{{ getCategoryItem() && getCategoryItem().label }}</span>
                <el-tooltip content="会在选择所属分类后自动回填" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="商品编号" prop="goodsSn">
                <!-- <el-input v-model="formData.goodsSn" placeholder="商品编号，不填则自动生成" maxlength="30" show-word-limit suffix-icon="el-icon-question" /> -->
                <el-input v-model="formData.goodsSn" placeholder="商品编号，不填则自动生成" maxlength="30" show-word-limit />
                <el-tooltip content="可以填写商品的编号，也可以不填写，不填写则系统自动生成" placement="top-start">
                  <i class="el-icon-question body-form-icon"></i>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="商品名称" prop="name">
                <el-input v-model="formData.name" placeholder="请输入商品名称" maxlength="30" show-word-limit />
                <el-tooltip content="填写该商品名称，用于商品展示" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="商品简介" prop="brief">
                <el-input
                  v-model="formData.brief" type="textarea" placeholder="请输入商品简介" maxlength="300"
                  :rows="3"
                  show-word-limit
                />
                <el-tooltip content="填写该商品的简单信息介绍，功能介绍等" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="商品单位" prop="unit">
                <el-select v-model="formData.unit" placeholder="请选择商品单位" filterable allow-create>
                  <el-option v-for="item in unitList" :key="item.id" :label="item.value" :value="item.value" />
                </el-select>
                <el-tooltip content="填写商品的单位（例如沙发，可填写：套）" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="商品图片" prop="picUrl">
                <MyUpload v-model="formData.picUrl" />
                <el-tooltip content="只能上传一张，用于外部展示" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="商品宣传图片" prop="gallery">
                <MyUpload v-model="formData.gallery" :limit="3" multiple />
                <el-tooltip content="可以上传多张，在查看商品详情页面使用" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="搜索关键字" prop="keywords">
                <el-tag
                  v-for="(tag, idx) in formData.keywords" :key="tag" closable size="medium"
                  type="primary"
                  @close="handleClose(idx)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="newKeywordVisible" ref="newKeywordInput" v-model="newKeyword" class="input-new-keyword"
                  @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"
                />
                <el-button v-else icon="el-icon-plus" plain @click="showInput">
                  添加
                </el-button>
                <el-tooltip content="填写该商品的搜索关键字，用户在搜索的时候就是搜索该名称" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="零售价格" prop="counterPrice">
                <el-input v-model="formData.counterPrice" clearable placeholder="请输入零售价格" />
                <el-tooltip content="普通用户对应的价格，同时也是支付价格" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="会员价格" prop="vipPrice">
                <el-input v-model="formData.vipPrice" clearable placeholder="请输入会员价格" />
                <el-tooltip content="门店vip会员、合伙人、超级合伙人所支付的价格（如果会员会员价格小于其它价格，那么支付的就是会员价格）" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="优惠价格" prop="retailPrice">
                <el-input v-model="formData.retailPrice" clearable placeholder="请输入优惠价格" />
                <el-tooltip content="对产品做了优惠价、折扣价等" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="是否上架" prop="isOnSale">
                <el-switch v-model="formData.isOnSale" />
                <el-tooltip content="默认上架（系统商城只展示状态为上架的产品）" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="支持代金券" prop="supportVoucher">
                <el-switch v-model="formData.supportVoucher" />
                <el-tooltip content="该商品的支付是否允许使用代金券进行抵扣" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="在售状态" prop="saleType">
                <el-radio-group v-model="formData.saleType">
                  <el-radio :label="0">在售</el-radio>
                  <el-radio :label="1">预售</el-radio>
                  <el-radio :label="2">售罄</el-radio>
                </el-radio-group>
                <el-tooltip content="分为在售、预售、售空三种，根据商品实际情况选择" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>

              <!-- 预售时间 -->
              <template v-if="formData.saleType == 1">
                <el-form-item label="开售时间" prop="startTime">
                  <el-date-picker
                    v-model="formData.startTime" type="date" value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择开售时间"
                  />
                </el-form-item>
                <el-form-item label="时间限制" prop="timeType">
                  <el-radio-group v-model="formData.timeType">
                    <el-radio :label="0">结束天数</el-radio>
                    <el-radio :label="1">结束时间</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item v-if="formData.timeType == 0" label="开售时间开始" prop="limitDays">
                  <el-input v-model="formData.limitDays" clearable placeholder="请输入" style="width:100px" /> 天结束
                </el-form-item>
                <el-form-item v-if="formData.timeType == 1" label="结束时间" prop="endTime">
                  <el-date-picker
                    v-model="formData.endTime" type="date" value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择结束时间"
                  />
                </el-form-item>
              </template>

              <el-form-item label="产品标签" prop="productTag">
                <el-radio-group v-model="formData.productTag">
                  <el-radio :label="0">常规</el-radio>
                  <el-radio :label="1">热卖</el-radio>
                  <el-radio :label="2">爆款</el-radio>
                  <el-radio :label="3">新品</el-radio>
                  <el-radio :label="4">原创</el-radio>
                </el-radio-group>
                <el-tooltip content="用来标注这个商品，分为：常规、热卖、爆款、新品、原创，系统会根据这个标签来自动的进行筛选和展示" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>
              <el-row type="flex">
                <el-form-item label="商品状态" prop="is_deliveryDay">
                  <el-radio-group v-model="formData.is_deliveryDay">
                    <el-radio :label="true">现货</el-radio>
                    <el-radio :label="false">其它</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item v-if="!formData.is_deliveryDay" label-width="10px" prop="deliveryDay">
                  <el-input v-model="formData.deliveryDay" clearable placeholder="请输入" style="width:100px" /> 天内能发出
                </el-form-item>
              </el-row>

              <el-form-item label="门店" prop="brandId">
                <el-select v-model="formData.brandId" placeholder="请选择门店">
                  <el-option v-for="item in brandList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-tooltip content="自动回填门店ID，不需要填写" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="供应商" prop="supplierId">
                <el-select v-model="formData.supplierId" placeholder="请选择供应商">
                  <el-option v-for="item in supplierList" :key="item.id" :label="item.supplierName" :value="item.id" />
                </el-select>
                <el-tooltip content="根据商品选择对应材质" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="商品材质" prop="textureId">
                <el-select v-model="formData.textureId" placeholder="请选择商品材质">
                  <el-option v-for="item in goodsTextureList" :key="item.id" :label="item.materialName" :value="item.id" />
                </el-select>
                <el-tooltip content="根据商品选择对应材质" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="商品产地" prop="productPlace">
                <el-select v-model="formData.productPlace" placeholder="请选择商品产地">
                  <el-option
                    v-for="item in goodsProductPlaceList" :key="item.code" :label="item.desc"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="商品风格" prop="styleId">
                <el-select v-model="formData.styleId" placeholder="请选择商品风格">
                  <el-option v-for="item in goodsStyleList" :key="item.id" :label="item.value" :value="item.id" />
                </el-select>
                <el-tooltip content="根据商品选择对应风格" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="大类标签" prop="tagId">
                <el-select v-model="formData.tagId" placeholder="请选择大类标签">
                  <el-option v-for="item in goodsTagList" :key="item.id" :label="item.value" :value="item.id" />
                </el-select>
                <el-tooltip content="只有智能选配、全屋定制、品牌工厂、搜家具这四种，系统会根据这个大类标签在不同的页面进行展示" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="商品排序" prop="sortOrder">
                <el-input v-model="formData.sortOrder" clearable placeholder="请输入商品排序" />
                <el-tooltip content="默认100，在商品列表的排序" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="商品详情" prop="detail">
                <div style="display:inline-block;"><Editor v-model="formData.detail" :init="editorInit" /></div>
                <el-input v-model="formData.detail" style="display:none" />
                <el-tooltip content="对这个商品的详细介绍和介绍图片，一般用来放商品介绍图片" placement="top-start">
                  <i class="el-icon-question  body-form-icon"></i>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </div>
          <GoodsDetail
            :form-data="formData" :goods-texture-list="goodsTextureList"
            :goods-product-place-list="goodsProductPlaceList" :goods-style-list="goodsStyleList"
          ></GoodsDetail>
        </div>
      </el-card>

      <el-card>
        <h3 slot="header">商品规格</h3>
        <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
          <el-radio-group v-model="multipleSpec" @change="specChanged">
            <el-radio-button :label="false">默认标准规格</el-radio-button>
            <el-radio-button :label="true">多规格支持</el-radio-button>
          </el-radio-group>
          <el-button
            v-if="multipleSpec" type="primary" style="margin-left:10px" icon="el-icon-plus"
            @click="handleSpecificationShow"
          >
            添加
          </el-button>
        </div>

        <el-table :data="specifications">
          <el-table-column prop="specification" label="规格名" />
          <el-table-column prop="value" label="规格值">
            <template slot-scope="{ row }">
              <el-tag type="primary">{{ row.value }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="picUrl" label="规格图片">
            <template slot-scope="{ row }">
              <el-image
                v-if="row.picUrl" :src="row.picUrl" style="width:40px; height:40px" fit="cover"
                :preview-src-list="[ row.picUrl ]"
              />
            </template>
          </el-table-column>
          <el-table-column v-if="multipleSpec" label="操作" width="100" class-name="small-padding fixed-width">
            <template slot-scope="{ row }">
              <el-button type="danger" size="mini" @click="handleSpecificationDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog :visible.sync="specVisiable" :close-on-click-modal="false" width="550px" title="设置规格">
          <el-form ref="specForm" :rules="specFormRules" :model="specForm" label-width="100px">
            <el-form-item label="规格名称" prop="specification">
              <el-input v-model="specForm.specification" placeholder="请输入商品规格名称" />
            </el-form-item>
            <el-form-item label="规格值" prop="value">
              <el-input v-model="specForm.value" placeholder="请输入商品规格值，可以使用 逗号 进行批量添加操作" />
            </el-form-item>
            <el-form-item label="规格图片" prop="picUrl">
              <MyUpload v-model="specForm.picUrl" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="specVisiable = false">取消</el-button>
            <el-button type="primary" @click="handleSpecificationAdd">
              确定
            </el-button>
          </div>
        </el-dialog>
      </el-card>

      <el-card>
        <h3 slot="header">商品库存</h3>
        <el-table :data="products">
          <el-table-column prop="value" label="货品规格">
            <template slot-scope="{ row }">
              <el-tag v-for="tag in row.specifications" :key="tag">
                {{ tag }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="price" width="100" label="货品售价" />
          <el-table-column prop="number" width="100" label="货品数量" />
          <el-table-column prop="url" width="100" label="货品图片">
            <template slot-scope="{ row }">
              <el-image
                v-if="row.url" :src="row.url" style="width:40px; height:40px" fit="cover"
                :preview-src-list="[ row.url ]"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
            <template slot-scope="{ row }">
              <el-button size="mini" @click="handleProductShow(row)">设置</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog :visible.sync="productVisiable" :close-on-click-modal="false" width="550px" title="设置货品">
          <el-form ref="productForm" :model="productForm" :rules="productFormRules" label-width="100px">
            <el-form-item label="货品规格列" prop="specifications">
              <el-tag v-for="tag in productForm.specifications" :key="tag">
                {{ tag }}
              </el-tag>
            </el-form-item>
            <el-form-item label="货品售价" prop="price">
              <el-input v-model="productForm.price" />
            </el-form-item>
            <el-form-item label="货品数量" prop="number">
              <el-input v-model="productForm.number" />
            </el-form-item>
            <el-form-item label="货品图片" prop="url">
              <MyUpload v-model="productForm.url" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="productVisiable = false">取消</el-button>
            <el-button type="primary" @click="handleProductEdit">
              确定
            </el-button>
          </div>
        </el-dialog>
      </el-card>

      <el-card class="box-card">
        <h3 slot="header">商品参数</h3>
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px" @click="handleAttributeShow">
          添加
        </el-button>
        <el-table :data="attributes">
          <el-table-column prop="attribute" label="商品参数名称" />
          <el-table-column prop="value" label="商品参数值" />
          <el-table-column label="操作" width="100" class-name="small-padding fixed-width">
            <template slot-scope="{ row }">
              <el-button type="danger" size="mini" @click="handleAttributeDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog :visible.sync="attributeVisiable" :close-on-click-modal="false" width="550px" title="设置商品参数">
          <el-form ref="attributeForm" :model="attributeForm" :rules="attributeFormRules" label-width="100px">
            <el-form-item label="商品参数名" prop="attribute">
              <el-input v-model="attributeForm.attribute" />
            </el-form-item>
            <el-form-item label="商品参数值" prop="value">
              <el-input v-model="attributeForm.value" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="attributeVisiable = false">取消</el-button>
            <el-button type="primary" @click="handleAttributeAdd">
              确定
            </el-button>
          </div>
        </el-dialog>
      </el-card>
    </div>

    <div class="footer-container">
      <el-button size="medium" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="medium" @click="handleSubmit">保存</el-button>
    </div>

  </div>
</template>

<script>
import dayjs from 'dayjs'
import MyUpload from '@/components/MyUpload'
import GoodsDetail from '@/components/goodsDetail'
import Editor from '@tinymce/tinymce-vue'
import { goodsCreate, goodsCatAndBrand, goodsProductPlaceList } from '@/api/goods/goodsList'
import { createStorage } from '@/api/business/storage'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { goodsStyleList } from '@/api/goods/goodsStyle'
import { getNewMaterialList } from '@/api/goods/goodsMaterial'
import { getNewSupplierList } from '@/api/enterprise/supplier'
import { goodsTagList } from '@/api/goods/goodsTag'
import { parseTime } from '@/utils'
import { regZero, regFloat } from '@/utils/reg'
import XeUtils from 'xe-utils'
import { unitList } from '@/utils/unitList'

export default {
  name: 'GoodsCreate',
  components: {
    MyUpload,
    Editor,
    GoodsDetail
  },
  data() {
    const valueCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入商品规格值'))
      }
      if (value.startsWith(',') || value.startsWith('，') || value.endsWith(',') || value.endsWith('，')) {
        return callback(new Error('开头或结尾不能是逗号'))
      }
      callback()
    }
    return {
      unitList,
      goodTypeList: [
        { value: 1, label: '家具' },
        { value: 2, label: '材料' }
      ],
      supplierList: [],
      goodsStyleList: [],
      goodsTextureList: [],
      goodsTagList: [],
      goodsProductPlaceList: [],
      newKeywordVisible: false,
      newKeyword: '',
      keywords: [],
      categoryList: [],
      brandList: [],
      specVisiable: false,
      multipleSpec: false,
      prev_specifications: [ { specification: '规格', value: '标准', picUrl: '' } ],
      specifications: [ { specification: '规格', value: '标准', picUrl: '' } ],
      // specifications: [],
      productVisiable: false,
      prev_products: [ { id: 0, specifications: [ '标准' ], price: 0.00, number: 0, url: '' } ],
      products: [ { id: 0, specifications: [ '标准' ], price: 0.00, number: 0, url: '' } ],
      // products: [],
      attributeVisiable: false,
      attributes: [],
      formData: {
        id: '',
        goodsSn: '',
        name: '',
        brief: '',
        unit: '',
        picUrl: '',
        gallery: [],
        keywords: [],
        category_arr: [],
        counterPrice: '',
        vipPrice: '',
        retailPrice: '',
        isOnSale: true,
        supportVoucher: false,
        saleType: '',
        productTag: '',
        is_deliveryDay: true,
        deliveryDay: '',
        brandId: '',
        supplierId: '',
        styleId: '',
        textureId: '',
        tagId: '',
        productPlace: '',
        sortOrder: '100',
        startTime: dayjs().startOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
        timeType: 0,
        limitDays: '',
        endTime: '',
        detail: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入商品名称' }
        ],
        brief: [
          { required: true, message: '请输入商品简介' }
        ],
        unit: [
          { required: true, message: '请输入商品单位' }
        ],
        picUrl: [
          { required: true, message: '请上传商品图片' }
        ],
        gallery: [
          { type: 'array', required: true, message: '请上传商品宣传图片' }
        ],
        keywords: [
          { type: 'array', required: true, message: '请输入搜索关键字' }
        ],
        category_arr: [
          { type: 'array', required: true, message: '请选择所属分类' }
        ],
        counterPrice: [
          { required: true, message: '请输入零售价格' },
          { pattern: regZero, message: '请输入正整数' }
        ],
        vipPrice: [
          { pattern: regZero, message: '请输入正整数' }
        ],
        retailPrice: [
          { pattern: regZero, message: '请输入正整数' }
        ],
        saleType: [
          { required: true, message: '请选择在售状态' }
        ],
        productTag: [
          { required: true, message: '请选择产品标签' }
        ],
        deliveryDay: [
          { required: true, message: '请输入' }
        ],
        brandId: [
          { required: true, message: '请选择门店' }
        ],
        supplierId: [
          { required: true, message: '请选择供应商' }
        ],
        styleId: [
          { required: false, message: '请选择商品风格' }
        ],
        textureId: [
          { required: false, message: '请选择商品材质' }
        ],
        tagId: [
          { required: true, message: '请选择大类标签' }
        ],
        productPlace: [
          { required: false, message: '请选择商品产地' }
        ],
        sortOrder: [
          { required: true, message: '请输入商品排序' }
        ],
        limitDays: [
          { required: true, message: '请输入结束天数' }
        ],
        startTime: [
          { required: true, message: '请选择开售时间' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间' }
        ],
        detail: [
          { required: true, message: '请输入商品详情' }
        ]
      },
      specForm: {
        specification: '',
        value: '',
        picUrl: ''
      },
      specFormRules: {
        specification: [
          { required: true, message: '请输入商品规格名称' }
        ],
        value: [
          { required: true, trigger: 'change', validator: valueCheck }
        ],
        picUrl: [
          // { required: true, message: '请上传商品规格图片' }
        ]
      },
      productForm: {
        id: 0,
        specifications: [],
        price: '0.00',
        number: '0',
        url: ''
      },
      productFormRules: {
        price: [
          { required: true, message: '请输入货品售价' },
          { pattern: regFloat, message: '请输入大于0不超过两位小数的数字' }
        ],
        number: [
          { required: true, message: '请输入货品数量' },
          { pattern: regZero, message: '请输入正整数' }
        ],
        url: [
          // { required: true, message: '请上传商品规格图片' }
        ]
      },
      attributeForm: {
        attribute: '',
        value: ''
      },
      attributeFormRules: {
        attribute: [
          { required: true, message: '请输入商品参数名' }
        ],
        value: [
          { required: true, message: '请输入商品参数值' }
        ]
      },
      editorInit: {
        width: 580,
        language: 'zh_CN',
        convert_urls: false,
        plugins: [ 'advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount' ],
        toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
        images_upload_handler(blobInfo, success, failure) {
          const formData = new FormData()
          formData.append('file', blobInfo.blob())
          createStorage(formData).then((res) => {
            success(res.data.url)
          })
            .catch(() => {
              failure('上传失败，请重新上传')
            })
        }
      }
    }
  },
  computed: {
    headers() {
      return {
        'X-Dts-Admin-Token': getToken()
      }
    }
  },
  created() {
    this.init()
  },

  methods: {
    init() {
      this.getNewSupplierList()
      this.getGoodsStyleList()
      this.getNewMaterialList()
      this.getGoodsTagList()
      this.getGoodsProductPlaceList()
      this.getcategoryList()
      const { brandId } = this.$route.query
      this.formData.brandId = brandId
    },
    // 品类列表
    async getcategoryList() {
      goodsCatAndBrand().then((response) => {
        this.categoryList = response.data.categoryList
        this.brandList = response.data.brandList
      })
    },
    // 供应商
    async getNewSupplierList() {
      const res = await getNewSupplierList({
        page: 1,
        limit: 9999
      })
      this.supplierList = res.data.items
    },
    // 商品风格
    async getGoodsStyleList() {
      const res = await goodsStyleList({
        page: 1,
        limit: 9999
      })
      this.goodsStyleList = res.data.items
    },
    // 商品材质
    async getNewMaterialList() {
      const res = await getNewMaterialList({
        page: 1,
        limit: 9999
      })
      this.goodsTextureList = res.data.items
    },
    // 商品标签
    async getGoodsTagList() {
      const res = await goodsTagList()
      this.goodsTagList = res.data.items
    },
    // 商品产地
    async getGoodsProductPlaceList() {
      const res = await goodsProductPlaceList()
      this.goodsProductPlaceList = res.data.data
      console.log('goodsProductPlaceList', res)
    },
    handleCancel() {
      this.$router.back()
    },
    getCategoryItem() {
      const { category_arr } = this.formData
      const select_categoryId = category_arr[category_arr.length - 1]
      const categoryItem = XeUtils.findTree(this.categoryList, (item) => item.value === select_categoryId)
      return categoryItem ? categoryItem.item : {}
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const {
        keywords,
        gallery,
        is_deliveryDay,
        deliveryDay,
        // 预售
        saleType,
        timeType,
        startTime,
        endTime,
        limitDays,
        // 品类
        category_arr,
        ...opts
      } = this.formData
      const categoryItem = this.getCategoryItem()
      if (!categoryItem.value) {
        this.formData.category_arr = []
        this.$elMessage('品类有误，请重新选择!', 'warning')
        return
      }
      const loading = this.$elLoading()
      try {
        const finalGoods = {
          goods: Object.assign({}, opts, {
            keywords: keywords.toString(),
            gallery: Array.isArray(gallery) ? gallery.map((v) => v.resData || v) : [],
            deliveryDay: is_deliveryDay ? '0' : deliveryDay
          }, saleType == 1 ? {
            timeType,
            startTime,
            endTime: timeType === 1 ? endTime : '',
            limitDays: timeType === 0 ? limitDays : ''
          } : {
            timeType: '',
            startTime: '',
            endTime: '',
            limitDays: ''
          }, {
            categoryId: categoryItem.value,
            categoryName: categoryItem.label
          }),
          specifications: this.specifications,
          products: this.products,
          attributes: this.attributes
        }
        await goodsCreate(finalGoods)
        loading.close()
        this.$elMessage('上传成功！')
        this.$router.back()
      } catch (e) {
        loading.close()
      }
    },
    handleClose(idx) {
      this.formData.keywords.splice(idx, 1)
    },
    showInput() {
      this.newKeywordVisible = true
      this.$nextTick((_) => {
        this.$refs.newKeywordInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const newKeyword = this.newKeyword
      if (newKeyword) {
        this.formData.keywords.push(newKeyword)
      }
      this.newKeywordVisible = false
      this.newKeyword = ''
    },
    specChanged(label) {
      if (this.multipleSpec === false) {
        if (label === false) {
          this.specifications = [ { specification: '规格', value: '标准', picUrl: '' } ]
          this.products = [ { id: 0, specifications: [ '标准' ], price: 0.00, number: 0, url: '' } ]
        } else {
          this.specifications = []
          this.products = []
        }
      } else if (label === false) {
        this.specifications = [ { specification: '规格', value: '标准', picUrl: '' } ]
        this.products = [ { id: 0, specifications: [ '标准' ], price: 0.00, number: 0, url: '' } ]
      } else {
        this.specifications = this.prev_specifications
        this.products = this.prev_products
      }
    },
    handleSpecificationShow() {
      this.specForm = { specification: '', value: '', picUrl: '' }
      this.specVisiable = true
    },
    async handleSpecificationAdd() {
      await this.$validatorForm('specForm')
      var index = this.specifications.length - 1
      for (var i = 0; i < this.specifications.length; i++) {
        const v = this.specifications[i]
        if (v.specification === this.specForm.specification) {
          index = i
        }
      }
      if (this.specForm.value.includes(',') || this.specForm.value.includes('，')) {
        this.specForm.value.replaceAll('，', ',').split(',')
          .forEach((item) => {
            this.specifications.splice(index + 1, 0, { ...this.specForm, value: item })
            index++
          })
      } else {
        this.specifications.splice(index + 1, 0, this.specForm)
      }
      this.specVisiable = false
      this.specToProduct()
    },
    handleSpecificationDelete(row) {
      const index = this.specifications.indexOf(row)
      this.specifications.splice(index, 1)
      this.specToProduct()
    },
    specToProduct() {
      if (this.specifications.length === 0) {
        return
      }
      // 根据specifications创建临时规格列表
      var specValues = []
      var spec = this.specifications[0].specification
      var values = []
      values.push(0)

      for (var i = 1; i < this.specifications.length; i++) {
        const aspec = this.specifications[i].specification

        if (aspec === spec) {
          values.push(i)
        } else {
          specValues.push(values)
          spec = aspec
          values = []
          values.push(i)
        }
      }
      specValues.push(values)

      // 根据临时规格列表生产货品规格
      // 算法基于 https://blog.csdn.net/tyhj_sf/article/details/53893125
      var productsIndex = 0
      var products = []
      var combination = []
      var n = specValues.length
      for (var s = 0; s < n; s++) {
        combination[s] = 0
      }
      var index = 0
      var isContinue = false
      do {
        var specifications = []
        for (var x = 0; x < n; x++) {
          var z = specValues[x][combination[x]]
          specifications.push(this.specifications[z].value)
        }
        products[productsIndex] = { id: productsIndex, specifications, price: 0.00, number: 0, url: '' }
        productsIndex++

        index++
        combination[n - 1] = index
        for (var j = n - 1; j >= 0; j--) {
          if (combination[j] >= specValues[j].length) {
            combination[j] = 0
            index = 0
            if (j - 1 >= 0) {
              combination[j - 1] = combination[j - 1] + 1
            }
          }
        }
        isContinue = false
        for (var p = 0; p < n; p++) {
          if (combination[p] !== 0) {
            isContinue = true
          }
        }
      } while (isContinue)

      this.products = products
    },
    handleProductShow(row) {
      this.productForm = Object.assign({}, row)
      this.productVisiable = true
    },
    async handleProductEdit() {
      await this.$validatorForm('productForm')

      for (var i = 0; i < this.products.length; i++) {
        const v = this.products[i]
        if (v.id === this.productForm.id) {
          this.products.splice(i, 1, this.productForm)
          break
        }
      }
      this.productVisiable = false
    },
    handleAttributeShow() {
      this.attributeForm = {}
      this.attributeVisiable = true
    },
    async handleAttributeAdd() {
      await this.$validatorForm('attributeForm')

      this.attributes.unshift(this.attributeForm)
      this.attributeVisiable = false
    },
    handleAttributeDelete(row) {
      const index = this.attributes.indexOf(row)
      this.attributes.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input,
.el-textarea,
.el-select,
.el-cascader {
	width: 400px;
}

.input-new-keyword {
	width: 90px;
	margin-left: 10px;
	vertical-align: bottom;
}

.app-container {
	height: 100%;
	padding: 0;
}

.body-container {
	flex: 1;
	overflow-y: auto;

	.box-card-container {
		min-width: 1200px;

		// display: flex;
		// justify-content: space-between;
		.box-card-form {
			// flex:1;
			// width:0;
			display: inline-block;
		}
	}

	.el-card {
		margin: 20px;
	}

	.el-tag+.el-tag {
		margin-left: 10px;
	}
}

.footer-container {
	padding: 10px 20px;
	display: flex;
	justify-content: center;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.body-form-icon {
	opacity: .4;
}
</style>
