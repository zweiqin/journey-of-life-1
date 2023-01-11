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
      <el-form-item label="实付金额" prop="actualPrice">
        <el-input
          v-model.trim="formData.actualPrice"
          placeholder="请输入实付金额"
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
import { orderChangePrice } from '@/api/orderManagement/order'
import { regMoney } from '@/utils/reg'

export default {
  name: 'ChangePriceModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '改价'
      },
      visible: false,
      formData: {
        orderId: '',
        actualPrice: '',
      },
      formRules: {
        actualPrice: [
          { required: true, message: '请输入实付金额' },
          { pattern: regMoney,  message: '金额有误' }
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
        const res = await orderChangePrice(this.formData)
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
