<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>新增信息公告</h3>
      <el-form ref="article" v-model="article" :rules="rules" label-width="150px">
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="article.type">
            <el-radio label="1">公告</el-radio>
            <el-radio label="0">通知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title" />
        </el-form-item>

        <el-form-item label="内容">
          <Tinymce v-model="article.content" has-menubar :width="580" :height="300"></Tinymce>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish">发布</el-button>
    </div>

  </div>
</template>

<script>
import { publishArticle } from '@/api/business/article'
import { createStorage, uploadPath } from '@/api/business/storage'
import Tinymce from '@/components/Tinymce'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

export default {
  name: 'NoticeCreate',
  components: { Tinymce },

  data() {
    return {
      uploadPath,
      article: { type: '1' },
      rules: {
        title: [ { required: true, message: '标题不能为空', trigger: 'blur' } ],
        content: [ { required: true, message: '信息内容不能为空', trigger: 'blur' } ]
      }
    }
  },
  computed: {
    headers() {
      return {
        'X-Dts-Admin-Token': getToken()
      }
    }
  },
  created() {
    this.init()
  },

  methods: {
    init() {
    },
    handleCancel() {
      this.$router.push({ path: '/promotion/noticeList' })
    },
    handlePublish() {
      publishArticle(this.article).then((response) => {
        this.$notify.success({
          title: '成功',
          message: '创建成功'
        })
        this.$router.push({ path: '/promotion/noticeList' })
      })
        .catch((response) => {
          MessageBox.alert('业务错误：' + response.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    }
  }
}
</script>

<style>
.el-card {
	margin-bottom: 10px;
}

.el-tag+.el-tag {
	margin-left: 10px;
}

.input-new-keyword {
	width: 90px;
	margin-left: 10px;
	vertical-align: bottom;
}

.avatar-uploader .el-upload {
	width: 145px;
	height: 145px;
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.avatar-uploader .el-upload:hover {
	border-color: #20a0ff;
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 120px;
	height: 120px;
	line-height: 120px;
	text-align: center;
}

.avatar {
	width: 145px;
	height: 145px;
	display: block;
}
</style>
