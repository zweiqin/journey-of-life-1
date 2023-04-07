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
      label-width="120px"
    >
      <el-form-item label="员工姓名" prop="name">
        <el-input
          v-model="formData.name"
          maxlength="30"
          show-word-limit
          placeholder="请输入员工姓名"
        />
      </el-form-item>
      <el-form-item label="员工电话" prop="phone">
        <el-input
          v-model="formData.phone"
          placeholder="请输入员工电话"
        />
      </el-form-item>
      <el-form-item label="员工地址" prop="address">
        <el-input
          v-model="formData.address"
          :autosize="{ minRows: 3, maxRows: 5 }"
          maxlength="100"
          show-word-limit
          placeholder="请输入员工地址"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentId">
        <el-select v-model="formData.departmentId" placeholder="请选择部门">
          <el-option
            v-for="item in departmentList"
            :key="item.id"
            :label="item.depName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="在职状态" prop="status">
        <el-select v-model="formData.status" placeholder="请选择在职状态">
          <el-option
            v-for="item in list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="登录账号" prop="adminAccount">
        <el-input
          v-model="formData.adminAccount"
          placeholder="请输入登录账号"
        />
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input
          v-model="formData.password"
          placeholder="请输入登录密码"
        />
      </el-form-item>
      <el-form-item label="身份证正面" prop="idcardProsUrl">
        <MyUpload v-model="formData.idcardProsUrl" />
      </el-form-item>
      <el-form-item label="身份证正面" prop="idcardConsUrl">
        <MyUpload v-model="formData.idcardConsUrl" />
      </el-form-item>
      <el-form-item label="社保号" prop="socialSecurityNum">
        <el-input
          v-model="formData.socialSecurityNum"
          placeholder="请输入社保号"
        />
      </el-form-item>
      <el-form-item label="商业保险单号" prop="businessInsuranceNum">
        <el-input
          v-model="formData.businessInsuranceNum"
          placeholder="请输入商业保险单号"
        />
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
import { staffCreate, staffUpdate, staffDetail } from '@/api/enterprise/staff'
// import { roleList } from '@/api/enterprise/role'
import { queryDepartmentList } from '@/api/enterprise/department'

export default {
  name: 'EditModal',
  components: {
    MyUpload
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
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
        superiorAdminId: '',
        adminId: '',
        name: '',
        phone: '',
        address: '',
        departmentId: '',
        status: '',
        idcardProsUrl: '',
        idcardConsUrl: '',
        socialSecurityNum: '',
        businessInsuranceNum: '',
        adminAccount: '',
        password: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入员工姓名' },
          { max: 30, message: '30字以内' }
        ],
        phone: [
          { required: true, message: '请输入员工电话' },
          { max: 30, message: '30字以内' }
        ],
        departmentId: [
          { required: true, message: '请选择部门' }
        ],
        status: [
          { required: true, message: '请选择在职状态' }
        ],
        adminAccount: [
          { required: true, message: '请输入登录账号' },
          { max: 20, message: '20字以内' }
        ],
        password: [
          { required: true, message: '请输入登录密码' },
          { max: 20, message: '20字以内' }
        ]
      },
      departmentList: [] // 角色列表
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.getDepartmentList()
      this.modalOptions.title = params.id ? '编辑员工' : '添加员工'
      this.visible = true
      if (params.id) {
        this.getInfo(params.id)
      } else {
        this.$refs.formData && this.$refs.formData.resetFields()
      }
    },
    async getInfo(id) {
      const res = await staffDetail({ id })
      this.formData = Object.assign(this.$options.data().formData, res.data, {
        id: res.data.id || '',
        superiorAdminId: res.data.superiorAdminId || '',
        adminId: res.data.adminId || '',
        name: res.data.name || '',
        phone: res.data.phone || '',
        address: res.data.address || '',
        departmentId: res.data.departmentId || '',
        status: res.data.status || '',
        idcardProsUrl: res.data.idcardProsUrl || '',
        idcardConsUrl: res.data.idcardConsUrl || '',
        socialSecurityNum: res.data.socialSecurityNum || '',
        businessInsuranceNum: res.data.businessInsuranceNum || '',
        adminAccount: res.data.adminAccount || '',
        password: res.data.password || ''
      })
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async getDepartmentList() {
      const res = await queryDepartmentList({
        page: 1,
        limit: 9999
      })
      this.departmentList = res.data.items
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const res = this.formData.id ? await staffUpdate(this.formData) : await staffCreate(this.formData)
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

