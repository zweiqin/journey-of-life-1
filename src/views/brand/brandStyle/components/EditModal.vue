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
      <el-form-item label="风格名称" prop="name">
        <el-input
          v-model="formData.name"
          maxlength="30"
          show-word-limit
          placeholder="请输入风格名称"
        />
      </el-form-item>
      <el-form-item label="图片" prop="picUrl">
        <MyUpload v-model="formData.picUrl" />
      </el-form-item>
    
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MyUpload from '@/components/MyUpload'
import { brandStyleCreate, brandStyleUpdate } from '@/api/brand/brandStyle';

export default {
  name: 'EditModal',
  components: {
    MyUpload
  },
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
        name: '',
        picUrl: '',
      },
      formRules: {
        name: [
          { required: true, message: '请输入风格名称' },
        ],
        picUrl: [
          { required: true, message: '请上传图片' },
        ]
      },
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑门店风格' : '添加门店风格'
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const res = this.formData.id ? await brandStyleUpdate(this.formData) : await brandStyleCreate(this.formData)
      this.$elMessage(`${this.formData.id ? '编辑' : '添加'}成功!`)
      this.$emit('success')
      this.visible = false
    }
  }
}
</script>

