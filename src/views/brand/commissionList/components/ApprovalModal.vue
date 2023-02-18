<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="modalOptions"
  >
    <el-form
      ref="formData"
      :model="formData"
      :rules="formRules"
      size="mini"
      label-suffix=":"
      label-width="100px"
    >
      <el-form-item label="交易凭证" prop="voucherUrl">
        <MyUpload v-model="formData.voucherUrl" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">已放款</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MyUpload from '@/components/MyUpload'
import { commissionGrant } from '@/api/brand/commission'

export default {
  name: 'ApprovalModal',
  components: {
    MyUpload
  },
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '提现放款'
      },
      visible: false,
      formData: {
        id: '',
        voucherUrl: '',
      },
      formRules: {
      },
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const res = await commissionGrant(this.formData)
        loading.close()
        this.$elMessage()
        this.$emit('success', 'keepPage')
        this.visible = false
      } catch(e) {
        loading.close()
      }
    }
  }
}
</script>

