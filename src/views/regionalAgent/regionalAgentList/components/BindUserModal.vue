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
      <el-form-item label="绑定业务员" prop="userId">
        <el-select v-model="formData.userId" filterable placeholder="业务员">
          <el-option
            v-for="item in businessList"
            :key="item.id"
            :label="`${item.userName}-${item.userLevelDesc}`"
            :value="item.id"
          >
            {{ item.userName }}-{{ item.userLevelDesc }}
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
import { businessList } from '@/api/userManagement/memberList'
import { bindingSalesman } from '@/api/regionalAgent/regionalAgentList'

export default {
  name: 'BindUserModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '绑定业务员'
      },
      visible: false,
      formData: {
        userIds: [],
        region: '',
        userId: '',
        userName: ''
      },
      formRules: {
        userId: [
          { required: true, message: '请选择业务员' }
        ]
      },
      businessList: []
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.getBusinessList()
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    // 业务员列表
    async getBusinessList() {
      const res = await businessList({
        userLavel: 1,
        userName: ''
      })
      this.businessList = res.data
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        this.formData.userIds.forEach(async (item) => {
          await bindingSalesman({
            userId: this.formData.userId,
            userName: this.businessList.find((i) => i.id === this.formData.userId).userName,
            id: item
          })
        })
        loading.close()
        this.$elMessage(`指派成功!`)
        this.$emit('success')
        this.visible = false
      } catch (e) {
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
.el-select {
	width: 100%;
}
</style>
