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
    fixed: 'left',
    field: 'name',
    title: '部门名称',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'desc',
    title: '说明',
    minWidth: 200
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
    align: 'left',
    field: 'operate',
    fixed: 'right',
    title: '操作',
    className: 'small-padding fixed-width',
    showOverflow: false,
    slots: {
      default: 'operate'
    },
    width: 250
  }
]
