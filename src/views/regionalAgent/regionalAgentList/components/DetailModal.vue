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
      <!-- 代理商信息 -->
      <el-form-item label="ID" prop="id">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        {{ formData.userId || '--' }}
      </el-form-item>
      <el-form-item label="公司名称（代理商名称）" prop="agentName">
        {{ formData.agentName || '--' }}
      </el-form-item>
      <el-form-item label="代理商区域编码" prop="agentCode">
        {{ formData.agentCode || '--' }}
      </el-form-item>
      <el-form-item label="公司地址" prop="companyAddress">
        {{ formData.companyAddress || '--' }}
      </el-form-item>
      <el-form-item label="商品图片" prop="businessLicense">
        <el-image v-if="formData.businessLicense" :src="formData.businessLicense" style="width:80px; height:80px" fit="cover" :preview-src-list="[ formData.businessLicense ]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="法人名称" prop="legalPerson">
        {{ formData.legalPerson || '--' }}
      </el-form-item>
      <el-form-item label="公司地址" prop="legalP">
        {{ formData.legalP || '--' }}
      </el-form-item>
      <el-form-item label="法人联系方式" prop="companyAddress">
        {{ formData.companyAddress || '--' }}
      </el-form-item>
      <el-form-item label="身份证正面" prop="idcardProsUrl">
        <el-image v-if="formData.idcardProsUrl" :src="formData.idcardProsUrl" style="width:80px; height:80px" fit="cover" :preview-src-list="[ formData.idcardProsUrl ]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="身份证反面" prop="idcardConsUrl">
        <el-image v-if="formData.idcardConsUrl" :src="formData.idcardConsUrl" style="width:80px; height:80px" fit="cover" :preview-src-list="[ formData.idcardConsUrl ]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <span v-if="formData.status === 1">已提交申请</span>
        <span v-else-if="formData.status === 2">正在审核中</span>
        <span v-else-if="formData.status === 3">已审核通过</span>
        <span v-else-if="formData.status === 4">已审核不通过</span>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        {{ formData.remarks || '--' }}
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        {{ formData.createTime || '--' }}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getRegionAgentInfo } from '@/api/regionalAgent/regionalAgentList'

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '查看代理商详情'
      },
      visible: false,
      formData: {
        id: '',
        userId: '',
        agentName: '',
        agentCode: '',
        companyAddress: '',
        businessLicense: '',
        legalPerson: '',
        legalP: '',
        idcardProsUrl: '',
        idcardConsUrl: '',
        status: 2,
        remarks: '',
        isDelete: false,
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
        const res = await getRegionAgentInfo({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          userId: res.data.userId || '',
          agentName: res.data.agentName || '',
          agentCode: res.data.agentCode || '',
          companyAddress: res.data.companyAddress || '',
          businessLicense: res.data.businessLicense || '',
          legalPerson: res.data.legalPerson || '',
          legalP: res.data.legalP || '',
          idcardProsUrl: res.data.idcardProsUrl || '',
          idcardConsUrl: res.data.idcardConsUrl || '',
          status: res.data.status || '',
          remarks: res.data.remarks || '',
          isDelete: res.data.isDelete || '',
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

