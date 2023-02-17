export const columns = [
	{
		fixed: 'left',
		field: 'id',
		title: 'ID',
		width: 100
	},
	{
		field: 'commission',
		title: '佣金',
		minWidth: 100
	},
	{
		field: 'userId',
		title: '获得佣金的会员ID',
		minWidth: 150
	},
	{
		field: 'produceUserId',
		title: '升级或者产生订单的会员ID',
		minWidth: 150
	},
	{
		field: 'grantTime',
		title: '发放或使用佣金时间',
		minWidth: 150
	},
	{
		field: 'type',
		title: '状态',
		slots: {
			default: 'type'
		},
		minWidth: 100
	},
	{
		field: 'addTime',
		title: '创建时间',
		minWidth: 150
	},
	{
		field: 'updateTime',
		title: '更新时间',
		minWidth: 150
	},
]
