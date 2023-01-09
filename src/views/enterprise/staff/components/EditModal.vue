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
      <el-form-item label="部门" prop="roleId">
        <el-select v-model="formData.roleId" placeholder="请选择部门">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
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
import { roleList } from '@/api/enterprise/role'

export default {
  name: 'EditModal',
  components: {
    MyUpload
  },
  props: {
    list: {
      type: Array,
      default: () => ([])
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
        name: '',
        phone: '',
        address: '',
        roleId: '',
        status: '',
        idcardProsUrl: '',
        idcardConsUrl: '',
        socialSecurityNum: '',
        businessInsuranceNum: '',
      },
      formRules: {
        name: [
          { required: true, message: '请输入员工姓名' },
          { max: 30, message: '30字以内' },
        ],
        phone: [
          { required: true, message: '请输入员工电话' },
          { max: 30, message: '30字以内' },
        ],
        roleId: [
          { required: true, message: '请选择部门' },
        ],
        status: [
          { required: true, message: '请选择在职状态' },
        ],
      },
      roleList: [], // 角色列表
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.getRoleList()
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
        idcardProsUrl: res.data.idcardProsUrl || '',
        idcardConsUrl: res.data.idcardConsUrl || '',
        addTime: undefined,
        updateTime: undefined,
        deleted: undefined,
      })
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async getRoleList() {
      const res = await roleList({
        page: 1,
        limit: 999
      })
      this.roleList = res.data.items;
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
      } catch(e) {
        loading.close()
      }
    }
  }
}
</script>

