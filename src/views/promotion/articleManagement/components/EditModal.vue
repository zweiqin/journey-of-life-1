<template>
  <el-dialog :visible.sync="visible" v-bind="modalOptions">
    <el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入文章标题" maxlength="30" />
      </el-form-item>
      <el-form-item label="文章作者" prop="author">
        <el-input v-model="formData.author" placeholder="请输入文章作者" maxlength="30" />
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <MyUpload v-model="formData.cover" />
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <el-input v-model="formData.content" placeholder="请输入文章内容" maxlength="520" />
      </el-form-item>
      <el-form-item label="发布平台" prop="type">
        <el-select v-model="formData.type" size="mini" placeholder="请选择发布平台" @change="handleTypeChange">
          <el-option v-for="item in typeList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="文章类型" prop="articleType">
        <el-select v-model="formData.articleType" placeholder="请选择文章类型" :disabled="isArticleTypeListRequest">
          <el-option v-for="item in articleTypeList" :key="item.code" :label="item.name" :value="item.code" />
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
import MyUpload from '@/components/MyUpload'
import { getArticleList, getArticleTypeList, saveArticleType, updateByIdArticleType } from '@/api/promotionManagement/articleManagement'

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
        title: '',
        author: '',
        cover: '',
        content: '',
        type: '',
        articleType: '',
        remarks: ''
      },
      formRules: {
        title: [
          { required: true, message: '请输入文章标题' },
          { max: 30, message: '30字以内' }
        ],
        author: [
          { required: true, message: '请输入文章作者' },
          { max: 30, message: '30字以内' }
        ],
        cover: [
          { required: true, message: '请上传文章封面' }
        ],
        content: [
          { required: true, message: '请输入文章内容' },
          { max: 520, message: '520字以内' }
        ],
        type: [
          { required: true, message: '请选择发布平台' }
        ],
        articleType: [
          { required: true, message: '请选择文章类型' }
        ],
        remarks: [
          { required: true, message: '请输入文章备注' },
          { max: 520, message: '520字以内' }
        ]
      },
      isArticleTypeListRequest: false,
      typeList: [],
      articleTypeList: []
    }
  },
  computed: {},
  created() { },
  methods: {
    handleClose() {
      this.visible = false
    },
    initList() {
      this.getTypeList()
    },
    // 发布平台列表
    async getTypeList() {
      const res = await getArticleList()
      this.typeList = res.data
    },
    async handleTypeChange() {
      this.formData.articleType = ''
      this.articleTypeList = []
      if (this.formData.type === '' || this.formData.type === undefined) return
      this.isArticleTypeListRequest = true
      const res = await getArticleTypeList({
        code: this.formData.type
      })
      this.isArticleTypeListRequest = false
      this.articleTypeList = res.data
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑文章' : '添加文章'
      this.formData = Object.assign(this.$options.data().formData, params, {
        id: params.id || '',
        title: params.title || '',
        content: params.content || '',
        type: params.type || '',
        remarks: params.remarks || ''
      })
      this.visible = true
      this.initList()
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
        const res = this.formData.id ? await updateByIdArticleType(params) : await saveArticleType(params)
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

