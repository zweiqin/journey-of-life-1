export const columns = [
  {
    align: 'center',
    fixed: 'left',
    field: 'id',
    title: '广告ID',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'name',
    title: '广告标题',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'content',
    title: '广告内容',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'url',
    title: '广告图片',
    showOverflow: false,
    slots: {
      default: 'url'
    },
    minWidth: 150
  },
  {
    align: 'center',
    field: 'position',
    title: '广告位置',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'link',
    title: '活动链接',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'enabled',
    title: '是否启用',
    showOverflow: false,
    slots: {
      default: 'enabled'
    },
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
