export const columns = [
	{
		align: 'center',
		fixed: 'left',
		field: 'id',
		title: '用户优惠券ID'
		// width: 100
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'userId',
		title: '用户ID'
		// minWidth: 150
	},
	{
		align: 'center',
		field: 'addTime',
		title: '领取时间'
		// width: 100
	},
	{
		align: 'center',
		field: 'status',
		title: '使用状态',
		slots: {
			default: 'status'
		}
		// width: 100
	},
	{
		align: 'center',
		field: 'orderId',
		title: '订单ID'
		// minWidth: 150
	},
	{
		align: 'center',
		field: 'usedTime',
		title: '使用时间'
		// minWidth: 80
	}
]
