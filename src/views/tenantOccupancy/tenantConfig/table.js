export const columns = [
  {
    align: 'center',
    // fixed: 'left',
    field: 'id',
    title: 'Id',
    // showOverflow: 'tooltip',
    width: ''
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'type',
    title: '类型',
    // showOverflow: 'tooltip',
    width: ''
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'createdTime',
    title: '创建时间',
    // showOverflow: 'tooltip',
    width: ''
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'updatedTime',
    title: '修改时间',
    // showOverflow: 'tooltip',
    width: ''
  },
  {
    align: 'center',
    field: 'function',
    fixed: 'right',
    title: '操作',
    className: 'small-padding fixed-width',
    // showOverflow: 'tooltip',
    slots: {
      default: 'function'
    },
    width: 190
  }
]
