<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="modalOptions"
  >
    <el-form
      ref="formData"
      :model="formData"
      size="mini"
      label-suffix=":"
      label-width="120px"
    >
      <el-card style="margin-bottom:20px;">
        <h4 slot="header">负责人设置</h4>
        <el-form-item label="责任人类型" prop="businessType">
          <el-radio-group v-model="formData.businessType" @change="businessTypeChange">
            <el-radio :label="1">员工</el-radio>
            <el-radio :label="2">合伙人</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 员工 -->
        <template v-if="formData.businessType==1">
          <el-form-item label="业务责任人" prop="businessCharge">
            <el-select v-model="formData.businessCharge" placeholder="请选择业务责任人">
              <el-option
                v-for="item in staffList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >{{ item.roleName }}-{{item.name}}</el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="交付责任人" prop="deliveryCharge">
            <el-select v-model="formData.deliveryCharge" placeholder="请选择交付责任人">
              <el-option
                v-for="item in staffList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >{{ item.roleName }}-{{item.name}}</el-option>
              </el-select>
          </el-form-item>
        </template>
        <!-- 合伙人 -->
        <template v-if="formData.businessType==2">
          <el-form-item label="业务责任人" prop="businessCharge">
            <el-select v-model="formData.businessCharge" placeholder="请选择业务责任人">
              <el-option
                v-for="item in parentList"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              />
              </el-select>
          </el-form-item>
          <el-form-item label="交付责任人" prop="deliveryCharge">
            <el-select v-model="formData.deliveryCharge" placeholder="请选择交付责任人">
              <el-option
                v-for="item in parentList"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              />
              </el-select>
          </el-form-item>
        </template>
      </el-card>
      <!-- 门店信息 -->
      <el-form-item label="公司名称" prop="brandname">
        {{ formData.brandname || '--' }}
      </el-form-item>
      <el-form-item label="店主名称" prop="keeperName">
        {{ formData.keeperName || '--' }}
      </el-form-item>
      <el-form-item label="简介" prop="desc">
        {{ formData.desc || '--' }}
      </el-form-item>
      <el-form-item label="电话" prop="brandPhone">
        {{ formData.brandPhone || '--' }}
      </el-form-item>
      <el-form-item label="地址" prop="address">
        {{ formData.address || '--' }}
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        {{ formData.longitude || '--' }}
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        {{ formData.latitude || '--' }}
      </el-form-item>
      <el-form-item label="区域" prop="regionName">
        {{ formData.regionName || '--' }}
      </el-form-item>
      <el-form-item label="公司图片" prop="picUrl">
        <el-image v-if="formData.picUrl" :src="formData.picUrl" style="width:80px; height:80px" fit="cover" :preview-src-list="[formData.picUrl]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="Logo" prop="logoUrl">
        <el-image v-if="formData.logoUrl" :src="formData.logoUrl" style="width:80px; height:80px" fit="cover" :preview-src-list="[formData.logoUrl]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="店铺图片" prop="picUrls">
        <el-image v-for="item in formData.picUrls" :key="item" :src="item" style="width:80px; height:80px;margin-right:4px" fit="cover" :preview-src-list="picUrls" />
        <span v-if="!formData.picUrls.length">--</span>
      </el-form-item>
      <el-form-item label="营业执照" prop="licenseUrl">
        <el-image v-if="formData.licenseUrl" :src="formData.licenseUrl" style="width:80px; height:80px" fit="cover" :preview-src-list="[formData.licenseUrl]" />
        <span v-else>--</span>
      </el-form-item>
      <el-form-item label="开始营业时间" prop="startTime">
        {{ formData.startTime || '--' }}
      </el-form-item>
      <el-form-item label="结束营业时间" prop="endTime">
        {{ formData.endTime || '--' }}
      </el-form-item>
      <el-form-item label="入驻说明" prop="explain">
        {{ formData.explain || '--' }}
      </el-form-item>
      <el-form-item label="门店风格" prop="styleName">
        {{ formData.styleName || '--' }}
      </el-form-item>
      <el-form-item label="门店标签" prop="labelName">
        {{ formData.labelName || '--' }}
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="handleClose">关闭</el-button>
      <el-button
        v-if="formData.status == 1"
        v-permission="[`POST /admin${api.userupManage}`]"
        type="danger"
        @click="handleReject"
      >驳回</el-button>
      <el-button
        v-if="formData.status == 1"
        v-permission="[`POST /admin${api.userupSignin}`]"
        type="primary"
        size="mini"
        @click="handleUpgrade"
      >通过并注册</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MyUpload from '@/components/MyUpload'
import {
  api,
  userupManage,
  userupSignin,
} from '@/api/brand/brandApply'
import { staffList } from '@/api/enterprise/staff'
import { userList } from '@/api/userManagement/memberList'

export default {
  name: 'ExamineModal',
  components: {
    MyUpload
  },
  data() {
    return {
      api,
      modalOptions: {
        closeOnClickModal: false,
        width: '800px',
        title: '门店审核'
      },
      visible: false,
      formData: {
        id: '',
        businessType: '',
        businessCharge: '',
        deliveryCharge: '',
        picUrls: [],
      },
      staffList: [],
      parentList: [],
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}) {
      this.getStaffList()
      this.getParentList()
      this.formData = Object.assign(this.$options.data().formData, params)
      this.visible = true
    },
    // 员工列表
    async getStaffList() {
      const res = await staffList({
        page: 1,
        limit: 9999,
      })
      this.staffList = res.data.items
    },
    // 合伙人列表
    async getParentList() {
      const res = await userList({
        userLevel: 6,
        page: 1,
        limit: 99999,
      })
      this.parentList = res.data.items
     },
    businessTypeChange() {
      this.formData.businessCharge = ''
      this.formData.deliveryCharge = ''
    },
    async handleReject() {
      const comment = await this.$elPrompt('驳回理由')
      await userupManage({
        id: this.formData.id,
        stateEnum: 2,
        comment
      })
      this.$elMessage('操作成功!')
      this.$emit('success')
      this.visible = false
    },
    async handleUpgrade() {
      await userupSignin({
        id: this.formData.id,
        userId: this.formData.userId,
      })
      this.$elMessage('操作成功!')
      this.$emit('success')
      this.visible = false
    },
  }
}
</script>

