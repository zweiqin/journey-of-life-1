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
      label-position="left"
      label-suffix=":"
      label-width="200px"
    >
      <el-form-item label="板块类型" prop="plateType">
        <el-select v-model="formData.plateType" :disabled="!!formData.id" size="mini" placeholder="请选择板块类型">
          <el-option label="社区" :value="1" />
          <el-option label="物流" :value="2" />
          <el-option label="家居新零售" :value="3" />
          <el-option label="材料" :value="4" />
          <el-option label="新媒体" :value="5" />
        </el-select>
      </el-form-item>
      <el-form-item label="业务名称" prop="businessName">
        <el-input
          v-model="formData.businessName"
          placeholder="请输入业务名称"
        />
      </el-form-item>
      <el-form-item label="费用类型" prop="expenseType">
        <el-radio-group v-model="formData.expenseType">
          <el-radio :label="1">金额</el-radio>
          <el-radio :label="2">比例</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formData.expenseType == 1" label="费用" prop="expense">
        <el-input
          v-model="formData.expense"
          placeholder="请输入费用金额"
        />
      </el-form-item>
      <el-form-item v-if="formData.expenseType == 2" label="费用" prop="expense">
        <el-input v-model="formData.expense" placeholder="请输入费用比例"><template #append>%</template></el-input>
      </el-form-item>

      <el-form-item label="超级合伙人的直接拓展收入" prop="directIncome">
        <el-input
          v-model="formData.directIncome"
          style="width: 230px;"
          placeholder="超级合伙人的直接拓展收入"
        >
          <template #append>%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="超级合伙人的间接拓展收入" prop="indirectIncome">
        <el-input
          v-model="formData.indirectIncome"
          style="width: 230px;"
          placeholder="超级合伙人的间接拓展收入"
        >
          <template #append>%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="超级合伙人的直接业务收入" prop="directIncome2">
        <el-input
          v-model="formData.directIncome2"
          style="width: 230px;"
          placeholder="超级合伙人的直接业务收入"
        >
          <template #append>%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="超级合伙人的间接业务收入" prop="indirectIncome2">
        <el-input
          v-model="formData.indirectIncome2"
          style="width: 230px;"
          placeholder="超级合伙人的间接业务收入"
        >
          <template #append>%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="合伙人的拓展收入" prop="directIncome3">
        <el-input
          v-model="formData.directIncome3"
          style="width: 230px;"
          placeholder="合伙人的拓展收入"
        >
          <template #append>%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="合伙人的业务收入" prop="indirectIncome3">
        <el-input
          v-model="formData.indirectIncome3"
          style="width: 230px;"
          placeholder="合伙人的业务收入"
        >
          <template #append>%</template>
        </el-input>
      </el-form-item>

      <el-form-item label="业务内容" prop="businessContent">
        <el-input
          v-model="formData.businessContent"
          maxlength="50"
          show-word-limit
          placeholder="请输入业务内容"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input
          v-model="formData.remarks"
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
import { commissionSelectByPrimaryKey, commissionInsertSelective, commissionUpdateByPrimaryKeySelective } from '@/api/brand/commissionQuery'
import { regFloat } from '@/utils/reg'

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
        plateType: '',
        businessName: '',
        expenseType: '',
        expense: '',
        directIncome: '',
        indirectIncome: '',
        directIncome2: '',
        indirectIncome2: '',
        directIncome3: '',
        indirectIncome3: '',
        businessContent: '',
        remarks: ''
      },
      formRules: {
        plateType: [
          { required: true, message: '请选择板块类型' }
        ],
        businessName: [
          { required: true, message: '请输入业务名称' }
        ],
        expenseType: [
          { required: true, message: '请选择费用类型' }
        ],
        expense: [
          { required: true, message: '请输入费用金额' }
        ],
        directIncome: [
          { pattern: regFloat, message: '数值有误' }
        ],
        indirectIncome: [
          { pattern: regFloat, message: '数值有误' }
        ],
        directIncome2: [
          { pattern: regFloat, message: '数值有误' }
        ],
        indirectIncome2: [
          { pattern: regFloat, message: '数值有误' }
        ],
        directIncome3: [
          { pattern: regFloat, message: '数值有误' }
        ],
        indirectIncome3: [
          { pattern: regFloat, message: '数值有误' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑佣金' : '添加佣金'
      this.formData = Object.assign(this.$options.data().formData, params, {
        directIncome: params.directIncome ? params.directIncome.substring(0, params.directIncome.length - 1) : '',
        indirectIncome: params.indirectIncome ? params.indirectIncome.substring(0, params.indirectIncome.length - 1) : '',
        directIncome2: params.directIncome2 ? params.directIncome2.substring(0, params.directIncome2.length - 1) : '',
        indirectIncome2: params.indirectIncome2 ? params.indirectIncome2.substring(0, params.indirectIncome2.length - 1) : '',
        directIncome3: params.directIncome3 ? params.directIncome3.substring(0, params.directIncome3.length - 1) : '',
        indirectIncome3: params.indirectIncome3 ? params.indirectIncome3.substring(0, params.indirectIncome3.length - 1) : ''
      })
      this.visible = true
      if (params.id) {
        this.getInfo(params.id)
      } else {
        this.$refs.formData && this.$refs.formData.resetFields()
      }
    },
    async getInfo(id) {
      const loading = this.$elLoading('加载中')
      try {
        const res = await commissionSelectByPrimaryKey({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          plateType: res.data.plateType || '',
          businessName: res.data.businessName || '',
          expenseType: res.data.expenseType || '',
          expense: res.data.expense || '',
          directIncome: res.data.directIncome ? res.data.directIncome.substring(0, res.data.directIncome.length - 1) : '',
          indirectIncome: res.data.indirectIncome ? res.data.indirectIncome.substring(0, res.data.indirectIncome.length - 1) : '',
          directIncome2: res.data.directIncome2 ? res.data.directIncome2.substring(0, res.data.directIncome2.length - 1) : '',
          indirectIncome2: res.data.indirectIncome2 ? res.data.indirectIncome2.substring(0, res.data.indirectIncome2.length - 1) : '',
          directIncome3: res.data.directIncome3 ? res.data.directIncome3.substring(0, res.data.directIncome3.length - 1) : '',
          indirectIncome3: res.data.indirectIncome3 ? res.data.indirectIncome3.substring(0, res.data.indirectIncome3.length - 1) : '',
          businessContent: res.data.businessContent || '',
          remarks: res.data.remarks || ''
        })
        this.$nextTick(() => { // 之所以用nextTick，是因为要validate且region_arr是个数组（对象），element内部有处理
          this.$refs.formData && this.$refs.formData.validate()
        })
      } finally {
        loading.close()
      }
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const { directIncome, indirectIncome, directIncome2, indirectIncome2, directIncome3, indirectIncome3, ...otps } = this.formData
        const params = {
          directIncome: directIncome + '%',
          indirectIncome: indirectIncome + '%',
          directIncome2: directIncome2 + '%',
          indirectIncome2: indirectIncome2 + '%',
          directIncome3: directIncome3 + '%',
          indirectIncome3: indirectIncome3 + '%',
          ...otps
        }
        this.formData.id ? await commissionUpdateByPrimaryKeySelective(params) : await commissionInsertSelective(params)
        loading.close()
        this.$elMessage(`${this.formData.id ? '编辑' : '添加'}成功!`)
        this.$emit('success')
        this.visible = false
      } catch (e) {
        loading.close()
      } finally {
        loading.close()
      }
    }
  }
}
</script>

