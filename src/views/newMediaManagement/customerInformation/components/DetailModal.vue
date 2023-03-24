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
      <el-form-item label="客户ID" prop="id">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        {{ formData.customerName || '--' }}
      </el-form-item>
      <el-form-item label="客户性别" prop="customerGender">
        <span v-if="formData.customerGender == 1">男</span>
        <span v-else-if="formData.customerGender == 2">女</span>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="客户手机号" prop="customerPhone">
        {{ formData.customerPhone || '--' }}
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        {{ formData.companyName || '--' }}
      </el-form-item>
      <el-form-item label="职位" prop="customerPosition">
        {{ formData.customerPosition || '--' }}
      </el-form-item>
      <el-form-item label="参会人数" prop="participantsNumber">
        {{ formData.participantsNumber || '--' }}
      </el-form-item>
      <el-form-item label="邀约人" prop="invite">
        {{ formData.invite || '--' }}
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        {{ formData.remarks || '--' }}
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
// import { getNewMaterialCityInfo } from '@/api/newMediaManagement/newMedia'

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
        customerName: '',
        customerGender: '',
        customerPhone: '',
        companyName: '',
        customerPosition: '',
        participantsNumber: '',
        invite: '',
        remarks: '',
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
        // this.getInfo(params.id)
      }
      this.visible = true
    },
    async getInfo(id) {
      const loading = this.$elLoading('加载中')
      try {
        const res = await getNewMaterialCityInfo({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          customerName: res.data.customerName || '',
          customerGender: res.data.customerGender || '',
          customerPhone: res.data.customerPhone || '',
          companyName: res.data.companyName || '',
          customerPosition: res.data.customerPosition || '',
          participantsNumber: res.data.participantsNumber || '',
          invite: res.data.invite || '',
          remarks: res.data.remarks || '',
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

