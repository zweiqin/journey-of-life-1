<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="modalOptions"
  >
    <el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-width="100px">
      <el-form-item label="报警时间" prop="setTime">
        <el-input v-model.trim="formData.setTime" clearable placeholder="请输入报警时间" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { messagesentrySalesmanBinding } from '@/api/businessManagement/informationSentry';
import { regZero } from '@/utils/reg'

export default {
  name: 'SetTimeModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '用户报警时间'
      },
      visible: false,
      formData: {
        setTime: '',
      },
      formRules: {
        setTime: [
          { required: true, message: '请输入报警时间' },
          { pattern: regZero,  message: '请输入正整数' }
        ],
      },
      parentParams: {}
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.parentParams = { ...params }
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    handleSubmit() {
      this.$refs.formData.validate(async (valid) => {
        if (valid) {
          const res = await messagesentrySalesmanBinding({
            ...this.parentParams,
            ...this.formData
          })
          this.$message.success('绑定成功!')
          this.$emit('success')
          this.visible = false
        } else {
          return false;
        }
      });
    }
  }
}
</script>

