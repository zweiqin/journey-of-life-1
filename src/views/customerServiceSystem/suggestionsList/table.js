export const columns = [
  {
    align: 'center',
    fixed: 'left',
    field: 'id',
    title: '建议ID',
    width: 100
  },
  {
    align: 'center',
    field: 'typeStr',
    title: '建议类型',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'describe',
    title: '问题描述',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'userId',
    title: '用户ID',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'picUrl',
    title: '反馈图片',
    showOverflow: 'tooltip',
    slots: {
      default: 'picUrl'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'statusType',
    title: '状态',
    showOverflow: 'tooltip',
    slots: {
      default: 'statusType'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'statistics',
    title: '有用无用比',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'phone',
    title: '反馈号码',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'creatTime',
    title: '创建时间',
    minWidth: 100
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
    width: 320
  }
]
