<template>
  <el-dialog :visible.sync="visible" v-bind="modalOptions">
    <el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="100px">
      <el-form-item label="材料城名称" prop="materialCityName">
        <el-input v-model="formData.materialCityName" maxlength="30" show-word-limit placeholder="请输入材料城名称" />
      </el-form-item>
      <el-form-item label="材料城Logo" prop="materialCityLogo">
        <MyUpload v-model="formData.materialCityLogo" />
      </el-form-item>
      <el-form-item label="区域" prop="region_arr">
        <el-cascader
          v-model="formData.region_arr"
          placeholder="请选择区域"
          :options="common_regionList"
          :props="{ label: 'name', value: 'code', expandTrigger: 'hover' }"
          clearable
        />
      </el-form-item>
      <el-form-item label="详细地址" prop="materialCityAddress">
        <el-input v-model="formData.materialCityAddress" placeholder="请输入详细地址" maxlength="30" />
      </el-form-item>
      <el-form-item label="联系人" prop="materialCityContactPerson">
        <el-input v-model="formData.materialCityContactPerson" placeholder="请输入联系人" maxlength="30" />
      </el-form-item>
      <el-form-item label="联系电话" prop="materialCityTel">
        <el-input v-model="formData.materialCityTel" placeholder="请输入联系电话" maxlength="30" />
      </el-form-item>
      <el-form-item label="材料城介绍" prop="materialCityIntroduce">
        <el-input v-model="formData.materialCityIntroduce" type="textarea" placeholder="请输入材料城介绍" maxlength="520" :rows="3" show-word-limit />
      </el-form-item>
      <el-form-item label="材料城备注" prop="materialCityRemarks">
        <el-input v-model="formData.materialCityRemarks" type="textarea" placeholder="请输入材料城备注" maxlength="520" :rows="3" show-word-limit />
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import MyUpload from '@/components/MyUpload'
import { newaterialcitySave, newaterialcityUpdateById } from '@/api/materialManagement/materialCity'
import XeUtils from 'xe-utils'

export default {
  name: 'EditModal',
  components: {
    MyUpload
  },
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: ''
      },
      visible: false,
      formData: {
        id: '',
        materialCityName: '',
        materialCityLogo: '',
        region_arr: [],
        materialCityCode: '',
        materialCityAddress: '',
        materialCityContactPerson: '',
        materialCityTel: '',
        materialCityIntroduce: '',
        materialCityRemarks: ''
      },
      formRules: {
        materialCityName: [
          { required: true, message: '请输入材料城名称' },
          { max: 30, message: '30字以内' }
        ],
        materialCityLogo: [
          { required: false, message: '请上传材料城Logo' }
        ],
        region_arr: [
          { required: true, type: 'array', message: '请选择区域' }
        ],
        materialCityAddress: [
          { required: true, message: '请输入详细地址' },
          { max: 30, message: '30字以内' }
        ],
        materialCityContactPerson: [
          { required: true, message: '请输入联系人' },
          { max: 30, message: '30字以内' }
        ],
        materialCityTel: [
          { required: true, message: '请输入联系电话' },
          { max: 30, message: '30字以内' }
        ],
        materialCityIntroduce: [
          { required: true, message: '请输入材料城介绍' }
        ],
        materialCityRemarks: [
          { required: true, message: '请输入材料城备注' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'common_regionList'
    ])
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑材料城' : '添加材料城'
      this.formData = Object.assign(this.$options.data().formData, params, {
        id: params.id || '',
        materialCityName: params.materialCityName || '',
        materialCityLogo: params.materialCityLogo || '',
        materialCityCode: params.materialCityCode || '',
        region_arr: params.region_arr || [],
        materialCityAddress: params.materialCityAddress || '',
        materialCityContactPerson: params.materialCityContactPerson || '',
        materialCityTel: params.materialCityTel || '',
        materialCityIntroduce: params.materialCityIntroduce || '',
        materialCityRemarks: params.materialCityRemarks || ''
      })
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
      this.setRegion_arr(this.formData.materialCityCode)
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const { region_arr, ...opts } = this.formData
        const params = {
          ...opts,
          materialCityCode: region_arr[region_arr.length - 1]
        }
        const res = this.formData.id ? await newaterialcityUpdateById(params) : await newaterialcitySave(params)
        loading.close()
        this.$elMessage(`${this.formData.id ? '编辑' : '添加'}成功!`)
        this.$emit('success')
        this.visible = false
      } catch (e) {
        loading.close()
      }
    },
    setRegion_arr(regionCode) {
      const regionItem = XeUtils.findTree(this.common_regionList, (item) => item.code === Number(regionCode))
      if (regionItem && Array.isArray(regionItem.nodes)) {
        this.formData.region_arr = regionItem.nodes.map((v) => v.code)
      }
    }
  }
}
</script>

