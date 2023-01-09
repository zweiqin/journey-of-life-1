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
      <el-form-item label="关键字" prop="keyword">
        <el-input
          v-model="formData.keyword"
          maxlength="100"
          show-word-limit
          placeholder="请输入关键字"
        />
      </el-form-item>
      <el-form-item label="跳转链接" prop="url">
        <el-input
          v-model="formData.url"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
          placeholder="请输入跳转链接"
        />
      </el-form-item>
      <el-form-item label="是否推荐" prop="isHot">
        <el-switch v-model="formData.isHot" />
      </el-form-item>
      <el-form-item label="是否默认" prop="isDefault">
        <el-switch v-model="formData.isDefault" />
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  keywordCreate,
  keywordUpdate,
} from '@/api/goods/keyword';

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
        keyword: '',
        url: '',
        isHot: false,
        isDefault: false,
      },
      formRules: {
        keyword: [
          { required: true, message: '请输入关键字' },
          { max: 100, message: '100字以内' },
        ],
      },
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑关键字' : '添加关键字'
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const res = this.formData.id ? await keywordUpdate(this.formData) : await keywordCreate(this.formData)
        loading.close()
        this.$elMessage(`${this.formData.id ? '编辑' : '添加'}成功!`)
        this.$emit('success')
        this.visible = false
      } catch(e) {
        loading.close()
      }
    }
  }
}
</script>

