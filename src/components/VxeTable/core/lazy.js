import Vue from 'vue'
import XEUtils from 'xe-utils'
import 'vxe-table/lib/style.css'

import {
	// 核心
	VXETable,

	// 功能模块
	Icon,
	Header,
	Footer,

	// 可选组件
	Grid,
	Checkbox,
	Tooltip,

	// 表格
	Table,
	Column,

	// 列表
	List,
	Export
	// Pager,
	// Select
} from 'vxe-table'

import zhCN from 'vxe-table/lib/locale/lang/zh-CN'

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
	i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
})

VXETable.setup({
	size: 'small',
	table: {
		tooltipConfig: {
			theme: 'light',
			enterable: true
		},
		expandConfig: {
			trigger: 'row',
			showIcon: true
		},
		treeConfig: {
			indent: 0,
			showIcon: true
		}
	}
})

// 表格功能
Vue.use(Icon)
	.use(Header)
	.use(Footer)

// 可选组件
	.use(Grid)
	.use(Checkbox)
	.use(Tooltip)
	.use(Column)
	.use(List)
	.use(Export)
// 安装表格
	.use(Table)
