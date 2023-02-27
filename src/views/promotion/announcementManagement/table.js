export const columns = [
  // {
  //   align: 'center',
  //   fixed: 'left',
  //   field: 'id',
  //   title: 'ID',
  //   minWidth: 100
  // },
  {
    align: 'center',
    field: 'type',
    title: '类型',
    showOverflow: 'tooltip',
    slots: {
      default: 'type'
    },
    minWidth: 150
  },
  {
    align: 'center',
    field: 'title',
    title: '标题',
    minWidth: 400
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
    width: 180
  }
]
