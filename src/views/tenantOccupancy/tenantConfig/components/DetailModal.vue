<!-- eslint-disable vue/eqeqeq -->
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
      label-width="160px"
    >
      <!-- 商品信息 -->
      <el-form-item label="ID">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="类型">
        {{ formData.type || '--' }}
      </el-form-item>
      <el-form-item label="微信小程序appid">
        {{ formData.json.wx.appId || '--' }}
      </el-form-item>
      <el-form-item label="微信小程序appSecret(密钥)">
        {{ formData.json.wx.appSecret || '--' }}
      </el-form-item>
      <el-form-item label="微信支付keyPath">
        {{ formData.json.wx.keyPath || '--' }}
      </el-form-item>
      <el-form-item label="微信支付商户id">
        {{ formData.json.wx.mchId || '--' }}
      </el-form-item>
      <el-form-item label="微信支付商户key">
        {{ formData.json.wx.mchKey || '--' }}
      </el-form-item>
      <el-form-item label="微信支付回调">
        {{ formData.json.wx.notifyUrl || '--' }}
      </el-form-item>
      <el-form-item label="微信公众号appSecret">
        {{ formData.json.wx.mpAppSecret || '--' }}
      </el-form-item>
      <el-form-item label="创建时间">
        {{ formData.createdTime || '--' }}
      </el-form-item>
      <el-form-item label="修改时间">
        {{ formData.updatedTime || '--' }}
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
        'createdTime': '',
        'id': 0,
        'json': {
          'wx': {
            'appId': '',
            'appSecret': '',
            'keyPath': '',
            'mchId': '',
            'mchKey': '',
            'notifyUrl': '',
            'mpAppSecret': ''
          }
        },
        'type': '',
        'updatedTime': ''
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

