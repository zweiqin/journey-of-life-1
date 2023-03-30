<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="modalOptions"
  >
    <el-form
      ref="formData"
      :model="formData"
      size="mini"
      label-position="left"
      label-suffix=":"
      label-width="200px"
    >
      <!-- 佣金信息 -->
      <el-form-item label="ID" prop="id">
        {{ formData.id || '--' }}
      </el-form-item>
      <el-form-item label="板块类型" prop="plateType">
        <span v-if="formData.plateType === 1">社区</span>
        <span v-else-if="formData.plateType === 2">物流</span>
        <span v-else-if="formData.plateType === 3">家居新零售</span>
        <span v-else-if="formData.plateType === 4">材料</span>
        <span v-else-if="formData.plateType === 5">新媒体</span>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="业务名称" prop="businessName">
        {{ formData.businessName || '--' }}
      </el-form-item>
      <el-form-item label="费用类型" prop="expenseType">
        <span v-if="formData.expenseType === 1">金额</span>
        <span v-else-if="formData.expenseType === 2">比例</span>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="费用金额" prop="expense">
        {{ formData.expense ? formData.expenseType === 1 ? `¥${commafyFn(formData.expense)}` : `${formData.expense}%` : '--' }}
      </el-form-item>

      <el-form-item label="超级合伙人的直接拓展收入" prop="directIncome">
        {{ formData.directIncome || '--' }}
      </el-form-item>
      <el-form-item label="超级合伙人的间接拓展收入" prop="indirectIncome">
        {{ formData.indirectIncome || '--' }}
      </el-form-item>
      <el-form-item label="超级合伙人的直接业务收入" prop="directIncome2">
        {{ formData.directIncome2 || '--' }}
      </el-form-item>
      <el-form-item label="超级合伙人的间接业务收入" prop="indirectIncome2">
        {{ formData.indirectIncome2 || '--' }}
      </el-form-item>
      <el-form-item label="合伙人的拓展收入" prop="directIncome3">
        {{ formData.directIncome || '--' }}
      </el-form-item>
      <el-form-item label="合伙人的业务收入" prop="indirectIncome3">
        {{ formData.indirectIncome || '--' }}
      </el-form-item>

      <el-form-item label="备注" prop="remarks">
        {{ formData.remarks || '--' }}
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
import { commissionSelectByPrimaryKey } from '@/api/brand/commissionQuery'
import { commafyFn } from '@/utils'

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '查看佣金详情'
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
        remarks: '',
        createTime: '',
        updateTime: '',
        isDelete: ''
      }
    }
  },
  methods: {
    commafyFn,
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
        const res = await commissionSelectByPrimaryKey({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          plateType: res.data.plateType || '',
          businessName: res.data.businessName || '',
          expenseType: res.data.expenseType || '',
          expense: res.data.expense || '',
          directIncome: res.data.directIncome || '',
          indirectIncome: res.data.indirectIncome || '',
          directIncome2: res.data.directIncome2 || '',
          indirectIncome2: res.data.indirectIncome2 || '',
          directIncome3: res.data.directIncome3 || '',
          indirectIncome3: res.data.indirectIncome3 || '',
          businessContent: res.data.businessContent || '',
          remarks: res.data.remarks || '',
          createTime: res.data.createTime || '',
          updateTime: res.data.updateTime || '',
          isDelete: res.data.isDelete || ''
        })
      } finally {
        loading.close()
      }
    }
  }
}
</script>

