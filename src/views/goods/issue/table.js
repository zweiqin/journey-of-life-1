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
    field: 'type',
    title: '问题范围',
    showOverflow: 'tooltip',
    slots: {
      default: 'type'
    },
    width: 150
  },
  {
    align: 'center',
    field: 'question',
    title: '问题内容',
    width: 150
  },
  {
    align: 'center',
    field: 'answer',
    title: '问题回复',
    width: 300
  },
  {
    align: 'center',
    field: 'isEnable',
    title: '状态',
    showOverflow: 'tooltip',
    slots: {
      default: 'isEnable'
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
    align: 'center',
    field: 'operate',
    fixed: 'right',
    title: '操作',
    className: 'small-padding fixed-width',
    showOverflow: 'tooltip',
    slots: {
      default: 'operate'
    },
    width: 250
  }
]
