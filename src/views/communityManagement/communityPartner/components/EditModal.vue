<template>
  <el-dialog :visible.sync="visible" v-bind="modalOptions">
    <el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="100px">
      <el-form-item label="审核不通过原因" prop="cause">
        <el-input v-model="formData.cause" type="textarea" placeholder="请输入审核不通过原因" maxlength="520" :rows="3" show-word-limit />
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { partnerStartAudit } from '@/api/communityManagement/communityMember'

export default {
  name: 'EditModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '审核不通过信息'
      },
      visible: false,
      formData: {
        id: '',
        status: 4,
        cause: ''
      },
      formRules: {
        cause: [
          { required: true, message: '请输入审核不通过原因' }
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
        id: params.id || ''
      })
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const res = await partnerStartAudit(this.formData)
        loading.close()
        this.$elMessage(`操作成功!`)
        this.$emit('success')
        this.visible = false
      } catch (e) {
        loading.close()
      }
    }
  }
}
</script>

