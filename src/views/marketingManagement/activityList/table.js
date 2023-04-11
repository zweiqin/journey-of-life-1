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
    field: 'campaignsName',
    title: '活动名称',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'campaignsType',
    title: '活动类型',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'startDate',
    title: '活动开始时间',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'endDate',
    title: '活动结束时间',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'targetaudience',
    title: '目标用户类型',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'targetsize',
    title: '目标用户数量',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'description',
    title: '活动描述',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'budget',
    title: '活动预算',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'operate',
    fixed: 'right',
    title: '操作',
    className: 'small-padding fixed-width',
    showOverflow: 'tooltip',
    slots: {
      default: 'operate'
    },
    width: 200
  }
]
