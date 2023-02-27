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
    field: 'value',
    title: '标签值',
    minWidth: 200
  },
  {
    align: 'center',
    field: 'sortOrder',
    title: '排序',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'addTime',
    title: '创建时间',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'updateTime',
    title: '更新时间',
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
    width: 150
  }
]
