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
      <el-form-item label="绑定业务员" prop="salesmanId">
        <el-select v-model="formData.salesmanId" filterable style="width:100%;" placeholder="请选择业务员">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          >
            <div class="item">
              <div :title="item.username" class="text">{{ item.username }}</div>
              <el-tag v-if="formData.region && formData.region == item.regionCode">相同区域</el-tag>
            </div>
          </el-option>
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
import { bdUserAdd, userList } from '@/api/userManagement/memberList'

export default {
  name: 'BindUserModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '绑定'
      },
      visible: false,
      formData: {
        userIds: [],
        region: '',
        salesmanId: '',
      },
      formRules: {
        salesmanId: [
          { required: true, message: '请选择业务员' },
        ],
      },
      userList: []
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.getUserList(params.region)
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    // 员工列表
    async getUserList() {
      const res = await userList({
        userLevel: 1,
        page: 1,
        limit: 99999,
      })
      this.userList = res.data.items
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const res = await bdUserAdd({
          salesmanId: this.formData.salesmanId,
          userIds: this.formData.userIds,
        })
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

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    flex: 1;
    margin-right: 4px;
  }
}
</style>
