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
      label-width="110px"
    >
      <el-form-item label="层级" prop="level">
        <el-radio-group v-model="formData.level">
          <el-radio :label="1">合伙人</el-radio>
          <el-radio :label="2">超级合伙人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="受益方" prop="levelId">
        <el-radio-group v-model="formData.levelId">
          <el-radio :label="6">合伙人</el-radio>
          <el-radio :label="7">超级合伙人</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="直接业务比例" prop="directBusinessRatio">
        <el-input
          v-model="formData.directBusinessRatio"
          placeholder="请输入直接业务比例"
        />
      </el-form-item>
      <el-form-item v-if="formData.level >= 2" label="间接业务比例" prop="indirectBusinessRatio">
        <el-input
          v-model="formData.indirectBusinessRatio"
          placeholder="请输入间接业务比例"
        />
      </el-form-item>
      <el-form-item label="直接拓展比例" prop="directExpandRatio">
        <el-input
          v-model="formData.directExpandRatio"
          placeholder="请输入直接拓展比例"
        />
      </el-form-item>
      <el-form-item v-if="formData.level >= 2" label="间接拓展比例" prop="indirectExpandRatio">
        <el-input
          v-model="formData.indirectExpandRatio"
          placeholder="请输入间接拓展比例"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { comModuleSaveRatio } from '@/api/brand/commissionSetting';
import { regFloat } from '@/utils/reg'

export default {
  name: 'EditModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '佣金比例'
      },
      visible: false,
      formData: {
        moduleId: '',
        levelId: '',
        level: 1,
        directBusinessRatio: '',
        indirectBusinessRatio: '',
        directExpandRatio: '',
        indirectExpandRatio: '',
      },
      formRules: {
        levelId: [
          { required: true, message: '请选择受益方' },
        ],
        level: [
          { required: true, message: '请选择层级' },
        ],
        directExpandRatio: [
          { pattern: regFloat,  message: '数值有误' }
        ],
        indirectBusinessRatio: [
          { pattern: regFloat,  message: '数值有误' }
        ],
        indirectExpandRatio: [
          { pattern: regFloat,  message: '数值有误' }
        ],
        directBusinessRatio: [
          { pattern: regFloat,  message: '数值有误' }
        ],
      },
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
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const { level, indirectBusinessRatio, indirectExpandRatio , ...otps } = this.formData
        const params = {
          ...otps,
          level,
          indirectBusinessRatio: level >= 2 ? indirectBusinessRatio : '',
          indirectExpandRatio: level >= 2 ? indirectExpandRatio : '',
        }
        const res = await comModuleSaveRatio(params)
        loading.close()
        this.$elMessage(`设置成功!`)
        this.$emit('success')
        this.visible = false
      } catch(e) {
        loading.close()
      }
    }
  }
}
</script>

