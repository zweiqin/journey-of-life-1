<template>
  <el-dialog :visible.sync="visible" v-bind="modalOptions">
    <el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="100px">
      <el-form-item label="供应商名称" prop="supplierName">
        <el-input v-model="formData.supplierName" maxlength="30" show-word-limit placeholder="请输入供应商名称" />
      </el-form-item>
      <el-form-item label="供应商Logo" prop="supplierLogo">
        <MyUpload v-model="formData.supplierLogo" />
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
      <el-form-item label="详细地址" prop="supplierAddress">
        <el-input v-model="formData.supplierAddress" placeholder="请输入详细地址" maxlength="30" />
      </el-form-item>
      <el-form-item label="联系人" prop="supplierContactPerson">
        <el-input v-model="formData.supplierContactPerson" placeholder="请输入联系人" maxlength="30" />
      </el-form-item>
      <el-form-item label="联系电话" prop="supplierTel">
        <el-input v-model="formData.supplierTel" placeholder="请输入联系电话" maxlength="30" />
      </el-form-item>
      <el-form-item label="供应商介绍" prop="supplierIntroduce">
        <el-input v-model="formData.supplierIntroduce" type="textarea" placeholder="请输入供应商介绍" maxlength="520" :rows="3" show-word-limit />
      </el-form-item>
      <el-form-item label="供应商备注" prop="supplierRemarks">
        <el-input v-model="formData.supplierRemarks" type="textarea" placeholder="请输入供应商备注" maxlength="520" :rows="3" show-word-limit />
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
import { newsupplierSave, newsupplierUpdateById } from '@/api/enterprise/supplier'
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
        supplierName: '',
        supplierLogo: '',
        region_arr: [],
        supplierCode: '',
        supplierAddress: '',
        supplierContactPerson: '',
        supplierTel: '',
        supplierIntroduce: '',
        supplierRemarks: ''
      },
      formRules: {
        supplierName: [
          { required: true, message: '请输入供应商名称' },
          { max: 30, message: '30字以内' }
        ],
        supplierLogo: [
          { required: false, message: '请上传供应商Logo' }
        ],
        region_arr: [
          { required: true, type: 'array', message: '请选择区域' }
        ],
        supplierAddress: [
          { required: true, message: '请输入详细地址' },
          { max: 30, message: '30字以内' }
        ],
        supplierContactPerson: [
          { required: true, message: '请输入联系人' },
          { max: 30, message: '30字以内' }
        ],
        supplierTel: [
          { required: true, message: '请输入联系电话' },
          { max: 30, message: '30字以内' }
        ],
        supplierIntroduce: [
          { required: true, message: '请输入供应商介绍' }
        ],
        supplierRemarks: [
          { required: true, message: '请输入供应商备注' }
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
      this.modalOptions.title = params.id ? '编辑供应商' : '添加供应商'
      this.formData = Object.assign(this.$options.data().formData, params, {
        id: params.id || '',
        supplierName: params.supplierName || '',
        supplierLogo: params.supplierLogo || '',
        supplierCode: params.supplierCode || '',
        region_arr: params.region_arr || [],
        supplierAddress: params.supplierAddress || '',
        supplierContactPerson: params.supplierContactPerson || '',
        supplierTel: params.supplierTel || '',
        supplierIntroduce: params.supplierIntroduce || '',
        supplierRemarks: params.supplierRemarks || ''
      })
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
      this.setRegion_arr(this.formData.supplierCode)
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const { region_arr, ...opts } = this.formData
        const params = {
          ...opts,
          supplierCode: region_arr[region_arr.length - 1]
        }
        const res = this.formData.id ? await newsupplierUpdateById(params) : await newsupplierSave(params)
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

