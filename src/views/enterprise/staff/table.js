export const columns = [
	{
		align: 'center',
		fixed: 'left',
		field: 'id',
		title: 'ID',
		width: 100
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'adminId',
		title: '系统账户id',
		width: 100
	},
	{
		align: 'center',
		field: 'roleName',
		title: '部门名称',
		width: 150
	},
	{
		align: 'center',
		field: 'name',
		title: '员工姓名',
		width: 150
	},
	{
		align: 'center',
		field: 'phone',
		title: '员工电话',
		width: 150
	},
	{
		align: 'center',
		field: 'address',
		title: '员工地址',
		minWidth: 200
	},
	{
		align: 'left',
		field: 'status',
		title: '在职状态',
		showOverflow: false,
		slots: {
			default: 'status'
		},
		width: 100
	},
	{
		align: 'center',
		field: 'addTime',
		title: '创建时间',
		width: 150
	},
	{
		align: 'center',
		field: 'updateTime',
		title: '更新时间',
		width: 150
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
