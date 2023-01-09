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
      label-width="100px"
    >
      <el-form-item label="类型" prop="level">
        <el-select v-model="formData.level" placeholder="请选择类型">
          <el-option label="板块" :value="1" />
          <el-option label="业务" :value="2" />
        </el-select>
      </el-form-item>

      <template v-if="formData.level==1">
        <el-form-item label="板块名" prop="name">
          <el-input
            v-model="formData.name"
            maxlength="30"
            show-word-limit
            placeholder="请输入板块名"
          />
        </el-form-item>
      </template>

      <template v-if="formData.level==2">
        <el-form-item label="板块" prop="pid">
          <el-select v-model="formData.pid" placeholder="请选择板块">
          <el-option
              v-for="item in levelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="业务名" prop="name">
          <el-input
            v-model="formData.name"
            maxlength="30"
            show-word-limit
            placeholder="请输入业务名"
          />
        </el-form-item>
        <el-form-item label="费用类型" prop="costType">
          <el-select v-model="formData.costType" placeholder="请选择费用类型">
            <el-option label="金额" :value="1" />
            <el-option label="比例" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="formData.costType==1" label="业务费用" prop="cost">
          <el-input
            v-model="formData.cost"
            placeholder="请输入业务费用"
          />
        </el-form-item>
        <el-form-item label="业务内容" prop="content">
          <el-input
            v-model="formData.content"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            maxlength="520"
            show-word-limit
            placeholder="请输入业务内容"
          />
        </el-form-item>
      </template>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="formData.remark"
           type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
          maxlength="520"
          show-word-limit
          placeholder="请输入备注"
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
import { comModuleList, comModuleAdd, comModuleUpdate } from '@/api/brand/comModule';
import { regZero } from '@/utils/reg'

export default {
  name: 'EditModal',
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
        level: 1,
        name: '',
        pid: '',
        costType: '',
        cost: '',
        content: '',
        remark: '',
      },
      formRules: {
        level: [
          { required: true, message: '请选择类型' },
        ],
        name: [
          { required: true, message: '请输入名称' },
        ],
        pid: [
          { required: true, message: '请选择板块' },
        ],
        costType: [
          { required: true, message: '请选择费用类型' },
        ],
        cost: [
          { required: true, message: '请输入业务费用' },
          { pattern: regZero,  message: '请输入正整数' }
        ],
        content: [
          { required: true, message: '请输入业务内容' },
        ],
      },
      levelList: []
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.getLevelList()
      this.modalOptions.title = params.id ? '编辑' : '添加'
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async getLevelList() {
      const res = await comModuleList({ level: 1 })
      this.levelList = res.data.items;
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const { id, level, name, pid, costType, cost, content, remark } = this.formData
        const params = {
          id,
          level,
          name,
          remark,
          pid: level === 2 ? pid : '',
          costType: level === 2 ? costType : '',
          cost: level === 2 && costType === 1 ? cost : '',
          content: level === 2 ? content : '',
        }
        const res = this.formData.id ? await comModuleUpdate(params) : await comModuleAdd(params)
        loading.close()
        this.$elMessage(`${this.formData.id ? '编辑' : '添加'}成功!`)
        this.$emit('success')
        this.visible = false
      } catch(e) {
        loading.close()
      }
    }
  }
}
</script>

