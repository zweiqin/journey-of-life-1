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
      label-width="100px"
    >
      <el-form-item label="问题范围" prop="type">
        <el-select v-model="formData.type" placeholder="请选择问题范围">
          <el-option
            v-for="item in list"
            :key="item.code"
            :label="item.value"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="问题内容" prop="question">
        <el-input
          v-model="formData.question"
          maxlength="100"
          show-word-limit
          placeholder="请输入问题内容"
        />
      </el-form-item>
      <el-form-item label="问题回复" prop="answer">
        <el-input
          v-model="formData.answer"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
          maxlength="520"
          show-word-limit
          placeholder="请输入问题回复"
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
import {
  issueCreate,
  issueUpdate,
} from '@/api/goods/issue';

export default {
  name: 'EditModal',
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
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
        type: '',
        question: '',
        answer: ''
      },
      formRules: {
        type: [
          { required: true, message: '请选择问题范围' },
        ],
        question: [
          { required: true, message: '请输入问题内容' },
          { max: 100, message: '100字以内' },
        ],
        answer: [
          { required: true, message: '请输入问题回复' },
          { max: 520, message: '520字以内' },
        ],
      },
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑问题' : '添加问题'
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const res = this.formData.id ? await issueUpdate(this.formData) : await issueCreate(this.formData)
      this.$message.success(`${this.formData.id ? '编辑' : '添加'}成功!`)
      this.$emit('success')
      this.visible = false
    }
  }
}
</script>

