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
			<el-form-item label="申请类型" prop="applicationType">
				<el-radio-group v-model="formData.applicationType">
					<el-radio v-if="!isPartner" :label="6">合伙人</el-radio>
					<el-radio :label="7">超级合伙人</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="区域" prop="region_arr">
				<el-cascader
					v-model="formData.region_arr"
					placeholder="请选择区域"
					:options="common_regionList"
					:props="{ label: 'name', value: 'code' }"
					expand-trigger="hover"
					clearable
				/>
			</el-form-item>
			<el-form-item label="业务责任人" prop="referrerName">
				<el-input v-model="formData.referrerName" size="mini" disabled placeholder="请输入业务责任人" />
			</el-form-item>
			<el-form-item
				v-if="formData.applicationType == 7"
				label="账号"
				prop="username"
			>
				<el-input v-model="formData.username" clearable placeholder="请输入账号" />
			</el-form-item>
			<el-form-item
				v-if="formData.applicationType == 7"
				label="密码"
				prop="password"
			>
				<el-input v-model="formData.password" clearable placeholder="请输入密码" />
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="handleClose">取 消</el-button>
			<el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { partnerApplySaveAndSignin } from '@/api/userManagement/memberList'
import XeUtils from 'xe-utils'
import { mapGetters } from 'vuex'

export default {
	name: 'PartnerApplyModal',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '520px',
				title: '升级申请'
			},
			visible: false,
			formData: {
				userId: '',
				applicationType: '',
				region_arr: [],
				referrerName: '',
				referrerId: '',
				username: '',
				password: ''
			},
			formRules: {
				applicationType: [
					{ required: true, message: '请选择申请类型' }
				],
				region_arr: [
					{ required: true, type: 'array', message: '请选择区域' }
				],
				referrerName: [
					{ required: true, message: '请输入业务责任人' }
				],
				username: [
					{ required: true, message: '请输入账号' },
					{ min: 4, message: '不得少于4位', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码' },
					{ min: 6, message: '不得少于6位', trigger: 'blur' }
				]
			},
			isPartner: false
		}
	},
	computed: {
		...mapGetters([
			'common_regionList'
		])
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}, regionCode = '') {
			this.formData = Object.assign(this.$options.data().formData, params)
			this.isPartner = params.applicationType === 7
			this.isPartner ? this.modalOptions.title = '合伙人升级申请' : this.modalOptions.title = '会员升级申请'
			regionCode && this.setRegion_arr(regionCode)
			// this.principalId = params.principalId
			// this.principalName = params.principalName
			this.formData.referrerName = params.principalName || '团蜂'
			this.formData.referrerId = params.principalName || 0
			this.visible = true
			this.$refs.formData && this.$refs.formData.resetFields()
		},
		setRegion_arr(regionCode) {
			const regionItem = XeUtils.findTree(this.common_regionList, (item) => item.code === regionCode)
			if (regionItem && Array.isArray(regionItem.nodes)) {
				this.formData.region_arr = regionItem.nodes.map((v) => v.code)
			}
		},
		async handleSubmit() {
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				const { region_arr, ...opts } = this.formData
				const params = {
					...opts,
					regionCode: region_arr[region_arr.length - 1]
				}
				const res = await partnerApplySaveAndSignin(params)
				loading.close()
				this.$elMessage()
				this.$emit('success')
				this.visible = false
			} catch (e) {
				loading.close()
			}
		}
	}
}
</script>

