<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="modalOptions"
  >
    <el-form
      ref="formData"
      :model="formData"
      :rules="formRules"
      size="mini"
      label-suffix=":"
      label-width="100px"
    >
      <el-form-item label="公司名称（代理商名称）" prop="agentName">
        <el-input
          v-model="formData.agentName"
          maxlength="30"
          show-word-limit
          placeholder="请输入公司名称（代理商名称）"
        />
      </el-form-item>
      <el-form-item label="代理商区域编码" prop="agentCode">
        <el-input
          v-model="formData.agentCode"
          placeholder="请输入代理商区域编码"
        />
      </el-form-item>
      <el-form-item label="公司地址" prop="companyAddress">
        <el-input v-model="formData.companyAddress" placeholder="请输入公司地址" maxlength="30" />
      </el-form-item>
      <el-form-item label="营业执照" prop="businessLicense">
        <MyUpload v-model="formData.businessLicense" />
      </el-form-item>
      <el-form-item label="法人名称" prop="legalPerson">
        <el-input v-model="formData.legalPerson" placeholder="请输入法人名称" maxlength="30" />
      </el-form-item>
      <el-form-item label="法人联系方式" prop="legalP">
        <el-input v-model="formData.legalP" placeholder="请输入法人联系方式" maxlength="30" />
      </el-form-item>
      <el-form-item label="身份证正面" prop="idcardProsUrl">
        <MyUpload v-model="formData.idcardProsUrl" />
      </el-form-item>
      <el-form-item label="身份证反面" prop="idcardConsUrl">
        <MyUpload v-model="formData.idcardConsUrl" />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="formData.remarks" type="textarea" placeholder="请输入备注" maxlength="520" :rows="3" show-word-limit />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MyUpload from '@/components/MyUpload'
import { updaetRegionAgent, getRegionAgentInfo } from '@/api/regionalAgent/regionalAgentList'

export default {
  name: 'EditModal',
  components: {
    MyUpload
  },
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: ''
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
      },
      formRules: {
        agentName: [
          { required: true, message: '请输入公司名称（代理商名称）' },
          { max: 30, message: '30字以内' }
        ],
        agentCode: [
          { required: true, message: '请输入代理商区域编码' }
        ],
        companyAddress: [
          { required: true, message: '请输入公司地址' },
          { max: 30, message: '30字以内' }
        ],
        businessLicense: [
          { required: true, message: '请上传营业执照' }
        ],
        legalPerson: [
          { required: true, message: '请输入法人名称' },
          { max: 30, message: '30字以内' }
        ],
        legalP: [
          { required: true, message: '请输入法人联系方式' },
          { max: 30, message: '30字以内' }
        ],
        idcardProsUrl: [
          { required: true, message: '请上传身份证正面' }
        ],
        idcardConsUrl: [
          { required: true, message: '请上传身份证反面' }
        ],
        remarks: [
          { required: false, message: '请输入备注' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑代理商' : '添加代理商'
      this.visible = true
      if (params.id) {
        this.getInfo(params.id)
      } else {
        this.$refs.formData && this.$refs.formData.resetFields()
      }
    },
    async getInfo(id) {
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
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const res = this.formData.id ? await updaetRegionAgent(this.formData) : await updaetRegionAgent(this.formData)
        loading.close()
        this.$elMessage(`${this.formData.id ? '编辑' : '添加'}成功!`)
        this.$emit('success')
        this.visible = false
      } catch (e) {
        loading.close()
      }
    }
  }
}
</script>

