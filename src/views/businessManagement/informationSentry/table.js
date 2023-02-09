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
		field: 'userName',
		title: '会员名称',
		minWidth: 150
	},
	{
		align: 'left',
		field: 'userAvatar',
		title: '会员头像',
		showOverflow: false,
		slots: {
			default: 'userAvatar'
		},
		width: 100
	},
	{
		align: 'left',
		field: 'userGender',
		title: '会员性别',
		formatter: ({ cellValue }) => ({
			0: '未知',
			1: '男',
			2: '女'
		}[cellValue] || '--'),
		width: 100
	},
	{
		align: 'left',
		field: 'userTel',
		title: '会员电话',
		minWidth: 150
	},
	{
		align: 'left',
		field: 'buyCount',
		title: '购买次数',
		minWidth: 80
	},
	{
		align: 'left',
		field: 'setTime',
		title: '报警天数',
		minWidth: 80
	},
	{
		align: 'left',
		field: 'status',
		title: '状态',
		showOverflow: false,
		slots: {
			default: 'status'
		},
		width: 100
	},
	{
		align: 'left',
		field: 'updateTime',
		title: '购买时间',
		minWidth: 100
	},
	{
		align: 'left',
		field: 'createTime',
		title: '创建时间',
		minWidth: 100
	},
	{
		align: 'left',
		field: 'isConversion',
		title: '是否转化',
		formatter: ({ cellValue }) => cellValue ? '是' : '否',
		width: 100
	},
	{
		align: 'left',
		field: 'professional',
		title: '职业',
		minWidth: 100
	},
	{
		align: 'left',
		field: 'hobby',
		title: '爱好',
		minWidth: 100
	},
	{
		align: 'left',
		field: 'workingPlace',
		title: '工作地点',
		minWidth: 200
	},
	{
		align: 'left',
		field: 'homeAddress',
		title: '家庭住址',
		minWidth: 200
	},
	{
		align: 'left',
		field: 'birthday',
		title: '生日',
		minWidth: 200
	},
	{
		align: 'left',
		field: 'belongsSalesman',
		title: '业务员名称',
		minWidth: 200
	},
	{
		align: 'left',
		field: 'belongsDepartment',
		title: '业务员所属部门',
		minWidth: 200
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
		width: 300
	}
]
