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
    field: 'title',
    title: '文章标题',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'assistantTitle',
    title: '副标题',
    minWidth: 80
  },
  {
    align: 'center',
    field: 'author',
    title: '作者',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'cover',
    title: '封面',
    showOverflow: 'tooltip',
    slots: {
      default: 'cover'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'content',
    title: '内容',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'status',
    title: '状态',
    showOverflow: 'tooltip',
    slots: {
      default: 'status'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'publishDate',
    title: '发布时间',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'type',
    title: '发布平台',
    showOverflow: 'tooltip',
    slots: {
      default: 'type'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'articleTypeName',
    title: '类型名称',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'keyword',
    title: '关键词',
    minWidth: 120
  },
  {
    align: 'center',
    field: 'articleDescribe',
    title: '描述',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'sort',
    title: '排序',
    minWidth: 80
  },
  {
    align: 'center',
    field: 'remarks',
    title: '备注',
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
    width: 320
  }
]
