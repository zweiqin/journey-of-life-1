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
      <!-- 学生信息 -->
      <el-form-item label="学生ID" prop="id">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="学生名称" prop="customerName">
        {{ formData.customerName || '--' }}
      </el-form-item>
      <el-form-item label="学生性别" prop="customerGender">
        <span v-if="formData.customerGender == 1">男</span>
        <span v-else-if="formData.customerGender == 2">女</span>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="学生手机号" prop="customerPhone">
        {{ formData.customerPhone || '--' }}
      </el-form-item>
      <el-form-item label="技能" prop="skill">
        {{ formData.skill || '--' }}
      </el-form-item>
      <el-form-item label="区域" prop="region">
        {{ formData.region || '--' }}
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
        title: '查看学生详情'
      },
      visible: false,
      formData: {
        id: '',
        customerName: '',
        customerGender: '',
        customerPhone: '',
        skill: '',
        region: '',
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
          customerGender: res.data.customerGender,
          customerPhone: res.data.customerPhone || '',
          skill: res.data.skill || '',
          region: res.data.region || '',
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

