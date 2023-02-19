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
    field: 'type',
    title: '评论类型',
    showOverflow: false,
    slots: {
      default: 'type'
    },
    width: 150
  },
  {
    align: 'center',
    field: 'content',
    title: '评论内容',
    minwidth: 200
  },
  {
    align: 'center',
    field: 'userImg',
    title: '用户头像',
    showOverflow: false,
    slots: {
      default: 'userImg'
    },
    width: 100
  },
  {
    align: 'center',
    field: 'userId',
    title: '用户编号',
    width: 100
  },
  {
    align: 'center',
    field: 'userName',
    title: '用户名称',
    minwidth: 100
  },
  {
    align: 'center',
    field: 'picUrls',
    title: '图片',
    showOverflow: false,
    slots: {
      default: 'picUrls'
    },
    width: 100
  },
  {
    align: 'center',
    field: 'goodsStar',
    title: '商品评分',
    showOverflow: false,
    slots: {
      default: 'goodsStar'
    },
    width: 140
  },
  {
    align: 'center',
    field: 'logisticsStar',
    title: '物流评价',
    showOverflow: false,
    slots: {
      default: 'logisticsStar'
    },
    width: 140
  },
  {
    align: 'center',
    field: 'serverStar',
    title: '服务态度',
    showOverflow: false,
    slots: {
      default: 'serverStar'
    },
    width: 140
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
    showOverflow: false,
    slots: {
      default: 'operate'
    },
    width: 200
  }
]
