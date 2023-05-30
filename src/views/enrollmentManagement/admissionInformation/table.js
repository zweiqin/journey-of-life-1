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
    field: 'customerName',
    title: '学生名称',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'customerGender',
    title: '性别',
    formatter: ({ cellValue }) => ({
      0: '未知',
      1: '男',
      2: '女'
    }[cellValue] || '--'),
    width: 100
  },
  {
    align: 'center',
    field: 'customerPhone',
    title: '手机号',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'skill',
    title: '技能',
    minWidth: 200
  },
  {
    align: 'center',
    field: 'region',
    title: '区域',
    minWidth: 200
  },
  {
    align: 'center',
    field: 'remarks',
    title: '备注',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'createTime',
    title: '创建时间',
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
    width: 100
  }
]
