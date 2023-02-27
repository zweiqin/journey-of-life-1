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
    field: 'materialsCategory',
    title: '类名',
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
    field: 'materialsRegion',
    title: '地区',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'materialsColor',
    title: '颜色',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'materialsNumber',
    title: '数量',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'materialsPhone',
    title: '联系方式',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'sales',
    title: '销量',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'referenceMoney',
    title: '参考价',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'status',
    title: '状态',
    minWidth: 150,
    slots: {
      default: 'status'
    }
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
