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
      <el-form-item label="ID" prop="name">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="商户名称" prop="vipPrice">
        {{ formData.username || '--' }}
      </el-form-item>
      <el-form-item label="账户所属会员id" prop="retailPrice">
        {{ formData.userId || '--' }}
      </el-form-item>
      <el-form-item label="商品图片" prop="picUrl">
        <el-image v-if="formData.picUrl" :src="formData.picUrl" style="width:80px; height:80px" fit="cover" :preview-src-list="[ formData.picUrl ]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="头像图片" prop="gallery">
        <div v-if="formData.avatar">
          <el-image v-for="(item, index) in formData.gallery" :key="index" :src="item" style="width:80px; height:80px; margin-right: 10px;" fit="cover" :preview-src-list="[ formData.picUrl ]" />
        </div>
        <span v-else>--</span>
      </el-form-item>
      <!-- <el-form-item label="产品标签" prop="productTag">
        <span v-if="formData.productTag === 0">常规</span>
        <span v-else-if="formData.productTag === 1">热卖</span>
        <span v-else-if="formData.productTag === 2">爆款</span>
        <span v-else-if="formData.productTag === 3">新品</span>
        <span v-else-if="formData.productTag === 4">原创</span>
        <span v-else>--</span>
        </el-form-item> -->
      <el-form-item label="用户描述" prop="categoryName">
        {{ formData.desc || '--' }}
      </el-form-item>
      <el-form-item label="联系电话" prop="unit">
        {{ formData.tel || '--' }}
      </el-form-item>
      <el-form-item label="邮箱地址" prop="brief">
        {{ formData.mail || '--' }}
      </el-form-item>
      <el-form-item label="租户号" prop="keywords">
        {{ formData.tenantId || '--' }}
      </el-form-item>
      <el-form-item label="是否为租户号" prop="isOnSale">
        <span v-if="formData.isTenantAccount == 1">是</span>
        <span v-else>否</span>
      </el-form-item>
      <el-form-item label="账号状态" prop="supportVoucher">
        <span v-if="formData.status == 0">审核中</span>
        <span v-else>正常</span>
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
        'addTime': '',
        'avatar': '',
        'desc': '',
        'id': 0,
        'isTenantAccount': '',
        'lastLoginIp': '',
        'lastLoginTime': '',
        'mail': '',
        'password': '',
        'roleIds': '',
        'status': '',
        'tel': '',
        'tenantId': 0,
        'updateTime': '',
        'userId': 0,
        'username': ''
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) { // !这是重点注释
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
    }
  }
}
</script>

