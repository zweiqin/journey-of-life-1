export const columns = [
  {
    type: 'checkbox'
  },
  {
    fixed: 'left',
    field: 'id',
    title: 'ID',
    width: 100
  },
  {
    fixed: 'left',
    field: 'username',
    title: '用户名',
    minWidth: 150
  },
  {
    field: 'gender',
    title: '性别',
    slots: {
      default: 'gender'
    },
    minWidth: 100
  },
  {
    field: 'birthday',
    title: '生日',
    minWidth: 150
  },
  {
    field: 'userLevelDesc',
    title: '平台角色',
    minWidth: 150
  },
  {
    field: 'nickname',
    title: '昵称',
    minWidth: 100
  },
  {
    field: 'mobile',
    title: '电话',
    minWidth: 150
  },
  {
    field: 'avatar',
    title: '头像',
    slots: {
      default: 'avatar'
    },
    minWidth: 100
  },
  {
    field: 'regionList',
    title: '区域',
    minWidth: 150
  },
  {
    field: 'brandRemark',
    title: '门店备注',
    minWidth: 150
  },
  {
    field: 'platformRemark',
    title: '平台备注',
    minWidth: 150
  },
  {
    field: 'brandLevelDesc',
    title: '用户在门店中的等级',
    minWidth: 150,
    slots: {
      default: 'brandLevelDesc'
    }
  },
  {
    field: 'principalName',
    title: '推荐人',
    minWidth: 150,
    slots: {
      default: 'principalName'
    }
  },
  {
    field: 'todo1',
    title: '绑定合伙人数量',
    minWidth: 150,
    formatter: ({ cellValue, row }) => row.userLevel === 7 ? cellValue : '--'
  },
  {
    field: 'todo2',
    title: '绑定普通会员数量',
    minWidth: 150,
    formatter: ({ cellValue, row }) => [6, 7].includes(row.userLevel) ? cellValue : '--'
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
    className: 'small-padding fixed-width',
    showOverflow: 'tooltip',
    slots: {
      default: 'operate'
    },
    width: 420
  }
]
