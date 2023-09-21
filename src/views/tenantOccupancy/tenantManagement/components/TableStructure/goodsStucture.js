export const columns = [
  {
    type: 'checkbox'
  },
  {
    // fixed: 'left',
    field: 'id',
    title: 'Id',
    showOverflow: 'tooltip',
    width: 100
  },
  {
    // fixed: 'left',
    field: 'goodsSn',
    title: '商品编号',
    showOverflow: 'tooltip',
    width: 100
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'categoryName',
    title: '商品名字',
    showOverflow: 'tooltip',
    width: 100
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'picUrl',
    title: '商品图片',
    slots: {
      default: 'picUrl'
    },
    width: 200
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'keywords',
    title: '关键词',
    width: 100
  }
]
