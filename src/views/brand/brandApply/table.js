export const columns = [
  {
    fixed: 'left',
    field: 'id',
    title: 'ID',
    width: 100
  },
  {
    field: 'username',
    title: '会员名称',
    minWidth: 150
  },
  {
    field: 'brandname',
    title: '门店名称',
    minWidth: 150
  },
  {
    field: 'brandPhone',
    title: '联系电话',
    minWidth: 150
  },
  {
    field: 'userId',
    title: '申请会员ID',
    minWidth: 100
  },
  {
    field: 'operatorname',
    title: '审核人账户',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'status',
    title: '审核状态',
    slots: {
      default: 'status'
    },
    width: 100
  },
  {
    field: 'comment',
    title: '驳回理由',
    minWidth: 200
  },
  {
    field: 'labelName',
    title: '标签名',
    minWidth: 150
  },
  {
    field: 'nickname',
    title: '会员昵称',
    minWidth: 150
  },
  {
    field: 'regionName',
    title: '区域',
    minWidth: 150
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
    showOverflow: false,
    slots: {
      default: 'operate'
    },
    width: 280
  }
]
