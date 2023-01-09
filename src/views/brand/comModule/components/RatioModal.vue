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
        <el-select v-model="formData.level" placeholder="请选择层级">
          <el-option label="合伙人" :value="1" />
          <el-option label="超级合伙人" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="受益方" prop="levelId">
        <el-select v-model="formData.levelId" placeholder="请选择受益方">
          <el-option label="合伙人" :value="6" />
          <el-option label="超级合伙人" :value="7" />
        </el-select>
      </el-form-item>

      <el-form-item label="直接拓展比例" prop="directExpandRatio">
        <el-input
          v-model="formData.directExpandRatio"
          placeholder="请输入直接拓展比例"
        />
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
import { comModuleSaveRatio } from '@/api/brand/comModule';
import { regZero } from '@/utils/reg'

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
        level: '',
        directExpandRatio: '',
        indirectBusinessRatio: '',
        indirectExpandRatio: '',
        directBusinessRatio: '',
      },
      formRules: {
        levelId: [
          { required: true, message: '请选择受益方' },
        ],
        level: [
          { required: true, message: '请选择层级' },
        ],
        costType: [
          { required: true, message: '请选择费用类型' },
        ],
        directExpandRatio: [
          { pattern: regZero,  message: '请输入正整数' }
        ],
        indirectBusinessRatio: [
          { pattern: regZero,  message: '请输入正整数' }
        ],
        indirectExpandRatio: [
          { pattern: regZero,  message: '请输入正整数' }
        ],
        directBusinessRatio: [
          { pattern: regZero,  message: '请输入正整数' }
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

