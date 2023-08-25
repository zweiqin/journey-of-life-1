<template>
  <el-dialog v-bind="modalOptions" :visible.sync="visible">
    <el-form
      ref="formData" :model="formData" :rules="formRules" label-suffix="："
      label-width="100px"
    >
      <el-form-item label="是否通过" prop="statusType">
        <el-radio-group v-model="formData.statusType">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { customerFeedbackUpdateStatus } from '@/api/customerServiceSystem/suggestionsList'

export default {
  name: 'ExamineModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '审核建议'
      },
      visible: false,
      formData: {
        id: '',
        statusType: ''
      },
      formRules: {
        statusType: [ { required: true, message: '请选择是否通过', trigger: 'blur' } ]
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.formData = Object.assign(this.$options.data().formData, params, {
        id: params.id || '',
        statusType: params.statusType
      })
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    handleSubmit() {
      this.$refs.formData.validate(async (valid) => {
        if (valid) {
          const res = await customerFeedbackUpdateStatus(this.formData)
          this.$elMessage('操作成功！')
          this.$emit('success')
          this.visible = false
        } else {
          return false
        }
      })
    }
  }
}
</script>

