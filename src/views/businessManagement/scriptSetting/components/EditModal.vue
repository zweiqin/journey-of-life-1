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
      <el-form-item label="话术内容" prop="say">
        <el-input
          v-model="formData.say"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5}"
          maxlength="520"
          show-word-limit
          placeholder="请输入话术内容"
        />
      </el-form-item>
      <el-form-item label="话术类型" prop="type">
        <el-select v-model="formData.type" size="mini" placeholder="请选择话术类型">
          <el-option
            v-for="item in list"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { msgsayUpdateSay, msgsaySaveMsgSay } from '@/api/businessManagement/scriptSetting';

export default {
  name: 'EditModal',
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
        say: '',
        type: '',
      },
      formRules: {
        say: [
          { required: true, message: '请输入客户名称' },
          { max: 520, message: '520字以内' },
        ],
        type: [
          { required: true, message: '请选择话术类型' }
        ],
        userTel: [
          { required: true, message: '请输入客户电话' }
        ]
      },
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑话术' : '添加话术'
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      const loading = this.$elLoading()
      try {
        await this.$validatorForm('formData')
        const res = this.formData.id ? await msgsayUpdateSay(this.formData) : await msgsaySaveMsgSay(this.formData)
        loading.close()
        this.$message.success(`${this.formData.id ? '编辑' : '添加'}成功!`)
        this.$emit('success')
        this.visible = false
      } catch(e) {
        loading.close()
      }
    },
  }
}
</script>

