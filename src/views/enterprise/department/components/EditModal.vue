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
      label-width="120px"
    >
      <el-form-item label="部门名称" prop="depName">
        <el-input
          v-model="formData.depName"
          maxlength="30"
          show-word-limit
          placeholder="请输入部门名称"
        />
      </el-form-item>
      <el-form-item label="部门说明" prop="depContent">
        <el-input
          v-model="formData.depContent"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
          maxlength="520"
          show-word-limit
          placeholder="请输入部门说明"
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
import { departmentInsertSelective, departmentUpdateByPrimaryKeySelective } from '@/api/enterprise/department'

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
        depName: '',
        depContent: ''
      },
      formRules: {
        depName: [
          { required: true, message: '请输部门名称' },
          { max: 30, message: '30字以内' }
        ],
        depContent: [
          { max: 520, message: '520字以内' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑部门' : '添加部门'
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const res = this.formData.id ? await departmentUpdateByPrimaryKeySelective(this.formData) : await departmentInsertSelective(this.formData)
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

