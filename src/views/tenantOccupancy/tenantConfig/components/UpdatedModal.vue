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
        {{ formData.id }}
        <!-- <el-input v-model="formData.id" placeholder="请输入ID" maxlength="30" /> -->
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="formData.type" placeholder="请输入类型" maxlength="30" />
      </el-form-item>
      <el-form-item label="微信小程序appid">
        <el-input v-model="formData.json.wx.appId" placeholder="请输入微信小程序appid" maxlength="50" />
      </el-form-item>
      <el-form-item label="微信小程序密钥">
        <el-input v-model="formData.json.wx.appSecret" placeholder="请输入微信小程序appSecret密钥" />
      </el-form-item>
      <el-form-item label="微信支付keyPath">
        <el-input v-model="formData.json.wx.keyPath" placeholder="请输入微信支付keyPath" />
      </el-form-item>
      <el-form-item label="微信支付商户id">
        <el-input v-model="formData.json.wx.mchId" placeholder="请输入微信支付商户id" />
      </el-form-item>
      <el-form-item label="微信支付商户key">
        <el-input v-model="formData.json.wx.mchKey" placeholder="请输入微信支付商户key" />
      </el-form-item>
      <el-form-item label="微信支付回调">
        <el-input v-model="formData.json.wx.notifyUrl" placeholder="请输入微信支付回调" />
      </el-form-item>
      <el-form-item label="微信公众号appID">
        <el-input v-model="formData.json.wx.mpAppId" placeholder="请输入微信公众号appID" maxlength="50" />
      </el-form-item>
      <el-form-item label="微信公众号appSecret">
        <el-input v-model="formData.json.wx.mpAppSecret" placeholder="请输入微信公众号appSecret" maxlength="50" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="visible = false">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updatedTenanConfig } from '@/api/tenantOccupancy/tenantConfig'
export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '添加租户配置'
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
            'mpAppId': '',
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
    },
    handleSubmit() {
      updatedTenanConfig(this.formData).then((res) => {
        this.visible = false
        // eslint-disable-next-line vue/require-explicit-emits
        this.$emit('success')
      })
    }
  }
}
</script>

