export const columns = [
  // {
  //   align: 'center',
  //   fixed: 'left',
  //   field: 'id',
  //   title: 'ID',
  //   width: 100
  // },
  {
    align: 'center',
    field: 'type',
    title: '文章类型',
    showOverflow: false,
    slots: {
      default: 'type'
    },
    minWidth: 150
  },
  {
    align: 'center',
    field: 'isVip',
    title: '文章性质',
    showOverflow: false,
    slots: {
      default: 'isVip'
    },
    minWidth: 150
  },
  {
    align: 'center',
    field: 'title',
    title: '文章标题',
    minWidth: 400
  },
  {
    align: 'center',
    field: 'operate',
    fixed: 'right',
    title: '操作',
    className: 'small-padding fixed-width',
    showOverflow: false,
    slots: {
      default: 'operate'
    },
    width: 200
  }
]
