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
      <el-form-item label="生日" prop="birthday">
        <el-date-picker
          v-model="formData.birthday"
          :disabled="!isAdmin"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择生日"
        />
      </el-form-item>
      <el-form-item label="区域编号" prop="regionCode">
        <el-input
          v-model="formData.regionCode"
          :disabled="!isAdmin"
          placeholder="请输入区域编号"
        />
      </el-form-item>
      <el-form-item label="门店备注" prop="brandRemark">
        <el-input
          v-model="formData.brandRemark"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
          maxlength="520"
          show-word-limit
          placeholder="请输入门店备注"
        />
      </el-form-item>
      <el-form-item label="平台备注" prop="platformRemark">
        <el-input
          v-model="formData.platformRemark"
          type="textarea"
          :disabled="!isAdmin"
          :autosize="{ minRows: 3, maxRows: 5 }"
          maxlength="520"
          show-word-limit
          placeholder="请输入平台备注"
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
import { userUpdate, brandStyleUpdate } from '@/api/userManagement/memberList';
import { mapGetters } from 'vuex'

export default {
  name: 'EditModal',
  computed: {
    ...mapGetters([
      'roles',
    ]),
    isAdmin() {
      return this.roles.includes('超级管理员')
    },
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
        birthday: '',
        regionCode: '',
        brandRemark: '',
        platformRemark: '',
      },
      formRules: {
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑会员信息' : '添加会员信息'
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      const loading = this.$elLoading()
      try {
        await this.$validatorForm('formData')
        const res = await userUpdate(this.formData)
        loading.close()
        this.$elMessage(`编辑成功!`)
        this.$emit('success')
        this.visible = false
      } catch(e) {
        loading.close()
      }
    }
  }
}
</script>

