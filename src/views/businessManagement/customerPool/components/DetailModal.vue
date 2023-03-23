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
      <!-- 客户信息 -->
      <el-form-item label="客户ID" prop="id">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        {{ formData.customerName || '--' }}
      </el-form-item>
      <el-form-item label="客户性别" prop="customerSex">
        <span v-if="formData.customerSex === 1">男</span>
        <span v-else-if="formData.customerSex === 2">女</span>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="客户电话" prop="customerPhone">
        {{ formData.customerPhone || '--' }}
      </el-form-item>
      <el-form-item label="职业" prop="professional">
        {{ formData.professional || '--' }}
      </el-form-item>
      <el-form-item label="爱好" prop="hobby">
        {{ formData.hobby || '--' }}
      </el-form-item>
      <el-form-item label="工作地点" prop="workingPlace">
        {{ formData.workingPlace || '--' }}
      </el-form-item>
      <el-form-item label="家庭住址" prop="homeAddress">
        {{ formData.homeAddress || '--' }}
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        {{ formData.birthday || '--' }}
      </el-form-item>
      <el-form-item label="所属业务员" prop="belongsSalesman">
        {{ formData.belongsSalesman || '--' }}
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
import { customerpoolSelectByPrimaryKey } from '@/api/businessManagement/customerPool'

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '查看客户详情'
      },
      visible: false,
      formData: {
        id: '',
        adminId: '',
        customerName: '',
        customerSex: '',
        customerPhone: '',
        professional: '',
        hobby: '',
        workingPlace: '',
        homeAddress: '',
        birthday: '',
        belongsSalesman: '',
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
        const res = await customerpoolSelectByPrimaryKey({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          adminId: res.data.adminId || '',
          customerName: res.data.customerName || '',
          customerSex: res.data.customerSex || '',
          customerPhone: res.data.customerPhone || '',
          professional: res.data.professional || '',
          hobby: res.data.hobby || '',
          workingPlace: res.data.workingPlace || '',
          homeAddress: res.data.homeAddress || '',
          birthday: res.data.birthday || '',
          belongsSalesman: res.data.belongsSalesman || '',
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

