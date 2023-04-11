<template>
  <el-dialog :visible.sync="visible" v-bind="modalOptions">
    <el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="120px">
      <el-form-item label="活动名称" prop="campaignsName">
        <el-input v-model="formData.campaignsName" placeholder="请输入活动名称" maxlength="30" />
      </el-form-item>
      <el-form-item label="活动类型" prop="campaignsType">
        <el-select v-model="formData.campaignsType" size="mini" placeholder="请选择活动类型">
          <el-option label="待开始" value="0" />
          <el-option label="进行中" value="1" />
          <el-option label="已结束" value="2" />
          <el-option label="已废弃" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动开始时间" prop="startDate">
        <el-date-picker
          v-model="formData.startDate"
          size="medium"
          type="date"
          placeholder="选择活动开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动结束时间" prop="endDate">
        <el-date-picker
          v-model="formData.endDate"
          size="medium"
          type="date"
          placeholder="选择活动结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="目标用户类型" prop="targetaudience">
        <el-input v-model="formData.targetaudience" placeholder="请输入目标用户类型" maxlength="30" />
      </el-form-item>
      <el-form-item label="目标用户数量" prop="targetsize">
        <el-input v-model="formData.targetsize" placeholder="请输入目标用户数量" maxlength="30" />
      </el-form-item>
      <el-form-item label="活动描述" prop="description">
        <el-input v-model="formData.description" type="textarea" placeholder="请输入活动描述" maxlength="520" :rows="3" show-word-limit />
      </el-form-item>
      <el-form-item label="活动预算" prop="budget">
        <el-input v-model="formData.budget" type="textarea" placeholder="请输入活动预算" maxlength="100" :rows="2" show-word-limit />
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import MyUpload from '@/components/MyUpload'
import { userCrmCreate, userCrmUpdate } from '@/api/marketingManagement/activityList'

export default {
  name: 'EditModal',
  // components: {
  //   MyUpload
  // },
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
        campaignsName: '',
        campaignsType: '',
        startDate: '',
        endDate: '',
        targetaudience: '',
        targetsize: '',
        description: '',
        budget: ''
      },
      formRules: {
        campaignsName: [
          { required: true, message: '请输入活动名称' },
          { max: 30, message: '30字以内' }
        ],
        campaignsType: [
          { required: true, message: '请输入活动类型' }
        ],
        startDate: [
          { required: true, message: '请输入活动开始时间' }
        ],
        endDate: [
          { required: true, message: '请输入活动结束时间' }
        ],
        targetaudience: [
          { required: true, message: '请输入目标用户类型' }
        ],
        targetsize: [
          { required: true, message: '请输入目标用户数量' }
        ],
        description: [
          { required: true, message: '请输入活动描述' }
        ],
        budget: [
          { required: true, message: '请输入活动预算' }
        ]
      }
    }
  },
  computed: {},
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑活动' : '添加活动'
      this.formData = Object.assign(this.$options.data().formData, params, {
        id: params.id || '',
        campaignsName: params.campaignsName || '',
        campaignsType: params.campaignsType || '',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
        targetaudience: params.targetaudience || '',
        targetsize: params.targetsize || '',
        description: params.description || '',
        budget: params.budget || ''
      })
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const { ...opts } = this.formData
        const params = {
          ...opts
        }
        const res = this.formData.id ? await userCrmUpdate(params) : await userCrmCreate(params)
        loading.close()
        this.$elMessage(`${this.formData.id ? '编辑' : '添加'}成功!`)
        this.$emit('success')
        this.visible = false
      } catch (e) {
        loading.close()
      }
    }
  }
}
</script>

