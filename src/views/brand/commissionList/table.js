export const columns = [
  {
    fixed: 'left',
    field: 'id',
    title: 'ID',
    width: 100
  },
  {
    field: 'userId',
    title: '申请提现的会员ID',
    minWidth: 100
  },
  {
    field: 'commission',
    title: '提现的佣金金额',
    minWidth: 100
  },
  {
    field: 'status',
    title: '状态',
    slots: {
      default: 'status'
    },
    minWidth: 100
  },
  {
    field: 'remark',
    title: '备注',
    minWidth: 250
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
  {
    field: 'operate',
    fixed: 'right',
    title: '操作',
    className: 'small-padding fixed-width',
    showOverflow: 'tooltip',
    slots: {
      default: 'operate'
    },
    width: 150
  }
]
