<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="modalOptions"
  >
    <el-form
      ref="formData"
      :model="formData"
      size="mini"
      label-suffix=":"
      label-width="125px"
    >
      <!-- 文章信息 -->
      <el-form-item label="文章ID" prop="id">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="文章标题" prop="title">
        {{ formData.title || '--' }}
      </el-form-item>
      <el-form-item label="文章作者" prop="author">
        {{ formData.author || '--' }}
      </el-form-item>
      <el-form-item label="文章封面" prop="cover">
        <el-image v-if="formData.cover" :src="formData.cover" style="width:80px; height:80px" fit="cover" :preview-src-list="[ formData.cover ]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        {{ formData.content || '--' }}
      </el-form-item>
      <el-form-item label="文章状态" prop="status">
        <el-tag v-if="formData.status === 1" type="warning">草稿</el-tag>
        <el-tag v-else-if="formData.status === 2">已发布</el-tag>
        <el-tag v-else-if="formData.status === 3" type="success">已下架</el-tag>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="发布时间" prop="publishDate">
        {{ formData.publishDate || '--' }}
      </el-form-item>
      <el-form-item label="发布平台" prop="type">
        <el-tag v-if="formData.type === 1" type="warning">商城</el-tag>
        <el-tag v-else-if="formData.type === 2">材料</el-tag>
        <el-tag v-else-if="formData.type === 3" type="success">社区</el-tag>
        <el-tag v-else-if="formData.type === 4" type="danger">物流</el-tag>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="文章类型ID" prop="articleType">
        {{ formData.articleType || '--' }}
      </el-form-item>
      <el-form-item label="文章类型名称" prop="articleTypeName">
        {{ formData.articleTypeName || '--' }}
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        {{ formData.remarks || '--' }}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// import { xxx } from '@/api/promotionManagement/announcementManagement'

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '查看文章详情'
      },
      visible: false,
      formData: {
        id: '',
        title: '',
        author: '',
        cover: '',
        content: '',
        status: '',
        publishDate: '',
        type: '',
        articleType: '',
        articleTypeName: '',
        remarks: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.formData = Object.assign(this.$options.data().formData, params)
      if (params.id) {
        // this.getInfo(params.id)
      }
      this.visible = true
    },
    async getInfo(id) {
      const loading = this.$elLoading('加载中')
      try {
        const res = await xxx({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          title: res.data.title || '',
          author: res.data.author || '',
          cover: res.data.cover,
          content: res.data.content || '',
          status: res.data.status,
          publishDate: res.data.publishDate || '',
          type: res.data.type || '',
          articleType: res.data.articleType || '',
          articleTypeName: res.data.articleTypeName || '',
          remarks: res.data.remarks || ''
        })
      } finally {
        loading.close()
      }
    }
  }
}
</script>

