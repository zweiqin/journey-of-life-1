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
      label-width="180px"
    >
      <!-- 提现申请信息 -->
      <el-form-item label="提现金额" prop="amount">
        {{ formData.amount || '--' }}
      </el-form-item>
      <el-form-item label="提现单号" prop="orderNo">
        {{ formData.orderNo || '--' }}
      </el-form-item>
      <el-form-item label="收款人持卡人姓名" prop="receiverName">
        {{ formData.receiverName || '--' }}
      </el-form-item>
      <el-form-item label="手续费" prop="fee">
        {{ formData.fee || '--' }}
      </el-form-item>
      <el-form-item label="订单状态" prop="orderStatus">
        <el-tag v-if="formData.orderStatus === 0" type="warning">未审核</el-tag>
        <el-tag v-else-if="formData.orderStatus === 1" type="primary">通过审核</el-tag>
        <el-tag v-else-if="formData.orderStatus === 2" type="info">不通过</el-tag>
        <el-tag v-else-if="formData.orderStatus === 3" type="success">提现已到账</el-tag>
        <el-tag v-else-if="formData.orderStatus === 4" type="danger">提现失败</el-tag>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="第三方错误码" prop="errorCode">
        {{ formData.errorCode || '--' }}
      </el-form-item>
      <el-form-item label="提现银行名称" prop="bankName">
        {{ formData.bankName || '--' }}
      </el-form-item>
      <el-form-item label="银行卡号" prop="receiverAccount">
        {{ formData.receiverAccount || '--' }}
      </el-form-item>
      <el-form-item label="银行卡提现渠道" prop="bankChannel">
        <el-tag v-if="formData.bankChannel === 1" type="primary">手动打款</el-tag>
        <el-tag v-else-if="formData.bankChannel === 2" type="success">通联</el-tag>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="实际到账金额" prop="realAmount">
        {{ formData.realAmount || '--' }}
      </el-form-item>
      <el-form-item label="来源类型" prop="sourceType">
        <span v-if="formData.sourceType === 0">店长</span>
        <span v-else-if="formData.sourceType === 1">师傅</span>
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="审核时间" prop="auditTime">
        {{ formData.auditTime || '--' }}
      </el-form-item>
      <el-form-item label="申请提现时间" prop="createTime">
        {{ formData.createTime || '--' }}
      </el-form-item>
      <el-form-item label="第三方流水号" prop="outTradeNo">
        {{ formData.outTradeNo || '--' }}
      </el-form-item>
      <el-form-item label="到账时间" prop="arrivaTime">
        {{ formData.arrivaTime || '--' }}
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        {{ formData.remark || '--' }}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// import { xxx } from '@/api/xxx/xxx'

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '600px',
        title: '查看提现申请详情'
      },
      visible: false,
      formData: {
        amount: '',
        orderNo: '',
        receiverName: '',
        fee: '',
        orderStatus: '',
        errorCode: '',
        bankName: '',
        receiverAccount: '',
        bankChannel: '',
        realAmount: '',
        sourceType: '',
        auditTime: '',
        createTime: '',
        outTradeNo: '',
        arrivaTime: '',
        remark: ''
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
        // this.getInfo(params.id)
      }
      this.visible = true
    },
    async getInfo(id) {
      const loading = this.$elLoading('加载中')
      try {
        const res = await xxx({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          amount: res.data.amount || '',
          orderNo: res.data.orderNo || '',
          receiverName: res.data.receiverName || '',
          fee: res.data.fee || '',
          orderStatus: res.data.orderStatus,
          errorCode: res.data.errorCode || '',
          bankName: res.data.bankName || '',
          receiverAccount: res.data.receiverAccount || '',
          bankChannel: res.data.bankChannel,
          realAmount: res.data.realAmount || '',
          sourceType: res.data.sourceType,
          auditTime: res.data.auditTime || '',
          createTime: res.data.createTime || '',
          outTradeNo: res.data.outTradeNo || '',
          arrivaTime: res.data.arrivaTime || '',
          remark: res.data.remark || ''
        })
      } finally {
        loading.close()
      }
    }
  }
}
</script>

