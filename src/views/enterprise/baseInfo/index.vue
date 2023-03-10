<template>
	<div class="app-container">
		<div class="body-container">
			<el-card class="box-card">
				<h3 slot="header">{{ formData.id ? '编辑' : '添加' }}门店信息</h3>
				<el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="150px">
					<el-form-item label="公司名称" prop="name">
						<el-input v-model="formData.name" placeholder="请输入公司名称" maxlength="30" show-word-limit />
					</el-form-item>
					<el-form-item label="店主名称" prop="keeperName">
						<el-input v-model="formData.keeperName" placeholder="请输入店主名称" maxlength="30" show-word-limit />
					</el-form-item>
					<el-form-item label="简介" prop="desc">
						<el-input
							v-model="formData.desc" type="textarea" placeholder="请输入简介" maxlength="520"
							:rows="3"
							show-word-limit
						/>
					</el-form-item>
					<el-form-item label="电话" prop="phone">
						<el-input v-model="formData.phone" placeholder="请输入电话" maxlength="30" />
					</el-form-item>
					<el-form-item label="地址" prop="address">
						<el-input v-model="formData.address" placeholder="请输入地址" maxlength="30" />
					</el-form-item>
					<el-form-item label="经度" prop="longitude">
						<el-input v-model="formData.longitude" placeholder="请输入经度" />
					</el-form-item>
					<el-form-item label="纬度" prop="latitude">
						<el-input v-model="formData.latitude" placeholder="请输入纬度" />
					</el-form-item>
					<el-form-item label="区域" prop="region_arr">
						<el-cascader
							v-model="formData.region_arr" placeholder="请选择区域" :options="common_regionList"
							:props="{ label: 'name', value: 'code', expandTrigger: 'hover' }" clearable
						/>
					</el-form-item>
					<el-form-item label="公司图片" prop="picUrl">
						<MyUpload v-model="formData.picUrl" />
					</el-form-item>
					<el-form-item label="Logo" prop="logoUrl">
						<MyUpload v-model="formData.logoUrl" />
					</el-form-item>
					<el-form-item label="店铺图片" prop="picUrls">
						<MyUpload v-model="formData.picUrls" :limit="9" />
					</el-form-item>
					<el-form-item label="营业执照" prop="licenseUrl">
						<MyUpload v-model="formData.licenseUrl" />
					</el-form-item>
					<el-form-item label="开始营业时间" prop="startTime">
						<el-date-picker
							v-model="formData.startTime" type="date" value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="选择开始营业时间"
						/>
					</el-form-item>
					<el-form-item label="结束营业时间" prop="endTime">
						<el-date-picker
							v-model="formData.endTime" type="date" value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="选择结束营业时间"
						/>
					</el-form-item>
					<el-form-item label="入驻说明" prop="explain">
						<el-input
							v-model="formData.explain" type="textarea" placeholder="请输入入驻说明" maxlength="520"
							:rows="3"
							show-word-limit
						/>
					</el-form-item>
					<el-form-item label="门店风格" prop="styleId">
						<el-select v-model="formData.styleId" placeholder="请选择门店风格">
							<el-option v-for="item in brandStyleList" :key="item.id" :label="item.name" :value="item.id" />
						</el-select>
					</el-form-item>
					<el-form-item label="门店标签" prop="labelId">
						<el-select v-model="formData.labelId" placeholder="请选择门店标签">
							<el-option v-for="item in brandLabelList" :key="item.code" :label="item.value" :value="item.code" />
						</el-select>
					</el-form-item>

				</el-form>
			</el-card>
		</div>

		<div class="footer-container">
			<el-button size="medium" @click="handleReset">重置</el-button>
			<el-button type="primary" size="medium" @click="handleSubmit">保存</el-button>
		</div>

	</div>
</template>

<script>
import MyUpload from '@/components/MyUpload'
import { brandRead, brandCreate, brandUpdate, brandLabelList } from '@/api/brand/brandList'
import { brandStyleList } from '@/api/brand/brandStyle'
import { mapGetters } from 'vuex'
import XeUtils from 'xe-utils'

export default {
	name: 'BaseInfo',
	components: {
		MyUpload
	},
	computed: {
		...mapGetters([
			'common_regionList'
		])
	},
	data() {
		return {
			brandLabelList: [],
			brandStyleList: [],
			formData: {
				id: '',
				name: '',
				keeperName: '',
				desc: '',
				phone: '',
				address: '',
				longitude: '',
				latitude: '',
				region_arr: [],
				picUrl: '',
				logoUrl: '',
				picUrls: [],
				licenseUrl: '',
				startTime: '',
				endTime: '',
				explain: '',
				styleId: '',
				labelId: ''
			},
			formRules: {
				name: [
					{ required: true, message: '请输入公司名称' }
				],
				keeperName: [
					{ required: true, message: '请输入店主名称' }
				],
				desc: [
					{ required: true, message: '请输入简介' }
				],
				phone: [
					{ required: true, message: '请输入电话' }
				],
				address: [
					{ required: true, message: '请输入地址' }
				],
				longitude: [
					{ required: true, message: '请输入经度' }
				],
				latitude: [
					{ required: true, message: '请输入纬度' }
				],
				region_arr: [
					{ required: true, type: 'array', message: '请选择区域' }
				],
				picUrl: [
					{ required: true, message: '请上传公司图片' }
				],
				licenseUrl: [
					{ required: true, message: '请上传营业执照' }
				],
				styleId: [
					{ required: true, message: '请选择门店风格' }
				],
				labelId: [
					{ required: true, message: '请选择门店标签' }
				]
			}
		}
	},
	created() {
		this.initList()
		this.getInfo()
	},
	methods: {
		initList() {
			this.getBrandLabelList()
			this.getBrandStyleList()
		},
		async getInfo() {
			const loading = this.$elLoading('加载中')
			try {
				const res = await brandRead()
				console.log('res.data', res)
				if (res.data && res.data.id) {
					this.formData = Object.assign(this.$options.data().formData, res.data, {
						picUrl: res.data.picUrl || '',
						picUrls: res.data.picUrls || [],
						logoUrl: res.data.logoUrl || '',
						licenseUrl: res.data.licenseUrl || ''
					})
					res.data.regionCode && this.setRegion_arr(res.data.regionCode)
				}
				this.$refs.formData && this.$refs.formData.resetFields()
			} finally {
				loading.close()
			}
		},
		setRegion_arr(regionCode) {
			const regionItem = XeUtils.findTree(this.common_regionList, (item) => item.code === regionCode)
			if (regionItem && Array.isArray(regionItem.nodes)) {
				this.formData.region_arr = regionItem.nodes.map((v) => v.code)
			}
		},
		// 商品标签
		async getBrandLabelList() {
			const res = await brandLabelList()
			this.brandLabelList = res.data.data
		},
		// 商品风格
		async getBrandStyleList() {
			const res = await brandStyleList({
				page: 1,
				limit: 9999
			})
			this.brandStyleList = res.data.items
		},
		handleReset() {
			this.getInfo()
		},
		async handleSubmit() {
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				const { id, region_arr, ...opts } = this.formData
				const params = {
					...opts,
					id,
					regionCode: region_arr[region_arr.length - 1]
				}
				id ? await brandUpdate(params) : await brandCreate(params)
				loading.close()
				this.$elMessage('保存成功!')
				this.getInfo()
			} catch (e) {
				loading.close()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.el-input,
.el-textarea,
.el-select,
.el-cascader {
	width: 400px;
}

.input-new-keyword {
	width: 90px;
	margin-left: 10px;
	vertical-align: bottom;
}

.app-container {
	height: 100%;
	padding: 0;
}

.body-container {
	flex: 1;
	overflow-y: auto;

	.el-card {
		margin: 20px;
	}

	.el-tag+.el-tag {
		margin-left: 10px;
	}
}

.footer-container {
	padding: 10px 20px;
	display: flex;
	justify-content: center;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>
