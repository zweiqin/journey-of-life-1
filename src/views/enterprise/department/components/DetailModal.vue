<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="modalOptions"
  >
    <el-form
      ref="formData"
      :model="formData"
      size="mini"
      label-suffix=":"
      label-width="120px"
    >
      <!-- 部门信息 -->
      <el-form-item label="部门ID" prop="id">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="所属adminId" prop="adminId">
        {{ formData.adminId || '--' }}
      </el-form-item>
      <el-form-item label="部门名称" prop="depName">
        {{ formData.depName || '--' }}
      </el-form-item>
      <el-form-item label="部门说明" prop="depContent">
        {{ formData.depContent || '--' }}
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        {{ formData.createTime || '--' }}
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        {{ formData.updateTime || '--' }}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { departmentSelectByPrimaryKey } from '@/api/enterprise/department'

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '查看部门详情'
      },
      visible: false,
      formData: {
        id: '',
        adminId: '',
        depName: '',
        depContent: '',
        createTime: '',
        updateTime: '',
        isDelete: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.formData = Object.assign(this.$options.data().formData, params)
      if (params.id) {
        this.getInfo(params.id)
      }
      this.visible = true
    },
    async getInfo(id) {
      const loading = this.$elLoading('加载中')
      try {
        const res = await departmentSelectByPrimaryKey({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          adminId: res.data.adminId || '',
          depName: res.data.depName || '',
          depContent: res.data.depContent || '',
          createTime: res.data.createTime || '',
          updateTime: res.data.updateTime || '',
          isDelete: res.data.isDelete || ''
        })
      } finally {
        loading.close()
      }
    }
  }
}
</script>

