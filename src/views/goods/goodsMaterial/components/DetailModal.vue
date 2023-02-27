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
      <!-- 材质信息 -->
      <el-form-item label="材质ID" prop="id">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="材质名称" prop="materialName">
        {{ formData.materialName || '--' }}
      </el-form-item>
      <el-form-item label="材质介绍" prop="materialIntroduce">
        {{ formData.materialIntroduce || '--' }}
      </el-form-item>
      <el-form-item label="材质备注" prop="materialRemarks">
        {{ formData.materialRemarks || '--' }}
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
import { getNewMaterialInfo } from '@/api/goods/goodsMaterial'

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '查看材质详情'
      },
      visible: false,
      formData: {
        id: '',
        materialName: '',
        materialIntroduce: '',
        materialRemarks: '',
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
        const res = await getNewMaterialInfo({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          materialName: res.data.materialName || '',
          materialIntroduce: res.data.materialIntroduce || '',
          materialRemarks: res.data.materialRemarks || '',
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

