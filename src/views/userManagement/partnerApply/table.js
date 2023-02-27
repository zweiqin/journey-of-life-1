export const columns = [
  {
    fixed: 'left',
    field: 'id',
    title: 'ID',
    width: 100
  },
  {
    field: 'userId',
    title: '会员ID',
    minWidth: 100
  },
  {
    field: 'referrerName',
    title: '推荐人',
    minWidth: 100
  },
  {
    field: 'orderId',
    title: '订单ID',
    minWidth: 150
  },
  {
    field: 'operatorName',
    title: '审核人账户名',
    minWidth: 100
  },
  {
    field: 'status',
    title: '审核状态',
    slots: {
      default: 'status'
    },
    minWidth: 100
  },
  {
    field: 'comment',
    title: '备注',
    minWidth: 200
  },
  {
    field: 'nickname',
    title: '会员昵称',
    minWidth: 100
  },
  {
    field: 'mobile',
    title: '联系方式',
    minWidth: 100
  },
  {
    field: 'regionName',
    title: '区域名称',
    minWidth: 200
  },
  {
    field: 'createTime',
    title: '创建时间',
    minWidth: 150
  },
  {
    field: 'updateTime',
    title: '更新时间',
    minWidth: 150
  },
  {
    field: 'operate',
    fixed: 'right',
    title: '操作',
    className: 'small-padding fixed-width',
    showOverflow: 'tooltip',
    slots: {
      default: 'operate'
    },
    width: 300
  }
]
