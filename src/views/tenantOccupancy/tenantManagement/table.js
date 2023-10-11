export const columns = [
  {
    align: 'center',
    // fixed: 'left',
    field: 'id',
    title: 'Id',
    showOverflow: 'tooltip',
    width: 100
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'username',
    title: '商户名/账号',
    showOverflow: 'tooltip',
    width: 100
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'avatar',
    title: '头像',
    slots: {
      default: 'avatar'
    },
    width: 200
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'userId',
    title: '所属会员ID',
    width: 100
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'desc',
    title: '商户描述',
    // slots: {
    //   default: 'picUrl'
    // },
    width: 150
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'tel',
    title: '联系电话',
    width: 200
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'mail',
    title: '邮箱地址',
    width: 200
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'tenantId',
    title: '租户号',
    width: 100
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'isTenantAccount',
    title: '是否租户号',
    slots: {
      default: 'isTenantAccount'
    },
    width: 100
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'status',
    title: '账号状态',
    slots: {
      default: 'status'
    },
    width: 120
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'lastLoginTime',
    title: '最后一次登录时间',
    width: 120
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'lastLoginIp',
    title: '最后登录IP地址',
    width: 120
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'addTime',
    title: '创建时间',
    width: 200
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'updateTime',
    title: '更新时间',
    width: 200
  },
  {
    align: 'left',
    field: 'function',
    fixed: 'right',
    title: '操作',
    className: 'small-padding fixed-width',
    // showOverflow: 'tooltip',
    slots: {
      default: 'function'
    },
    width: 190
  }
]
