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
      <el-form-item label="角色名称" prop="name">
        <el-tree
          ref="tree"
          :data="systemPermissions"
          :default-checked-keys="assignedPermissions"
          show-checkbox
          node-key="id"
          highlight-current
        >
          <span
            slot-scope="{ node, data }"
            class="custom-tree-node"
          >
            <span>{{ data.label }}</span>
            <el-tag
              v-if="data.api"
              type="success"
              size="mini"
            >{{ data.api }}</el-tag>
          </span>
        </el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { rolePmsList, rolePermissions } from '@/api/enterprise/role'

export default {
  name: 'PermissionModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '权限配置'
      },
      visible: false,
      formData: {
        id: '',
      },
      formRules: {
      },
      systemPermissions: [],
      assignedPermissions: [],
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
      this.getRolePmsList()
    },
    async getRolePmsList() {
      const res = await rolePmsList({ roleId: this.formData.id })
      console.log('r', res)
      this.systemPermissions = res.data.systemPermissions
      this.assignedPermissions = res.data.assignedPermissions
    },
    async handleSubmit() {
      const loading = this.$elLoading()
      try {
        const permissions = this.$refs.tree.getCheckedKeys(true)
        await rolePermissions({
          roleId: this.formData.id,
          permissions
        })
        loading.close()
        this.$elMessage('授权成功!')
        this.$emit('success')
        this.visible = false
      } catch(e) {
        loading.close()
      }
    },
  }
}
</script>

