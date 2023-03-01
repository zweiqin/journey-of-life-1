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
      <!-- 材料城信息 -->
      <el-form-item label="材料城ID" prop="id">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="材料城名称" prop="materialCityName">
        {{ formData.materialCityName || '--' }}
      </el-form-item>
      <el-form-item label="材料城Logo" prop="materialCityLogo">
        <el-image v-if="formData.materialCityLogo" :src="formData.materialCityLogo" style="width:80px; height:80px" fit="cover" :preview-src-list="[ formData.materialCityLogo ]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="材料城所在区域编码" prop="materialCityCode">
        {{ formData.materialCityCode || '--' }}
      </el-form-item>
      <!-- <el-form-item label="材料城所在区域" prop="supplierRegion">
        {{ formData.supplierRegion || '--' }}
        </el-form-item> -->
      <el-form-item label="详细地址" prop="materialCityAddress">
        {{ formData.materialCityAddress || '--' }}
      </el-form-item>
      <el-form-item label="联系人" prop="materialCityContactPerson">
        {{ formData.materialCityContactPerson || '--' }}
      </el-form-item>
      <el-form-item label="联系电话" prop="materialCityTel">
        {{ formData.materialCityTel || '--' }}
      </el-form-item>
      <el-form-item label="材料城介绍" prop="materialCityIntroduce">
        {{ formData.materialCityIntroduce || '--' }}
      </el-form-item>
      <el-form-item label="备注" prop="materialCityRemarks">
        {{ formData.materialCityRemarks || '--' }}
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
import { getNewMaterialCityInfo } from '@/api/materialManagement/materialCity'

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '查看材料城详情'
      },
      visible: false,
      formData: {
        id: '',
        adminId: '',
        materialCityName: '',
        materialCityLogo: '',
        materialCityCode: '',
        // supplierRegion: '',
        materialCityAddress: '',
        materialCityContactPerson: '',
        materialCityTel: '',
        materialCityIntroduce: '',
        materialCityRemarks: '',
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
        const res = await getNewMaterialCityInfo({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          adminId: res.data.adminId || '',
          materialCityName: res.data.materialCityName || '',
          materialCityLogo: res.data.materialCityLogo || '',
          materialCityCode: res.data.materialCityCode || '',
          materialCityAddress: res.data.materialCityAddress || '',
          materialCityContactPerson: res.data.materialCityContactPerson || '',
          materialCityTel: res.data.materialCityTel || '',
          materialCityIntroduce: res.data.materialCityIntroduce || '',
          materialCityRemarks: res.data.materialCityRemarks || '',
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

