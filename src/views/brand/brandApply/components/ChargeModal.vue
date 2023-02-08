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
			label-width="150px"
		>
			<el-form-item label="业务责任人类型" prop="businessType">
				<el-radio-group v-model="formData.businessType" @change="businessTypeChange">
					<el-radio :label="1">员工</el-radio>
					<el-radio :label="2">合伙人/超级合伙人</el-radio>
				</el-radio-group>
			</el-form-item>

			<template v-if="formData.businessType == 1">
				<el-form-item label="业务责任人" prop="businessCharge">
					<el-select v-model="formData.businessCharge" placeholder="请选择业务责任人">
						<el-option
							v-for="item in staffList"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
							{{ item.roleName }}-{{ item.name }}
						</el-option>
					</el-select>
				</el-form-item>
			</template>

			<template v-if="formData.businessType == 2">
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
			</template>

			<el-form-item label="交付责任人" prop="deliveryCharge">
				<el-select v-model="formData.deliveryCharge" placeholder="请选择交付责任人">
					<el-option
						v-for="item in staffList"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					>
						{{ item.roleName }}-{{ item.name }}
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="handleClose">取 消</el-button>
			<el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { userupSetCharge } from '@/api/brand/brandApply'
import { staffList } from '@/api/enterprise/staff'
import { userList } from '@/api/userManagement/memberList'

export default {
	name: 'ChargeModal',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '600px',
				title: '负责人设置'
			},
			visible: false,
			formData: {
				id: '',
				businessType: 1,
				businessCharge: '',
				deliveryCharge: ''
			},
			formRules: {
				businessType: [
					{ required: true, message: '请选择责任人类型' }
				],
				businessCharge: [
					{ required: true, message: '请选择业务负责人' }
				],
				deliveryCharge: [
					{ required: true, message: '请选择交付责任人' }
				]
			},
			staffList: [],
			parentList: []
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.getStaffList()
			this.getParentList()
			this.visible = true
			this.formData = Object.assign(this.$options.data().formData, params)
			this.$refs.formData && this.$refs.formData.resetFields()
		},
		// 员工列表
		async getStaffList() {
			const res = await staffList({
				page: 1,
				limit: 9999
			})
			this.staffList = res.data.items
		},
		// 合伙人列表
		async getParentList() {
			const res = await userList({
				userLevel: 6,
				page: 1,
				limit: 99999
			})
			this.parentList = res.data.items
		},
		businessTypeChange() {
			this.formData.businessCharge = ''
			this.formData.deliveryCharge = ''
		},
		async handleSubmit() {
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				const res = await userupSetCharge(this.formData)
				loading.close()
				this.$elMessage(`添加成功!`)
				this.$emit('success')
				this.visible = false
			} catch (e) {
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
