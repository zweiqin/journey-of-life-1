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
      <el-form-item label="申请类型" prop="applicationType">
        <el-radio-group v-model="formData.applicationType">
          <el-radio :label="1">门店</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="formData.username" clearable placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" clearable placeholder="请输入密码" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { userupSaveAndSignin } from '@/api/userManagement/memberList'

export default {
  name: 'ShopApplyModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '门店申请'
      },
      visible: false,
      formData: {
        userId: '',
        applicationType: 1,
        username: '',
        password: '',
      },
      formRules: {
        applicationType: [
          { required: true, message: '请选择申请类型' },
        ],
        username: [
          { required: true, message: '请输入账号' },
          { min: 4, message: '不得少于4位', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码' },
          { min: 6, message: '不得少于6位', trigger: 'blur' },
        ],
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
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const res = await userupSaveAndSignin(this.formData)
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

