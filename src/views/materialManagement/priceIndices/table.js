export const columns = [
	{
		align: 'center',
		fixed: 'left',
		field: 'id',
		title: '材料ID',
		minWidth: 100
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'materialsCategory',
		title: '材料类名',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'lastMoney',
		title: '上次价格',
		minWidth: 120
	},
	{
		align: 'center',
		field: 'money',
		title: '价格',
		minWidth: 120
	},
	{
		align: 'center',
		field: 'viewPicture',
		title: '涨幅百分比',
		minWidth: 80
	},
	{
		align: 'center',
		field: 'status',
		title: '状态',
		slots: {
			default: 'status'
		}
	},
	{
		align: 'center',
		field: 'operate',
		fixed: 'right',
		title: '操作',
		showOverflow: false,
		slots: {
			default: 'operate'
		},
		width: 100
	}
]
