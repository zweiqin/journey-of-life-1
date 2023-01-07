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
      <el-form-item label="类目名称" prop="name">
        <el-input
          v-model="formData.name"
          maxlength="30"
          show-word-limit
          placeholder="请输入类目名称"
        />
      </el-form-item>
      <el-form-item label="关键字" prop="keywords">
        <el-input
          v-model="formData.keywords"
          placeholder="请输入关键字"
        />
      </el-form-item>
      <el-form-item label="级别" prop="level">
        <el-select v-model="formData.level" placeholder="请选择级别" @change="levelChange">
          <el-option
            v-for="item in levelList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <template v-if="formData.level === 'L2'">
        <el-form-item label="父类目" prop="pid">
          <el-select v-model="formData.pid" placeholder="请选择父类目">
            <el-option
              v-for="item in categoryL1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </template>
      <template v-if="formData.level === 'L3'">
        <el-form-item label="一级类目" prop="parentId">
          <el-select v-model="formData.parentId" placeholder="请选择一级类目" @change="getCategoryL2">
            <el-option
              v-for="item in categoryL1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="二级类目" prop="pid">
          <el-select v-model="formData.pid" placeholder="请选择二级类目">
            <el-option
              v-for="item in categoryL2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </template>

      <el-form-item label="类目图标" prop="iconUrl">
        <MyUpload v-model="formData.iconUrl" accept="image/*" />
      </el-form-item>
      <el-form-item label="类目图片" prop="picUrl">
        <MyUpload v-model="formData.picUrl" accept="image/*" />
      </el-form-item>

      <el-form-item label="类目简介" prop="desc">
        <el-input
          v-model="formData.desc"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
          maxlength="520"
          show-word-limit
          placeholder="请输入类目简介"
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
  categoryCreate,
  categoryUpdate,
  categoryRead,
  categoryTreeList,
} from '@/api/goods/goodsCategory';
import MyUpload from '@/components/MyUpload'
import XeUtils from 'xe-utils';

export default {
  name: 'EditModal',
  components: {
    MyUpload
  },
  data() {
    return {
      modalOptions: {
        top: '5vh',
        closeOnClickModal: false,
        width: '520px',
        title: ''
      },
      visible: false,
      formData: {
        id: '',
        name: '',
        keywords: '',
        level: 'L2',
        pid: '',
        parentId: '',
        iconUrl: '',
        picUrl: '',
        desc: ''
      },
      formRules: {
        type: [
          { required: true, message: '请选择问题范围' },
        ],
     
        name: [
          { required: true, message: '请输入问题内容' },
          { max: 30, message: '100字以内' },
        ],
        level: [
          { required: true, message: '请选择级别' },
        ],
        pid: [
          { required: true, message: '请选择类目' },
        ],
        parentId: [
          { required: true, message: '请选择类目' },
        ],
        desc: [
          { max: 520, message: '520字以内' },
        ],
      },
      levelList: [
        { label: '一级类目', value: 'L1' },
        { label: '二级类目', value: 'L2' },
        { label: '三级类目', value: 'L3' },
      ],
      categoryL1: [],
      categoryL2: [],
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    async handleOpen(params = {}) {
      this.modalOptions.title = params.id ? '编辑类目' : '添加类目'
      if (params.id) {
        const res = await categoryRead({ id: params.id })
        const data = {
          id: res.data.id,
          name: res.data.name,
          keywords: res.data.keywords,
          level: res.data.level,
          pid: res.data.pid,
          iconUrl: res.data.iconUrl,
          picUrl: res.data.picUrl,
          desc: res.data.desc,
        }
        this.formData = Object.assign(this.$options.data().formData, data)
      }
      this.visible = true
      this.$refs.formData && this.$refs.formData.resetFields()
      this.getCategoryTreeList()
    },
    async getCategoryTreeList() {
      const res = await categoryTreeList()
      this.categoryL1 = res.data.items
      if (this.formData.pid && this.formData.level === 'L3') {
        const categoryItem = XeUtils.findTree(this.categoryL1, item => item.value === this.formData.pid)
        // 找到父id
        if (categoryItem && categoryItem.parent) {
          const parentId = categoryItem.parent.value
          this.formData.parentId = parentId
          this.categoryL2 = categoryItem.item.children
        }
      }
    },
    async getCategoryL2(id) {
      this.formData.pid = ''
      const childItem = this.categoryL1.find(item => item.value === id)
      this.categoryL2 = childItem ? childItem.children : []
    },
    levelChange() {
      this.formData.pid = ''
      this.formData.parentId = ''
    },
    async handleSubmit() {
      await this.$validatorForm('formData')
      const res = this.formData.id ? await categoryUpdate(this.formData) : await categoryCreate(this.formData)
      this.$message.success(`${this.formData.id ? '编辑' : '添加'}成功!`)
      this.$emit('success')
      this.visible = false
    }
  }
}
</script>

