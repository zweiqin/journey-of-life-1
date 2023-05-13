<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      v-bind="{ closeOnClickModal: false, width: '1100px', title: '主营区域', modal: true, showClose: false }"
      class="master-dialog-service-only" custom-class="master-dialog-area"
    >
      <div slot="title" style="padding-bottom: 10px;border-bottom: 1px solid #eaeaea;">
        <div style="display: flex;font-size: 18px;">
          <div>主营区域（{{ formData.sfUserWorkCityArr.length }}个）</div>
        </div>
      </div>
      <el-form ref="formData" :model="formData" label-position="left" label-width="0px" label-suffix="" size="mini">
        <div style="margin-top: 5px;">
          <el-form-item label="" prop="sfUserWorkCity">
            <!-- {{ formData.sfUserWorkCity ? formData.sfUserWorkCity.replaceAll(',', '，\n') : '--' }} -->
            <div v-if="formData.sfUserWorkCity">
              <div v-for="i in formData.sfUserWorkCity.split(',')" :key="i" style="margin-bottom: 10px;">
                <span>{{ i }}</span>
              </div>
            </div>
            <div v-else>--</div>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" style="text-align: center;">
        <el-button style="padding: 10px 32px;" type="danger" size="medium" @click="visible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getPartnerInfo } from '@/api/enterprise/partnerList'

export default {
  name: 'DetailModalWC',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '1100px',
        title: '主营区域详情',
        beforeClose: this.handleClose
      },
      visible: false,
      formData: {
        id: '',
        sfUserId: '',
        sfUserName: '',
        sfUserPhone: '',
        sfUserWorkCity: '',
        sfUserWorkCityArr: [],
        zzUserId: '',
        zzUserName: '',
        zzUserPhone: '',
        zzUserServerCity: '',
        status: '',
        cause: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
      // this.visible = false
    },
    handleOpen(params = {}) {
      this.formData = Object.assign(this.$options.data().formData, params, {
        sfUserWorkCityArr: params.sfUserWorkCity ? params.sfUserWorkCity.split(',') : []
      })
      if (params.id) {
        // this.getInfo(params.id)
      }
      this.visible = true
    },
    async getInfo(id) {
      const loading = this.$elLoading('加载中')
      try {
        const res = await getPartnerInfo({ id })
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
          sfUserWorkCityArr: res.data.sfUserWorkCity ? res.data.sfUserWorkCity.split(',') : [],
          status: res.data.status,
          cause: res.data.cause || ''
        })
      } finally {
        loading.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

/deep/ .master-dialog-service-only {
	top: 25vh;
}

/deep/ .el-dialog {
	&.master-dialog-area {
		margin-top: 0px !important;
		margin-bottom: 5vh !important;
		max-height: calc(85vh - 387px); // 100-（10vh + 387px）-（底5vh）
	}

	.el-dialog__header {
		font-size: 18px;
		font-weight: bold;
		color: #333333;
	}

	.el-dialog__body {
		padding: 0 25px 30px;
		font-size: 18px;
		color: #000000;

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
