<template>
  <el-dialog :visible.sync="visible" v-bind="modalOptions">
    <el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="100px">
      <el-form-item label="客户姓名" prop="customerName">
        <el-input v-model="formData.customerName" placeholder="请输入客户姓名" maxlength="30" />
      </el-form-item>
      <el-form-item label="客户性别" prop="customerSex">
        <el-select v-model="formData.customerSex" size="mini" placeholder="请选择客户性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="客户电话" prop="customerPhone">
        <el-input v-model="formData.customerPhone" placeholder="请输入客户电话" maxlength="30" />
      </el-form-item>
      <el-form-item label="职业" prop="professional">
        <el-input v-model="formData.professional" placeholder="请输入职业" maxlength="30" />
      </el-form-item>
      <el-form-item label="爱好" prop="hobby">
        <el-input v-model="formData.hobby" type="textarea" placeholder="请输入客户爱好" maxlength="520" :rows="3" show-word-limit />
      </el-form-item>
      <el-form-item label="工作地点" prop="workingPlace">
        <el-input v-model="formData.workingPlace" type="textarea" placeholder="请输入工作地点" maxlength="100" :rows="2" show-word-limit />
      </el-form-item>
      <el-form-item label="家庭住址" prop="homeAddress">
        <el-input v-model="formData.homeAddress" type="textarea" placeholder="请输入家庭住址" maxlength="100" :rows="2" show-word-limit />
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker
          v-model="formData.birthday"
          size="medium"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="所属业务员" prop="belongsSalesman">
        <el-input v-model="formData.belongsSalesman" placeholder="请输入所属业务员" maxlength="30" />
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
import { customerpoolInsertSelective, customerpoolUpdateByPrimaryKeySelective } from '@/api/businessManagement/customerPool'

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
        customerName: '',
        customerSex: '',
        customerPhone: '',
        professional: '',
        hobby: '',
        workingPlace: '',
        homeAddress: '',
        birthday: '',
        belongsSalesman: ''
      },
      formRules: {
        customerName: [
          { required: true, message: '请输入客户姓名' },
          { max: 30, message: '30字以内' }
        ],
        customerSex: [
          { required: true, message: '请输入客户性别' }
        ],
        customerPhone: [
          { required: true, message: '请输入客户电话' },
          { max: 30, message: '30字以内' }
        ]
      }
    }
  },
  computed: {},
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑客户' : '添加客户'
      this.formData = Object.assign(this.$options.data().formData, params, {
        id: params.id || '',
        customerName: params.customerName || '',
        customerSex: params.customerSex || '',
        customerPhone: params.customerPhone || '',
        professional: params.professional || '',
        hobby: params.hobby || '',
        workingPlace: params.workingPlace || '',
        homeAddress: params.homeAddress || '',
        birthday: params.birthday || '',
        belongsSalesman: params.belongsSalesman || ''
      })
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const { ...opts } = this.formData
        const params = {
          ...opts
        }
        const res = this.formData.id ? await customerpoolUpdateByPrimaryKeySelective(params) : await customerpoolInsertSelective(params)
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

