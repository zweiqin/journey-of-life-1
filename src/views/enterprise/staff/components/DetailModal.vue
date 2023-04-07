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
      <!-- 员工信息 -->
      <el-form-item label="员工ID" prop="id">
        <!-- 单独员工表里的员工的id -->
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="系统adminId" prop="adminId">
        <!-- 系统（所有人）人员表里的这个员工的id -->
        {{ formData.adminId || '--' }}
      </el-form-item>
      <el-form-item label="所属部门名称" prop="departmentName">
        {{ formData.departmentName || '--' }}
      </el-form-item>
      <el-form-item label="员工姓名" prop="name">
        {{ formData.name || '--' }}
      </el-form-item>
      <el-form-item label="员工电话" prop="phone">
        {{ formData.phone || '--' }}
      </el-form-item>
      <el-form-item label="员工地址" prop="address">
        {{ formData.address || '--' }}
      </el-form-item>
      <el-form-item label="员工账号" prop="adminAccount">
        {{ formData.adminAccount || '--' }}
      </el-form-item>
      <el-form-item label="在职状态" prop="status">
        <span v-if="formData.status == -1">离职</span>
        <span v-else-if="formData.status == 0">全职在职</span>
        <span v-else-if="formData.status == 1">兼职在职</span>
        <span v-else-if="formData.status == 2">其他</span>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="身份证正面" prop="idcardProsUrl">
        <el-image v-if="formData.idcardProsUrl" :src="formData.idcardProsUrl" style="width:80px; height:80px" fit="cover" :preview-src-list="[ formData.idcardProsUrl ]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="身份证反面" prop="idcardConsUrl">
        <el-image v-if="formData.idcardConsUrl" :src="formData.idcardConsUrl" style="width:80px; height:80px" fit="cover" :preview-src-list="[ formData.idcardConsUrl ]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="社保号" prop="socialSecurityNum">
        {{ formData.socialSecurityNum || '--' }}
      </el-form-item>
      <el-form-item label="商业保险单号" prop="businessInsuranceNum">
        {{ formData.businessInsuranceNum || '--' }}
      </el-form-item>
      <el-form-item label="创建时间" prop="addTime">
        {{ formData.addTime || '--' }}
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        {{ formData.updateTime || '--' }}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { staffDetail } from '@/api/enterprise/staff'

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '查看员工详情'
      },
      visible: false,
      formData: {
        id: '',
        adminId: '',
        departmentName: '',
        name: '',
        phone: '',
        address: '',
        adminAccount: '',
        status: '',
        idcardProsUrl: '',
        idcardConsUrl: '',
        socialSecurityNum: '',
        businessInsuranceNum: '',
        addTime: '',
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
        const res = await staffDetail({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          adminId: res.data.adminId || '',
          departmentName: res.data.departmentName || '',
          name: res.data.name || '',
          phone: res.data.phone || '',
          address: res.data.address || '',
          adminAccount: res.data.adminAccount || '',
          status: String(res.data.status) || '',
          idcardProsUrl: res.data.idcardProsUrl || '',
          idcardConsUrl: res.data.idcardConsUrl || '',
          socialSecurityNum: res.data.socialSecurityNum || '',
          businessInsuranceNum: res.data.businessInsuranceNum || '',
          addTime: res.data.addTime || '',
          updateTime: res.data.updateTime || ''
        })
      } finally {
        loading.close()
      }
    }
  }
}
</script>

