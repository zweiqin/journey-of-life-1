export const columns = [
	{
		align: 'left',
		fixed: 'left',
		field: 'id',
		title: 'ID',
		width: 100
	},
	{
		align: 'left',
		fixed: 'left',
		field: 'name',
		title: '风格名称',
		minWidth: 150
	},
	{
		align: 'left',
		field: 'picUrl',
		title: '图片',
		slots: {
			default: 'picUrl'
		},
		width: 100
	},
	{
		align: 'left',
		field: 'addTime',
		title: '创建时间',
		minWidth: 150
	},
	{
		align: 'left',
		field: 'updateTime',
		title: '更新时间',
		minWidth: 150
	},
	{
		align: 'left',
		field: 'operate',
		fixed: 'right',
		title: '操作',
		showOverflow: false,
		slots: {
			default: 'operate'
		},
		width: 150
	}
]
