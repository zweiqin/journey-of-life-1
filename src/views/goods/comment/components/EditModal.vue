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
      <el-form-item label="评论内容" prop="content">
        <el-input
          v-model="formData.content"
          type="textarea"
          :rows="3"
          maxlength="250"
          show-word-limit
          placeholder="请输入评论内容"
        />
      </el-form-item>
      <el-form-item label="是否有图片" prop="hasPicture">
        <el-switch v-model="formData.hasPicture" />
      </el-form-item>
      <el-form-item v-if="formData.hasPicture" label="图片" prop="picUrls">
        <MyUpload v-model="formData.picUrls" :limit="3" multiple />
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
import { commentBrandReply } from '@/api/goods/goodsComment';
import { regInt } from '@/utils/reg'

export default {
  name: 'EditModal',
  components: {
    MyUpload
  },
  data() {
    return {
      modalOptions: {
        title: '',
        closeOnClickModal: false,
        width: '520px',
      },
      visible: false,
      formData: {
        pid: '',
        valueId: '',
        content: '',
        hasPicture: false,
        picUrls: [],
      },
      formRules: {
        content: [
          { required: true, message: '请输入评论内容' },
          { max: 520, message: '520字以内' },
        ],
        hasPicture: [
          { type: 'boolean', required: true, message: '请选择' },
        ],
        picUrls: [
          { type: 'array', required: true, message: '请上传图片' }
        ],
      },
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}, title) {
      this.formData = Object.assign(this.$options.data().formData, params)
      this.modalOptions.title = `添加${title}`
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const res = await commentBrandReply({
          ...this.formData,
          picUrls: Array.isArray(this.formData.picUrls) ? this.formData.picUrls.map(v => v.resData || v) : [],
        })
        loading.close()
        this.$elMessage('添加成功!')
        this.$emit('success')
        this.visible = false
      } catch(e) {
        loading.close()
      }
    }
  }
}
</script>

