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
      <!-- 供应商信息 -->
      <el-form-item label="供应商ID" prop="id">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="供应商名称" prop="supplierName">
        {{ formData.supplierName || '--' }}
      </el-form-item>
      <el-form-item label="供应商Logo" prop="supplierLogo">
        <el-image v-if="formData.supplierLogo" :src="formData.supplierLogo" style="width:80px; height:80px" fit="cover" :preview-src-list="[ formData.supplierLogo ]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="供应商所在区域编码" prop="supplierCode">
        {{ formData.supplierCode || '--' }}
      </el-form-item>
      <!-- <el-form-item label="供应商所在区域" prop="supplierRegion">
        {{ formData.supplierRegion || '--' }}
        </el-form-item> -->
      <el-form-item label="详细地址" prop="supplierAddress">
        {{ formData.supplierAddress || '--' }}
      </el-form-item>
      <el-form-item label="联系人" prop="supplierContactPerson">
        {{ formData.supplierContactPerson || '--' }}
      </el-form-item>
      <el-form-item label="联系电话" prop="supplierTel">
        {{ formData.supplierTel || '--' }}
      </el-form-item>
      <el-form-item label="供应商介绍" prop="supplierIntroduce">
        {{ formData.supplierIntroduce || '--' }}
      </el-form-item>
      <el-form-item label="备注" prop="supplierRemarks">
        {{ formData.supplierRemarks || '--' }}
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
import { getNewSupplierInfo } from '@/api/enterprise/supplier'

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '查看供应商详情'
      },
      visible: false,
      formData: {
        id: '',
        adminId: '',
        supplierName: '',
        supplierLogo: '',
        supplierCode: '',
        // supplierRegion: '',
        supplierAddress: '',
        supplierContactPerson: '',
        supplierTel: '',
        supplierIntroduce: '',
        supplierRemarks: '',
        createTime: '',
        updateTime: ''
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
        const res = await getNewSupplierInfo({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          adminId: res.data.adminId || '',
          supplierName: res.data.supplierName || '',
          supplierLogo: res.data.supplierLogo || '',
          supplierCode: res.data.supplierCode || '',
          supplierAddress: res.data.supplierAddress || '',
          supplierContactPerson: res.data.supplierContactPerson || '',
          supplierTel: res.data.supplierTel || '',
          supplierIntroduce: res.data.supplierIntroduce || '',
          supplierRemarks: res.data.supplierRemarks || '',
          createTime: res.data.createTime || '',
          updateTime: res.data.updateTime || ''
        })
      } finally {
        loading.close()
      }
    }
  }
}
</script>

