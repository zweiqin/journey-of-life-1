<template>
  <el-dialog :visible.sync="visible" v-bind="modalOptions">
    <el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="100px">
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入公告标题" maxlength="30" />
      </el-form-item>
      <el-form-item label="公告内容" prop="content">
        <div v-if="visible">
          <Tinymce v-model="formData.content" has-menubar :width="580" :height="300"></Tinymce>
        </div>
      </el-form-item>
      <el-form-item label="发布平台" prop="type">
        <el-select v-model="formData.type" size="mini" placeholder="请选择发布平台">
          <el-option label="商城" :value="1" />
          <el-option label="材料" :value="2" />
          <el-option label="社区" :value="3" />
          <el-option label="物流" :value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="formData.remarks" placeholder="请输入备注" maxlength="520" />
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Tinymce from '@/components/Tinymce'
// import MyUpload from '@/components/MyUpload'
import { saveAnnouncement, updateByIdAnnouncement } from '@/api/promotionManagement/announcementManagement'

export default {
  name: 'EditModal',
  components: {
    Tinymce
    // MyUpload
  },
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '820px',
        title: ''
      },
      visible: false,
      formData: {
        id: '',
        title: '',
        content: '',
        type: '',
        remarks: ''
      },
      formRules: {
        title: [
          { required: true, message: '请输入公告标题' },
          { max: 30, message: '30字以内' }
        ],
        content: [
          { required: true, message: '请输入公告内容' },
          { max: 520, message: '520字以内' }
        ],
        type: [
          { required: true, message: '请选择发布平台' }
        ],
        remarks: [
          { required: false, message: '请输入公告备注' },
          { max: 520, message: '520字以内' }
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
      this.modalOptions.title = params.id ? '编辑公告' : '添加公告'
      this.formData = Object.assign(this.$options.data().formData, params, {
        id: params.id || '',
        title: params.title || '',
        content: params.content || '',
        type: params.type || '',
        remarks: params.remarks || ''
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
        const res = this.formData.id ? await updateByIdAnnouncement(params) : await saveAnnouncement(params)
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

