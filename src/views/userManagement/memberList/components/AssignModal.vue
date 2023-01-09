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
      <el-form-item label="业务员" prop="salesmanId">
        <el-select v-model="formData.salesmanId" filterable style="width:100%;" placeholder="请选择业务员">
          <el-option
            v-for="item in staffList"
            :key="item.id"
            :label="`${item.roleName}-${item.name}`"
            :value="item.id"
          >{{ item.roleName }}-{{item.name}}</el-option>
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
import { staffList } from '@/api/enterprise/staff'
import { orderSVsAdd } from '@/api/userManagement/memberList'

export default {
  name: 'AssignModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '指派业务员'
      },
      visible: false,
      formData: {
        userIds: [],
        salesmanId: '',
      },
      formRules: {
        salesmanId: [
          { required: true, message: '请选择业务员' },
        ],
      },
      staffList: []
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.getStaffList()
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    // 员工列表
    async getStaffList() {
      const res = await staffList({
        page: 1,
        limit: 9999,
      })
      this.staffList = res.data.items
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const res = await orderSVsAdd(this.formData)
        loading.close()
        this.$elMessage(`指派成功!`)
        this.$emit('success')
        this.visible = false
      } catch(e) {
        loading.close()
      }
    }
  }
}
</script>

