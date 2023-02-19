export const columns = [
  {
    align: 'center',
    fixed: 'left',
    field: 'id',
    title: 'ID',
    minWidth: 100
  },
  {
    align: 'center',
    fixed: 'left',
    field: 'materialsCategory',
    title: '类名',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'materialsName',
    title: '品名',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'materialsSku',
    title: '规格',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'materialsTexture',
    title: '材质',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'materialsQuality',
    title: '品质',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'materialsMoney',
    title: '价格',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'materialsUnit',
    title: '单位',
    minWidth: 150
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
    width: 180
  }
]
