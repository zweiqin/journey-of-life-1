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
      <el-form-item label="退款金额" prop="refundMoney">
        <el-input
          v-model.trim="formData.refundMoney"
          placeholder="请输入退款金额"
        />
      </el-form-item>
    
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { orderRefund } from '@/api/orderManagement/order'
import { regFloat } from '@/utils/reg'

export default {
  name: 'RefundModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '退款'
      },
      visible: false,
      formData: {
        orderId: '',
        refundMoney: '',
      },
      formRules: {
        refundMoney: [
          { required: true, message: '请输入退款金额' },
          { pattern: regFloat,  message: '请输入大于0不超过两位小数的数字' }
        ],
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
        const res = await orderRefund(this.formData)
        loading.close()
        this.$elMessage()
        this.$emit('success')
        this.visible = false
      } catch(e) {
        loading.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
