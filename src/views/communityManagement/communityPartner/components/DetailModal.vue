<template>
  <el-dialog
    :visible.sync="visible"
    v-bind="modalOptions"
    center
  >
    <el-form
      ref="formData"
      :model="formData"
      label-position="left"
      label-width="120px"
      label-suffix=""
      size="mini"
    >
      <!-- 订单信息 -->
      <div style="margin-top: 35px;">
        <div class="dialog-section-title" style="display: flex;margin-bottom: 15px;">
          <div
            style="width: 4px;margin-right: 8px;;background-image: linear-gradient(#409EFF, #2E6FAE, #071A2C);border-radius: 1px;"
          >
          </div>
          <span>合伙人信息</span>
        </div>
        <div style="display: flex;justify-content: space-between;">
          <div style="width: 40%;">
            <el-form-item label="师傅用户ID" prop="sfUserId">
              {{ formData.sfUserId || '--' }}
            </el-form-item>
            <el-form-item label="师傅用户名称" prop="sfUserName">
              {{ formData.sfUserName || '--' }}
            </el-form-item>
            <el-form-item label="师傅手机号" prop="sfUserPhone">
              {{ formData.sfUserPhone || '--' }}
            </el-form-item>
            <el-form-item label="审核状态" prop="status">
              <el-tag v-if="formData.status === 1" type="warning">已申请</el-tag>
              <el-tag v-else-if="formData.status === 2">开始审核</el-tag>
              <el-tag v-else-if="formData.status === 3" type="success">审核通过</el-tag>
              <el-tag v-else-if="formData.status === 4" type="danger">审核不通过</el-tag>
              <span v-else>--</span>
            </el-form-item>
            <el-form-item label="师傅主营区域" prop="sfUserWorkCity">
              <!-- {{ formData.sfUserWorkCity ? formData.sfUserWorkCity.replaceAll(',', '，\n') : '--' }} -->
              <div v-if="formData.sfUserWorkCity">
                <div v-for="i in formData.sfUserWorkCity.split(',')" :key="i">
                  <span>{{ i }}</span>
                </div>
              </div>
              <div v-else>--</div>
            </el-form-item>
          </div>
          <div style="width: 50%;">
            <el-form-item label="店长用户ID" prop="zzUserId">
              {{ formData.zzUserId || '--' }}
            </el-form-item>
            <el-form-item label="店长名称" prop="zzUserName">
              {{ formData.zzUserName || '--' }}
            </el-form-item>
            <el-form-item label="店长手机号" prop="zzUserPhone">
              {{ formData.zzUserPhone || '--' }}
            </el-form-item>
            <el-form-item label="审核不通过原因" prop="cause">
              {{ formData.cause || '--' }}
            </el-form-item>
            <el-form-item label="店长服务区域" prop="zzUserServerCity">
              <!-- {{ formData.zzUserServerCity ? JSON.parse(formData.zzUserServerCity).map(item => item.join(' ')).join('，<\n>') : '--' }} -->
              <div v-if="formData.zzUserServerCity">
                <div v-for="i in JSON.parse(formData.zzUserServerCity).map(item => item.join(' '))" :key="i">
                  <span>{{ i }}</span>
                </div>
              </div>
              <div v-else>--</div>
            </el-form-item>
            <!-- <el-form-item label="创建时间" prop="createTime">
              {{ formData.createTime || '--' }}
              </el-form-item>
              <el-form-item label="更新时间" prop="updateTime">
              {{ formData.updateTime || '--' }}
              </el-form-item> -->
          </div>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { partnerGetPartnerInfo } from '@/api/communityManagement/communityMember'

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '900px',
        title: ''
      },
      visible: false,
      formData: {
        id: '',
        sfUserId: '',
        sfUserName: '',
        sfUserPhone: '',
        sfUserWorkCity: '',
        zzUserId: '',
        zzUserName: '',
        zzUserPhone: '',
        zzUserServerCity: '',
        status: '',
        cause: '',
        isDelete: '',
        createTime: '',
        updateTime: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    handleOpen(params = {}, type) {
      this.modalOptions.title = type === 1 ? '合伙人详情' : type === 2 ? '团长详情' : '--'
      this.formData = Object.assign(this.$options.data().formData, params)
      if (params.id) {
        this.getInfo(params.id)
      }
      this.visible = true
    },
    async getInfo(id) {
      const loading = this.$elLoading('加载中')
      try {
        const res = await partnerGetPartnerInfo({ id })
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          sfUserId: res.data.sfUserId || '',
          sfUserName: res.data.sfUserName || '',
          sfUserPhone: res.data.sfUserPhone || '',
          sfUserWorkCity: res.data.sfUserWorkCity || '',
          zzUserId: res.data.zzUserId || '',
          zzUserName: res.data.zzUserName || '',
          zzUserPhone: res.data.zzUserPhone || '',
          zzUserServerCity: res.data.zzUserServerCity || '',
          status: res.data.status,
          cause: res.data.cause || '',
          isDelete: res.data.isDelete,
          createTime: res.data.createTime || '',
          updateTime: res.data.updateTime || ''
        })
      } finally {
        loading.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-section-title {
	font-size: 16px;
	color: #333333;
}

.form-item-line {
	/deep/ .el-form-item__content {
		line-height: 16px;
	}
}

/deep/ .el-dialog {

	.el-dialog__header {
		font-size: 18px;
		font-weight: bold;
		color: #333333;
	}

	.el-dialog__body {
		padding: 0 25px 30px;

		.el-form-item {
			margin-bottom: 6px;

			label {
				color: #9E9E9E;
			}

			.el-form-item__content {
				color: #333333;
			}
		}
	}
}
</style>
