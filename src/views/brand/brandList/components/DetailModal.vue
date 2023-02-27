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
      <!-- 门店信息 -->
      <el-form-item label="公司名称" prop="name">
        {{ formData.name || '--' }}
      </el-form-item>
      <el-form-item label="店主名称" prop="keeperName">
        {{ formData.keeperName || '--' }}
      </el-form-item>
      <el-form-item label="简介" prop="desc">
        {{ formData.desc || '--' }}
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        {{ formData.phone || '--' }}
      </el-form-item>
      <el-form-item label="地址" prop="address">
        {{ formData.address || '--' }}
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        {{ formData.longitude || '--' }}
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        {{ formData.latitude || '--' }}
      </el-form-item>
      <el-form-item label="区域" prop="regionList">
        {{ formData.regionList || '--' }}
      </el-form-item>
      <el-form-item label="公司图片" prop="picUrl">
        <el-image v-if="formData.picUrl" :src="formData.picUrl" style="width:80px; height:80px" fit="cover" :preview-src-list="[ formData.picUrl ]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="Logo" prop="logoUrl">
        <el-image v-if="formData.logoUrl" :src="formData.logoUrl" style="width:80px; height:80px" fit="cover" :preview-src-list="[ formData.logoUrl ]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="店铺图片" prop="picUrls">
        <el-image v-for="item in formData.picUrls" :key="item" :src="item" style="width:80px; height:80px;margin-right:4px" fit="cover" :preview-src-list="picUrls" />
        <span v-if="!formData.picUrls || !formData.picUrls.length">--</span>
      </el-form-item>
      <el-form-item label="营业执照" prop="licenseUrl">
        <el-image v-if="formData.licenseUrl" :src="formData.licenseUrl" style="width:80px; height:80px" fit="cover" :preview-src-list="[ formData.licenseUrl ]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="开始营业时间" prop="startTime">
        {{ formData.startTime || '--' }}
      </el-form-item>
      <el-form-item label="结束营业时间" prop="endTime">
        {{ formData.endTime || '--' }}
      </el-form-item>
      <el-form-item label="入驻说明" prop="explain">
        {{ formData.explain || '--' }}
      </el-form-item>
      <el-form-item label="门店风格" prop="styleName">
        {{ formData.styleName || '--' }}
      </el-form-item>
      <el-form-item label="门店标签" prop="labelName">
        {{ formData.labelName || '--' }}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { brandRead } from '@/api/brand/brandList'

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '查看门店'
      },
      visible: false,
      formData: {
        id: '',
        picUrls: []
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

