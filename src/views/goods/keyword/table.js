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
    field: 'keyword',
    title: '搜索关键字',
    width: 100
  },
  {
    align: 'center',
    field: 'url',
    title: '跳转链接',
    showOverflow: 'tooltip',
    slots: {
      default: 'url'
    },
    width: 250
  },
  {
    align: 'center',
    field: 'isHot',
    title: '是否推荐',
    showOverflow: 'tooltip',
    slots: {
      default: 'isHot'
    },
    width: 100
  },
  {
    align: 'center',
    field: 'isDefault',
    title: '是否默认',
    showOverflow: 'tooltip',
    slots: {
      default: 'isDefault'
    },
    width: 100
  },
  {
    align: 'center',
    field: 'addTime',
    title: '创建时间',
    width: 150
  },
  {
    align: 'center',
    field: 'updateTime',
    title: '更新时间',
    width: 150
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
