<template>
  <el-dialog :visible.sync="visible" v-bind="modalOptions">
    <el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="150px">
      <el-form-item label="门店材料风格名称" prop="styleName">
        <el-input v-model="formData.styleName" maxlength="30" show-word-limit placeholder="请输入门店材料风格名称" />
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { materialBrandStyleSave, materialBrandStyleUpdateById } from '@/api/materialManagement/materialBrandStyle'

export default {
  name: 'EditModal',
  components: {},
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
        styleName: ''
      },
      formRules: {
        styleName: [
          { required: true, message: '请输入门店材料风格名称' },
          { max: 30, message: '30字以内' }
        ]
      }
    }
  },
  computed: {},
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑门店材料风格' : '添加门店材料风格'
      this.formData = Object.assign(this.$options.data().formData, params, {
        id: params.id || '',
        styleName: params.styleName || ''
      })
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const { ...opts } = this.formData
        const params = {
          ...opts
        }
        const res = this.formData.id ? await materialBrandStyleUpdateById(params) : await materialBrandStyleSave(params)
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

