export const columns = [
	{
		align: 'center',
		fixed: 'left',
		field: 'id',
		title: '编号',
		width: 100
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'orderId',
		title: '订单编号',
		width: 200
	},
	{
		align: 'center',
		field: 'userId',
		title: '购买者id',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'number',
		title: '购买数量',
		minWidth: 150
	},
	{
		align: 'left',
		field: 'status',
		title: '状态',
		showOverflow: false,
		slots: {
			default: 'status'
		},
		width: 120
	},
	{
		align: 'center',
		field: 'payId',
		title: '微信订单编号',
		width: 250
	},
	{
		align: 'center',
		field: 'payGrade',
		title: '消费金额',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'payTime',
		title: '支付时间',
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
