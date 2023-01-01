<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="modalOptions"
  >
    <el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-width="140px">
      <el-form-item label="业务员名称" prop="belongsSalesman">
        <el-input v-model.trim="formData.belongsSalesman" clearable placeholder="请输入业务员名称" />
      </el-form-item>
      <el-form-item label="业务员所属部门" prop="belongsDepartment">
        <el-input v-model.trim="formData.belongsDepartment" clearable placeholder="请输入业务员所属部门" />
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

export default {
  name: 'AddSalesmanModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '业务员绑定'
      },
      visible: false,
      formData: {
        id: '',
        belongsSalesman: '',
        belongsDepartment: '',
      },
      formRules: {
        belongsSalesman: [
          { required: true, message: '请输入业务员名称' }
        ],
        belongsDepartment: [
          { required: true, message: '请输入业务员所属部门' }
        ]
      },
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    handleSubmit() {
      this.$refs.formData.validate(async (valid) => {
        if (valid) {
          const res = await messagesentrySalesmanBinding(this.formData)
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

