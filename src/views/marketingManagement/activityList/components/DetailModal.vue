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
      <!-- 客户信息 -->
      <el-form-item label="ID" prop="id">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="活动名称" prop="campaignsName">
        {{ formData.campaignsName || '--' }}
      </el-form-item>
      <el-form-item label="活动类型" prop="campaignsType">
        {{ formData.campaignsType || '--' }}
      </el-form-item>
      <el-form-item label="活动开始时间" prop="startDate">
        {{ formData.startDate || '--' }}
      </el-form-item>
      <el-form-item label="活动结束时间" prop="endDate">
        {{ formData.endDate || '--' }}
      </el-form-item>
      <el-form-item label="目标用户类型" prop="targetaudience">
        {{ formData.targetaudience || '--' }}
      </el-form-item>
      <el-form-item label="目标用户数量" prop="targetsize">
        {{ formData.targetsize || '--' }}
      </el-form-item>
      <el-form-item label="活动描述" prop="description">
        {{ formData.description || '--' }}
      </el-form-item>
      <el-form-item label="活动预算" prop="budget">
        {{ formData.budget || '--' }}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// import { activitySelectByPrimaryKey } from '@/api/marketingManagement/activityList'

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '查看客户详情'
      },
      visible: false,
      formData: {
        id: '',
        campaignsName: '',
        campaignsType: '',
        startDate: '',
        endDate: '',
        targetaudience: '',
        targetsize: '',
        description: '',
        budget: '',
        productId: '',
        status: '',
        delete: ''
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
        const res = await activitySelectByPrimaryKey({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          campaignsName: res.data.campaignsName || '',
          campaignsType: res.data.campaignsType || '',
          startDate: res.data.startDate || '',
          endDate: res.data.endDate || '',
          targetaudience: res.data.targetaudience || '',
          targetsize: res.data.targetsize || '',
          description: res.data.description || '',
          budget: res.data.budget || '',
          productId: res.data.productId || '',
          status: res.data.status || '',
          delete: res.data.delete || ''
        })
      } finally {
        loading.close()
      }
    }
  }
}
</script>

