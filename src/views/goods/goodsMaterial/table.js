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
    title: '所属adminId',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'materialName',
    title: '材质名称',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'materialIntroduce',
    title: '材质介绍',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'materialRemarks',
    title: '备注',
    minWidth: 250
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
    width: 200
  }
]
