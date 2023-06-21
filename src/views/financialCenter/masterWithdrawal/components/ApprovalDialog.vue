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
      label-suffix="："
      label-width="120px"
    >
      <el-form-item label="提现申请单号" prop="orderNo">
        <span>{{ formData.orderNo }}</span>
      </el-form-item>
      <el-form-item label="提现渠道" prop="bankChannel">
        <el-radio-group v-model="formData.bankChannel">
          <el-radio :label="1">手动打款</el-radio>
          <el-radio :label="2">通联</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="handleClose">取消</el-button>
      <el-button type="primary" size="medium" @click="handleSubmit">通过审批</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { financeWithdrawApprove } from '@/api/financialCenter/withdrawalList'

export default {
  name: 'ApprovalDialog',
  components: { },
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '提现申请通过'
      },
      visible: false,
      formData: {
        orderNo: '',
        state: 1,
        bankChannel: ''
      },
      formRules: {
        orderNo: [
          { required: true, message: '缺少提现申请单号' }
        ],
        bankChannel: [
          { required: true, message: '请选择提现渠道' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.formData = Object.assign(this.$options.data().formData, {
        orderNo: params.orderNo
      })
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const res = await financeWithdrawApprove(this.formData)
        loading.close()
        this.$elMessage()
        this.$emit('success', 'keepPage')
        this.visible = false
      } catch (e) {
        loading.close()
      }
    }
  }
}
</script>

