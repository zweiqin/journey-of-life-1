<template>
	<div class="table-tools">
		<div class="table-tools-left">
			<slot />
		</div>
		<div class="table-tools-right">
			<el-button v-if="refresh" icon="el-icon-refresh" @click="onRefresh">刷新</el-button>
			<el-button v-if="download" icon="el-icon-download" @click="onDownload">导出</el-button>
			<CustomColumn
				v-if="customField"
				ref="customColumn"
				:is-request="false"
				@update-fields="updateFields"
				@submit="submitFields"
			/>
		</div>
	</div>
</template>

<script>
import CustomColumn from '@/components/CustomColumn'
import { cloneDeep } from 'lodash'
import { resizableRegain } from '@/components/CustomColumn/utils.js'
import XEUtils from 'xe-utils'

export default {
	name: 'TableTools',
	components: {
		CustomColumn
	},
	props: {
		refresh: {
			type: Boolean,
			default: true
		},
		download: {
			type: Boolean,
			default: false
		},
		customField: {
			type: Boolean,
			default: false
		},
		customColumnsConfig: {
			type: Object,
			default: () => ({
				localKey: '',
				columnsOptions: [],
				defaultFields: []
			})
		}
	},
	data() {
		return {
			has_checkbox: false
		}
	},
	mounted() {
		this.customField && this.getFields()
	},
	methods: {
		onRefresh() {
			this.$emit('refresh')
		},
		onDownload() {
			this.$emit('download')
		},
		// 获取自定义字段
		getFields() {
			return new Promise((resolve) => {
				// const { data } = await getFields()
				const { columnsOptions, localKey, defaultFields = [] } = this.customColumnsConfig
				const data = XEUtils.mapTree(XEUtils.clone(columnsOptions, true), (item) => {
					item.system = !!item.fixed
					return item
				})
				const newData = cloneDeep(data.filter(v => v.type !== 'checkbox'))
				this.has_checkbox = newData.length !== data.length
				const newFields = {
					localKey,
					columns: cloneDeep(newData),
					defaultFields: Array.isArray(defaultFields) && defaultFields.length ? defaultFields : columnsOptions.map((v) => v.field),
					sourceColumns: cloneDeep(newData)
				}
				this.$refs.customColumn.createFields(newFields)
				resolve()
			})
		},
		// 更新自定义字段
		updateFields(newColumns) {
			const { localKey } = this.customColumnsConfig
			this.columns = resizableRegain(localKey, newColumns) // resizableRegain 会读取用户拖拽过表格的列宽的记录
			if (this.has_checkbox) {
				this.columns.unshift({
					type: 'checkbox',
					width: 50,
					fixed: 'left',
					align: 'right',
					resizable: false
				})
			}
			this.$emit('update-fields', this.columns)
		},
		// 提交自定义字段
		async submitFields({ data, resolve }) {
			// const res = await postFields({ fields: data }) // 请求成功后需要执行resolve()扭转状态
			resolve()
			this.$message({
				message: '更新成功！',
				type: 'success'
			})
		},
		getCustomColumns() {}
	}
}
</script>

<style lang="scss" scoped>
.table-tools {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  &-left {
    flex: 1;
    padding-right: 12px;
  }
  &-right {
    min-width: 200px;
    display: flex;
    justify-content: flex-end;
    .el-button {
      padding-left: 8px;
    }
  }
}
</style>
