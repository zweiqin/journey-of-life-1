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
      label-width="120px"
    >
      <!-- 公告信息 -->
      <el-form-item label="公告ID" prop="id">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="公告标题" prop="title">
        {{ formData.title || '--' }}
      </el-form-item>
      <el-form-item label="公告内容" prop="content">
        {{ formData.content || '--' }}
      </el-form-item>
      <el-form-item label="公告状态" prop="status">
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
        title: '查看公告详情'
      },
      visible: false,
      formData: {
        id: '',
        title: '',
        content: '',
        status: '',
        publishDate: '',
        type: '',
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
          content: res.data.content || '',
          status: res.data.status,
          publishDate: res.data.publishDate || '',
          type: res.data.type,
          remarks: res.data.remarks || ''
        })
      } finally {
        loading.close()
      }
    }
  }
}
</script>

