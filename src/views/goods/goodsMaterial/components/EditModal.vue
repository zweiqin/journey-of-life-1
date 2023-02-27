<template>
  <el-dialog :visible.sync="visible" v-bind="modalOptions">
    <el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="100px">
      <el-form-item label="材质名称" prop="materialName">
        <el-input v-model="formData.materialName" maxlength="30" show-word-limit placeholder="请输入材质名称" />
      </el-form-item>
      <el-form-item label="材质介绍" prop="materialIntroduce">
        <el-input v-model="formData.materialIntroduce" type="textarea" placeholder="请输入材质介绍" maxlength="520" :rows="3" show-word-limit />
      </el-form-item>
      <el-form-item label="材质备注" prop="materialRemarks">
        <el-input v-model="formData.materialRemarks" type="textarea" placeholder="请输入材质备注" maxlength="520" :rows="3" show-word-limit />
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { newmaterialSave, newmaterialUpdateById } from '@/api/goods/goodsMaterial'

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
        materialName: '',
        materialIntroduce: '',
        materialRemarks: ''
      },
      formRules: {
        materialName: [
          { required: true, message: '请输入材质名称' },
          { max: 30, message: '30字以内' }
        ],
        materialIntroduce: [
          { required: true, message: '请输入材质介绍' }
        ],
        materialRemarks: [
          { required: true, message: '请输入材质备注' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑商品材质' : '添加商品材质'
      this.formData = Object.assign(this.$options.data().formData, params, {
        id: params.id || '',
        materialName: params.materialName || '',
        materialIntroduce: params.materialIntroduce || '',
        materialRemarks: params.materialRemarks || ''
      })
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const res = this.formData.id ? await newmaterialUpdateById(this.formData) : await newmaterialSave(this.formData)
        loading.close()
        this.$elMessage(`${this.formData.id ? '编辑' : '添加'}成功!`)
        this.$emit('success')
        this.visible = false
      } catch (e) {
        loading.close()
      }
    }
  }
}
</script>

