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
      <el-form-item label="客户名称" prop="userName">
        <el-input v-model.trim="formData.userName" clearable placeholder="请输入客户名称" />
      </el-form-item>
      <el-form-item label="客户性别" prop="userGender">
        <el-select v-model="formData.userGender" size="mini" placeholder="请选择客户性别">
          <el-option label="未知" value="0" />
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="客户电话" prop="userTel">
        <el-input v-model.trim="formData.userTel" clearable placeholder="请输入客户电话" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { messagesentrySaveMsgSentry } from '@/api/businessManagement/informationSentry'

export default {
  name: 'AddSalesmanModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '添加客户'
      },
      visible: false,
      formData: {
        userName: '',
        userGender: '0',
        userTel: ''
      },
      formRules: {
        userName: [
          { required: true, message: '请输入客户名称' }
        ],
        userGender: [
          { required: true, message: '请选择客户性别' }
        ],
        userTel: [
          { required: true, message: '请输入客户电话' }
        ]
      },
      parentParams: {}
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.parentParams = { ...params }
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    handleSubmit() {
      this.$refs.formData.validate(async (valid) => {
        if (valid) {
          const res = await messagesentrySaveMsgSentry(this.formData)
          this.$elMessage('添加成功!')
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

