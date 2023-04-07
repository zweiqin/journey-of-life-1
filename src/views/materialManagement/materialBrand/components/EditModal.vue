<template>
  <div>
    <el-dialog :visible.sync="visible" v-bind="modalOptions">
      <el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="150px">
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入公司名称" maxlength="30" show-word-limit />
        </el-form-item>
        <el-form-item label="店主名称" prop="keeperName">
          <el-input v-model="formData.keeperName" placeholder="请输入店主名称" maxlength="30" show-word-limit />
        </el-form-item>
        <el-form-item label="简介" prop="desc">
          <el-input v-model="formData.desc" type="textarea" placeholder="请输入简介" maxlength="520" :rows="3" show-word-limit />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入电话" maxlength="30" />
        </el-form-item>
        <el-form-item label="区域" prop="region_arr">
          <el-cascader
            v-model="formData.region_arr" placeholder="请选择区域" :options="common_regionList"
            :props="{ label: 'name', value: 'code', expandTrigger: 'hover' }" clearable
          />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address" placeholder="请输入地址" maxlength="30" />
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="formData.longitude" placeholder="请输入经度">
            <div slot="append"><el-button type="primary" @click="mapDialogVisible = true">查找位置</el-button></div>
          </el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="formData.latitude" placeholder="请输入纬度">
            <div slot="append"><el-button type="primary" @click="mapDialogVisible = true">查找位置</el-button></div>
          </el-input>
        </el-form-item>
        <el-form-item label="公司图片" prop="picUrl">
          <MyUpload v-model="formData.picUrl" />
        </el-form-item>
        <el-form-item label="Logo" prop="logoUrl">
          <MyUpload v-model="formData.logoUrl" />
        </el-form-item>
        <el-form-item label="店铺图片" prop="picUrls">
          <MyUpload v-model="formData.picUrls" :limit="9" />
        </el-form-item>
        <el-form-item label="营业执照" prop="licenseUrl">
          <MyUpload v-model="formData.licenseUrl" />
        </el-form-item>
        <el-form-item label="开始营业时间" prop="startTime">
          <el-date-picker
            v-model="formData.startTime" type="date" value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始营业时间"
          />
        </el-form-item>
        <el-form-item label="结束营业时间" prop="endTime">
          <el-date-picker
            v-model="formData.endTime" type="date" value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束营业时间"
          />
        </el-form-item>
        <el-form-item label="入驻说明" prop="explain">
          <el-input
            v-model="formData.explain" type="textarea" placeholder="请输入入驻说明" maxlength="520"
            :rows="3"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="门店类型" prop="brandgenre">
          <el-select v-model="formData.brandgenre" placeholder="请选择门店类型" filterable clearable style="width: 220px;">
            <el-option v-for="item in storeTypeList" :key="item.id" :label="item.storeName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="门店风格" prop="styleId">
          <el-select v-model="formData.styleId" placeholder="请选择门店风格" filterable clearable style="width: 220px;">
            <el-option v-for="item in brandStyleList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="门店材料风格" prop="styleId">
          <el-select v-model="formData.materialBrandStyleIdArr" placeholder="请选择门店材料风格" multiple filterable clearable style="width: 220px;">
            <el-option v-for="item in materialBrandStyleList" :key="item.id" :label="item.styleName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="门店标签" prop="labelId">
          <el-select v-model="formData.labelId" placeholder="可以为门店选择标签" filterable clearable style="width: 220px;">
            <el-option v-for="item in brandLabelList" :key="item.code" :label="item.value" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="formData.labelId === 2" label="所属材料城" prop="materialCityId">
          <el-select v-model="formData.materialCityId" placeholder="可以为门店选择所属材料城" filterable clearable style="width: 220px;">
            <el-option v-for="item in materialCityList" :key="item.id" :label="`${item.materialCityName}${item.materialCityTel ? ' ' + item.materialCityTel : ''}`" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="门店排序" prop="brandSort">
          <el-input v-model="formData.brandSort" clearable placeholder="请输入门店排序" />
        </el-form-item>
        <el-form-item v-if="$store.getters.roles.includes('超级管理员')" label="点击量" prop="clickVolume">
          <el-input v-model="formData.clickVolume" clearable placeholder="请输入点击量" />
        </el-form-item>
        <el-form-item v-if="$store.getters.roles.includes('超级管理员')" label="访问量" prop="trafficVolume">
          <el-input v-model="formData.trafficVolume" clearable placeholder="请输入访问量" />
        </el-form-item>
        <el-form-item v-if="$store.getters.roles.includes('超级管理员')" label="收藏量" prop="collectVolume">
          <el-input v-model="formData.collectVolume" clearable placeholder="请输入收藏量" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="请选择门店地址" :visible.sync="mapDialogVisible" width="550px" @opened="handleMapOpend">
      <div style="width: 100%;height: 650px;">
        <iframe
          id="mapPage"
          width="100%"
          height="100%"
          frameborder="0"
          src="https://m.amap.com/picker/?key=4840c2aafebea7127dd5515012e615d4"
        ></iframe>
        <!-- src="https://m.amap.com/picker/?key=4840c2aafebea7127dd5515012e615d4" -->
        <!-- src="https://apis.map.qq.com/tools/locpicker?type=1&key=SMJBZ-WCHK4-ZPZUA-DSIXI-XDDVQ-XWFX7&referer=myapp" -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyUpload from '@/components/MyUpload'
import { brandRead, brandCreate, brandUpdate, brandLabelList, storeTypeList } from '@/api/brand/brandList'
import { roleList } from '@/api/enterprise/role'
import { brandStyleList } from '@/api/brand/brandStyle'
import { getNewMaterialCityList } from '@/api/materialManagement/materialCity'
import { getMaterialBrandStyleList } from '@/api/materialManagement/materialBrandStyle'
import XeUtils from 'xe-utils'

export default {
  name: 'EditModal',
  components: {
    MyUpload
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '600px',
        title: ''
      },
      visible: false,
      formData: {
        id: '',
        name: '',
        keeperName: '',
        desc: '',
        phone: '',
        region_arr: [],
        address: '',
        longitude: '',
        latitude: '',
        picUrl: '',
        logoUrl: '',
        picUrls: [],
        licenseUrl: '',
        startTime: '',
        endTime: '',
        explain: '',
        brandgenre: '',
        styleId: '',
        materialBrandStyleIdArr: [],
        materialBrandStyleId: '',
        labelId: '',
        materialCityId: '',
        brandSort: '100',
        clickVolume: '',
        trafficVolume: '',
        collectVolume: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入公司名称' }
        ],
        keeperName: [
          { required: false, message: '请输入店主名称' }
        ],
        desc: [
          { required: false, message: '请输入简介' }
        ],
        phone: [
          { required: false, message: '请输入电话' }
        ],
        address: [
          { required: false, message: '请输入地址' }
        ],
        longitude: [
          { required: true, message: '请输入经度' }
        ],
        latitude: [
          { required: true, message: '请输入纬度' }
        ],
        region_arr: [
          { required: true, type: 'array', message: '请选择区域' }
        ],
        picUrl: [
          { required: false, message: '请上传公司图片' }
        ],
        licenseUrl: [
          { required: false, message: '请上传营业执照' }
        ],
        brandgenre: [
          { required: false, message: '请选择门店类型' }
        ],
        styleId: [
          { required: false, message: '请选择门店风格' }
        ],
        materialBrandStyleIdArr: [
          { required: false, type: 'array', message: '请选择门店材料风格' }
        ],
        labelId: [
          { required: false, message: '请选择门店标签' }
        ],
        materialCityId: [
          { required: false, message: '请选择所属材料城' }
        ],
        sortOrder: [
          { required: true, message: '请输入商品排序' }
        ],
        clickVolume: [
          { required: false, message: '请输入点击量' }
        ],
        trafficVolume: [
          { required: false, message: '请输入访问量' }
        ],
        collectVolume: [
          { required: false, message: '请输入收藏量' }
        ]
      },
      brandLabelList: [],
      brandStyleList: [],
      materialCityList: [],
      materialBrandStyleList: [],
      storeTypeList: [],
      mapDialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'common_regionList'
    ])
  },
  mounted() {
    window.addEventListener('message', this.mapCb, false)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.mapCb)
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    initList() {
      this.getBrandLabelList()
      this.getBrandStyleList()
      this.getNewMaterialCityList()
      this.getMaterialBrandStyleList()
      this.getstoreTypeList()
    },
    mapCb(event) {
      // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
      var loc = event.data
      // // 腾讯特色
      // if (loc && loc.module === 'locationPicker') {
      //   // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
      // this.selectAdderss(loc)
      // }
      if (loc && typeof loc === 'object' && loc.location) this.selectAdderss(loc)
    },
    // 选择经纬度
    selectAdderss(data) {
      // 腾讯特色
      // this.formData.longitude = data.latlng.lng
      // this.formData.latitude = data.latlng.lat
      // 高德特色
      const locationArr = data.location.split(',')
      this.formData.longitude = locationArr[0]
      this.formData.latitude = locationArr[1]
      this.mapDialogVisible = false
    },
    // 高德特色
    handleMapOpend(data) {
      var iframe = document.getElementById('mapPage').contentWindow
      document.getElementById('mapPage').onload = function () {
        iframe.postMessage('hello', 'https://m.amap.com/picker/')
      }
    },
    // 商品标签
    async getBrandLabelList() {
      const res = await brandLabelList()
      this.brandLabelList = res.data.data
    },
    // 商品风格
    async getBrandStyleList() {
      const res = await brandStyleList({
        page: 1,
        limit: 9999
      })
      this.brandStyleList = res.data.items
    },
    // 材料城
    async getNewMaterialCityList() {
      const res = await getNewMaterialCityList({
        page: 1,
        limit: 9999
      })
      this.materialCityList = res.data.items
    },
    // 门店材料风格
    async getMaterialBrandStyleList() {
      const res = await getMaterialBrandStyleList({
        page: 1,
        limit: 9999
      })
      this.materialBrandStyleList = res.data.items
    },
    // 门店类型
    async getstoreTypeList() {
      const res = await storeTypeList({
        storeName: '',
        pid: '',
        sort: '',
        order: '',
        page: 1,
        limit: 9999
      })
      this.storeTypeList = res.data.items
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑门店' : '添加门店'
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.initList()
      if (params.id) {
        this.getInfo(params.id)
      } else {
        this.$refs.formData && this.$refs.formData.resetFields()
      }
    },
    async getInfo(id) {
      const loading = this.$elLoading('加载中')
      try {
        const res = await brandRead({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          picUrl: res.data.picUrl || '',
          picUrls: res.data.picUrls || [],
          logoUrl: res.data.logoUrl || '',
          licenseUrl: res.data.licenseUrl || '',
          materialBrandStyleIdArr: (res.data.materialBrandStyleId && res.data.materialBrandStyleId.split(',')) || []
        })
        res.data.regionCode && this.setRegion_arr(res.data.regionCode)
        this.$nextTick(() => { // 之所以用nextTick，是因为要validate且region_arr是个数组（对象），element内部有处理
          this.$refs.formData && this.$refs.formData.validate()
        })
      } finally {
        loading.close()
      }
    },
    setRegion_arr(regionCode) {
      const regionItem = XeUtils.findTree(this.common_regionList, (item) => item.code === regionCode)
      if (regionItem && Array.isArray(regionItem.nodes)) {
        this.formData.region_arr = regionItem.nodes.map((v) => v.code)
      }
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const { region_arr, picUrls, materialBrandStyleIdArr, ...opts } = this.formData
        const params = {
          ...opts,
          regionCode: region_arr[region_arr.length - 1],
          picUrls: picUrls.map((pic) => (typeof pic === 'string' ? pic : pic.resData)),
          materialBrandStyleId: materialBrandStyleIdArr.join(',')
        }
        this.formData.id ? await brandUpdate(params) : await brandCreate(params)
        loading.close()
        this.$elMessage(`${this.formData.id ? '编辑' : '添加'}成功!`)
        this.$emit('success')
        this.visible = false
      } catch (e) {
        loading.close()
      } finally {
        loading.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-button--primary {
    color: #FFFFFF!important;
    background-color: #1890ff!important;
    border-color: #1890ff!important;
}
</style>
