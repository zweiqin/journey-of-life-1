<template>
  <div class="my-upload-wrap" :class="{'my-upload-wrap-active': activeClass}">
    <el-upload
      ref="myUpload"
      class="my-upload"
      :accept="accept"
      :action="uploadPath"
      :list-type="listType"
      :limit="limit"
      :multiple="multiple"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      :on-remove="onRemove"
      :on-error="onError"
      :before-remove="beforeRemove"
      :disabled="disabled"
      :headers="headers"
      :show-file-list="showFileList"
      :class="{'disabled-upload':isUpload , 'is-disabled':disabled }"
    >
      <el-button
        v-if="['fileList'].includes(listType)"
        size="mini"
        type="primary"
      >{{ uploadBtnText }}</el-button>
      <i v-if="!['fileList'].includes(listType)" slot="default" class="el-icon-plus"></i>
      <div
        v-if="!['fileList'].includes(listType)"
        slot="file"
        slot-scope="{file}"
        class="file-wrap"
      >
        <img class="el-upload-list__item-thumbnail upload-img" :src="file.url" alt />

        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <!-- <span v-if="isDownload" class="el-upload-list__item-delete" @click="handleDownload(file)">
            <i class="el-icon-download"></i>
          </span> -->
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
        <div v-if="file.status === 'uploading'" class="my-loading">
          <MyLoading :width="width" :height="height" />
        </div>
      </div>

    </el-upload>
    <div v-if="showTipsMessage && !disabled" class="tipsMessage">图片最大支持20MB</div>
    <el-image-viewer v-if="dialogVisible" :zIndex="3000" :on-close="closeViewer" :url-list="[dialogImageUrl]" />
  </div>
</template>

<script>
// import { downPic } from '@/api/order-module/order-manage'
import { exportExcel } from '@/utils/index'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import MyLoading from './MyLoading'
import { getToken } from '@/utils/auth'
import { createStorage, uploadPath } from '@/api/business/storage'

export default {
  name: 'MyUpload',
  components: { ElImageViewer, MyLoading },
  model: {
    prop: 'fileUrl',
    event: 'change'
  },
  props: {
    // 宽
    width: {
      type: [String, Number],
      default: 146
    },
    // 高
    height: {
      type: [String, Number],
      default: 146
    },
    // 限制文件类型（上传窗口）
    accept: {
      type: String,
      default: 'image/*'
    },
    // 上传数量
    limit: {
      type: Number,
      default: 1
    },
    // 是否开启多选文件
    multiple: {
      type: Boolean,
      default: false
    },
    // 限制图片上传大小, 默认20m
    fileSize: {
      type: Number,
      default: 20 * 1024
    },
    // 双向数据绑定的图片url, string 则默认为一个(limit也要设置为1), Array默认为多个
    fileUrl: {
      type: [String, Array],
      default: ''
    },
    // true: 不能上传   false: 可以上传
    disabled: {
      type: Boolean,
      default: false
    },
    // 默认可以下载
    isDownload: {
      type: Boolean,
      default: true
    },
    // 限制上传文件的格式
    fileType: {
      type: Array,
      default: () => ['image/jpeg', 'image/jpg', 'image/png']
    },
    // 限制图片宽度
    limitWidth: {
      type: Number,
      default: null
    },
    // 限制图片高度
    limitHeight: {
      type: Number,
      default: null
    },
    // 文件列表的类型
    listType: {
      type: String,
      default: 'picture-card'
    },
    // 上传按钮的文案内容
    uploadBtnText: {
      type: String,
      default: '点击上传'
    },
    // 是否开启删除文件前的弹窗
    isBeforeRemove: {
      type: Boolean,
      default: false
    },
    // 是否显示已上传文件列表
    showFileList: {
      type: Boolean,
      default: true
    },
    activeClass: {
      type: Boolean,
      default: false
    },
    showTipsMessage: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      uploadPath, // 上传的路径
      // 设置请求头部
      headers: {
        'X-Dts-Admin-Token': getToken()
      },
      dialogImageUrl: '', // 预览图片
      dialogVisible: false, // 预览状态
      fileList: [], // 上传图片列表
      isUpload: false // 隐藏上传按钮图标
    }
  },
  watch: {
    fileUrl: {
      handler(value) {
        // debugger
        if (typeof value === 'string') {
          // 防止重新赋值造成样式布局冲突
          if ((this.fileList[0] && this.fileList[0].url) === value) return
          if (!value) {
            this.fileList = []
          } else {
            this.fileList = [
              {
                uid: value,
                url: value
              }
            ]
          }
        } else {
          if (value.length > 0) {
            this.fileList = value.map((item, i) => {
              if (typeof item === 'string') {
                return {
                  uid: item,
                  url: item,
                  name: item,
                  resData: item
                }
              }
              return {
                uid: item.uid || item.url + i || '',
                url: item.url || '',
                name: item.name || item.url || '',
                resData: item.resData || null
              }
            })
          } else {
            this.fileList = []
          }
        }

        this.isUpload = this.fileList.length >= this.limit
      },
      immediate: true
    }
  },
  methods: {
    // 删除文件之前的钩子
    beforeRemove(file, fileList) {
      if (this.isBeforeRemove) {
        return this.$confirm(`请确认是否删除文件`, '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
      }
    },
    // 上传失败
    onError(err, file, fileList) {
      console.log(err, file, fileList, '---------error')
    },
    // 操控是否显示隐藏
    handleIsUpload() {
      this.isUpload = this.fileList.length >= this.limit
    },
    // 文件列表移除文件时的钩子
    onRemove(file, fileList) {
      let url
      if (typeof this.fileUrl === 'string') {
        url = ''
      } else {
        url = this.fileList.filter((v) => v.uid !== file.uid)
      }

      this.$emit('change', url)
      this.handleIsUpload()
    },
    // 上传图片之前
    beforeUpload(file) {
      this.isUpload = this.fileList.length + 1 >= this.limit
      const isLt10M =
        this.fileSize > 0 ? file.size / 1024 < this.fileSize : true

      if (this.fileType.length > 0 && !this.fileType.includes(file.type)) {
        this.$message.warning(
          `只允许使用以下文件扩展名的文件：${this.fileType
            .join('，')
            .replace(/image\//g, '')}`
        )
        return false
      }

      if (!isLt10M) {
        const text =
          this.fileSize >= 1024
            ? (this.fileSize / 1024).toFixed(2) + 'MB'
            : this.fileSize + 'KB'
        this.$message.warning(`上传的大小不能超过 ${text}!`)
        return false
      }

      if (this.limitWidth || this.limitHeight) {
        return this.imageHighLimitWidth(file)
      }
    },
    // 限制图片宽高
    imageHighLimitWidth(file) {
      if (file) {
        return new Promise((resolve, reject) => {
          const fr = new FileReader()
          const _this = this

          fr.readAsDataURL(file)
          fr.onload = (e) => {
            const image = new Image()
            image.src = e.target.result

            image.onload = () => {
              const w = image.width
              const h = image.height

              if (_this.limitWidth && _this.limitWidth !== w) {
                _this.$message.warning(`图片尺寸为${w}*${h},不符合格式要求`)
                reject()
              } else if (_this.limitHeight && _this.limitHeight !== h) {
                _this.$message.warning(`图片尺寸为${w}*${h},不符合格式要求`)
                reject()
              } else {
                resolve()
              }
            }
          }
        })
      }
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      console.log('fileList', fileList)
      const newFileList = fileList.filter((item) => {
        if (item.response) {
          if (item.response.errno === 0) {
            item.resData = item.response.data.url
            return item
          } else {
            this.$message.error(item.response.errmsg || '上传失败')
          }
        } else if (!item.response) {
          return item
        }
      })

      let url
      if (typeof this.fileUrl === 'string') {
        url = newFileList[0].resData
      } else {
        url = newFileList
      }
      this.handleIsUpload()
      this.$emit('change', url)
      this.$emit('onSuccess', url)
    },
    // 文件超出个数限制时的钩子
    handleExceed() {
      this.handleIsUpload()
      this.$message.warning(`只能上传${this.limit}个文件!`)
    },
    // 移除图片
    handleRemove(file) {
      if (file.status !== 'success') {
        this.$message.warning('正在上传,请稍等在操作')
        return
      }
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid)
      let url

      if (typeof this.fileUrl === 'string') {
        url = ''
      } else {
        url = this.fileList
      }
      this.$emit('change', url)
    },
    // 打开预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 下载图片
    // async handleDownload(file) {
    //   const val = file.url
    //   const res = await downPic({ image_url: val })
    //   let name

    //   if (res.headers.hasOwnProperty('content-Disposition')) {
    //     const nameStr = res.headers['content-Disposition']
    //     name = nameStr.split('filename=')[1]
    //     if (name.includes('"')) {
    //       const a = name.split('"')
    //       name = a[1]
    //     }
    //   } else {
    //     name = 'image.' + val.split('.').reverse()[0].split('?')[0]
    //   }

    //   exportExcel(res.data, name)
    // },
    // 关闭预览
    closeViewer() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='scss' scoped>
.my-upload-wrap {
  display: inline-block;

  /deep/ .el-upload-list__item > div {
    width: 100%;
    height: 100%;
  }
  /deep/ .disabled-upload .el-upload.el-upload--picture-card {
    display: none;
  }
  /deep/ .is-disabled .el-upload.el-upload--picture-card {
    cursor: not-allowed;
  }
  /deep/ .el-upload-list__item {
    transition: none;
  }
  .file-wrap {
    position: relative;
    /deep/ .upload-img {
      object-fit: contain;
    }

    .my-loading {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}
.my-upload-wrap-active {
  width: 146px !important;
  height: 146px !important;
}
.tipsMessage {
  line-height: 1;
  font-size: 12px;
  color: #666;
}
</style>
