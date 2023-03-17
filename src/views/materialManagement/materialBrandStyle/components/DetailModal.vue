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
      <!-- 门店材料风格信息 -->
      <el-form-item label="门店材料风格ID" prop="id">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="门店材料风格名称" prop="styleName">
        {{ formData.styleName || '--' }}
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        {{ formData.createTime || '--' }}
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        {{ formData.updateTime || '--' }}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getMaterialBrandStyleInfo } from '@/api/materialManagement/materialBrandStyle'

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '查看门店材料风格详情'
      },
      visible: false,
      formData: {
        id: '',
        styleName: '',
        createTime: '',
        updateTime: ''
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
        this.getInfo(params.id)
      }
      this.visible = true
    },
    async getInfo(id) {
      const loading = this.$elLoading('加载中')
      try {
        const res = await getMaterialBrandStyleInfo({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          styleName: res.data.styleName || '',
          createTime: res.data.createTime || '',
          updateTime: res.data.updateTime || ''
        })
      } finally {
        loading.close()
      }
    }
  }
}
</script>

