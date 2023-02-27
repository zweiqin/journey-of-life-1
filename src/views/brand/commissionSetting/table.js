export const columns = [
  {
    fixed: 'left',
    field: 'id',
    title: 'ID',
    width: 100
  },
  {
    field: 'name',
    title: '板块名',
    minWidth: 150
  },
  {
    field: 'level',
    title: '类型',
    slots: {
      default: 'level'
    },
    minWidth: 100
  },
  {
    field: 'cost',
    title: '业务费用',
    minWidth: 150
  },
  {
    field: 'content',
    title: '业务内容',
    minWidth: 200
  },
  {
    field: 'remark',
    title: '备注',
    minWidth: 200
  },
  {
    field: 'costType',
    title: '费用类型',
    slots: {
      default: 'costType'
    },
    minWidth: 100
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
