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
      <el-form-item label="快递公司" prop="shipChannel">
        <el-select v-model="formData.shipChannel" clearable filterable placeholder="请选择快递公司">
          <el-option
            v-for="item in shipChannelList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="快递单号" prop="shipSn">
        <el-input
          v-model="formData.shipSn"
          placeholder="请输入快递单号"
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
import { orderListShipChannel, orderShip } from '@/api/orderManagement/order'

export default {
  name: 'DeliverModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '520px',
        title: '订单发货'
      },
      visible: false,
      formData: {
        orderId: '',
        shipChannel: '',
        shipSn: '',
      },
      formRules: {
        shipChannel: [
          { required: true, message: '请选择快递公司' },
        ],
        shipSn: [
          { required: true, message: '请输入快递单号' },
        ],
      },
      shipChannelList: []
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.getShipChannelList()
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    async getShipChannelList() {
      const res = await orderListShipChannel()
      this.shipChannelList = res.data.shipChannelList
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const res = await orderShip(this.formData)
        loading.close()
        this.$elMessage(`发货成功!`)
        this.$emit('success')
        this.visible = false
      } catch(e) {
        loading.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
