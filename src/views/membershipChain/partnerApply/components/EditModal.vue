<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="modalOptions"
  >
    <el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-width="100px">
      <el-form-item label="标签值" prop="value">
        <el-input
          v-model="formData.value"
          maxlength="30"
          show-word-limit
          placeholder="请输入标签值"
        />
      </el-form-item>
      <el-form-item label="排序" prop="sortOrder">
        <el-input
          v-model="formData.sortOrder"
          placeholder="请输入排序"
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
import { goodsTagCreate, goodsTagUpdate } from '@/api/goods/goodsTag';
import { regInt } from '@/utils/reg'

export default {
  name: 'EditModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: ''
      },
      visible: false,
      formData: {
        id: '',
        value: '',
        sortOrder: '100',
      },
      formRules: {
        value: [
          { required: true, message: '请输入标签值' },
          { max: 30, message: '30字以内' },
        ],
        sortOrder: [
          { required: true, message: '请输入排序' },
          { pattern: regInt,  message: '请输入正整数' }
        ]
      },
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑大类标签' : '添加大类标签'
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const res = this.formData.id ? await goodsTagUpdate(this.formData) : await goodsTagCreate(this.formData)
      this.$elMessage(`${this.formData.id ? '编辑' : '添加'}成功!`)
      this.$emit('success')
      this.visible = false
    }
  }
}
</script>

