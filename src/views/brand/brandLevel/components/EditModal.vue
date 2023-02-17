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
      label-width="160px"
    >
      <el-form-item label="等级名称" prop="name">
        <el-input
          v-model="formData.name"
          maxlength="30"
          show-word-limit
          placeholder="请输入等级名称"
        />
      </el-form-item>
      <el-form-item label="等级折扣" prop="discount">
        <el-input
          v-model="formData.discount"
          placeholder="请输入等级折扣"
        />
      </el-form-item>
      <el-form-item label="等级描述" prop="description">
        <el-input
          v-model="formData.description"
           type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
          maxlength="520"
          show-word-limit
          placeholder="请输入等级描述"
        />
      </el-form-item>
      <el-form-item label="等级所需消费总额" prop="moneyCriterion">
        <el-input
          v-model="formData.moneyCriterion"
          placeholder="请输入等级所需消费总额"
        />
      </el-form-item>
      <el-form-item label="等级所需消费次数" prop="countCriterion">
        <el-input
          v-model="formData.countCriterion"
          placeholder="请输入等级所需消费次数"
        />
      </el-form-item>
      <el-form-item label="等级所需消费的产品" prop="goodIdCriterion">
        <el-select
          v-model="formData.goodIdCriterion"
          placeholder="请选择商品"
          filterable
        >
          <el-option
            v-for="item in goodsList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.id" label="调整当前会员的等级" prop="isAdjustUserLevel">
        <el-radio-group v-model="formData.isAdjustUserLevel">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取消</el-button>
      <el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { brandLevelCreate, brandLevelUpdate } from '@/api/brand/brandLevel';
import { regZero } from '@/utils/reg'
import { goodsList } from '@/api/goods/goodsList'

export default {
  name: 'EditModal',
  components: {
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
        name: '',
        discount: '',
        description: '',
        moneyCriterion: '',
        countCriterion: '',
        goodIdCriterion: '',
        isAdjustUserLevel: 0,
      },
      formRules: {
        name: [
          { required: true, message: '请输入等级名称' },
        ],
        discount: [
          { required: true, message: '请输入等级折扣' },
          { pattern: regZero,  message: '请输入正整数' }
        ],
        description: [
          { required: true, message: '请输入等级描述' },
          { max: 520, message: '520字以内' },
        ],
        moneyCriterion: [
          { pattern: regZero,  message: '请输入正整数' }
        ],
        countCriterion: [
          { pattern: regZero,  message: '请输入正整数' }
        ],
      },
      goodsList: []
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.getGoodsList()
      this.modalOptions.title = params.id ? '编辑等级' : '添加等级'
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
    },
    // 商品列表
    async getGoodsList() {
      const res = await goodsList({
        page: 1,
        limit: 99999
      })
      this.goodsList = res.data.items
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const loading = this.$elLoading()
      try {
        const { id, isAdjustUserLevel, moneyCriterion, countCriterion, goodIdCriterion, ...opts } = this.formData
        const params = {
          ...opts,
          id,
          moneyCriterion: moneyCriterion || '',
          countCriterion: countCriterion || '',
          goodIdCriterion: goodIdCriterion || '',
          isAdjustUserLevel: id ? isAdjustUserLevel : undefined
        }
        this.formData.id ? await brandLevelUpdate(params) : await brandLevelCreate(params)
        loading.close()
        this.$elMessage(`${this.formData.id ? '编辑' : '添加'}成功!`)
        this.$emit('success', 'keepPage')
        this.visible = false
      } catch(e) {
        loading.close()
      }
    }
  }
}
</script>

