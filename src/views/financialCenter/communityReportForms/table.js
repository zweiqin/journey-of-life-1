export const columns = [
  // fieid对应着请求过来的数据的字段名
  {
    align: 'center',
    fixed: 'left',
    field: 'orderNo',
    title: '单号',
    width: 140
  },
  {
    align: 'center',
    field: 'productName',
    title: '品名',
    width: 120
  },
  {
    align: 'center',
    field: 'region',
    title: '区域',
    width: 150
  },
  {
    align: 'center',
    field: 'brandName',
    title: '店长名称',
    width: 150
  },
  {
    align: 'center',
    field: 'number',
    title: '数量',
    width: 110
  },
  {
    align: 'center',
    field: 'income',
    title: '服务费用',
    slots: {
      default: 'income'
    },
    width: 110
  },
  {
    align: 'center',
    field: 'createTime',
    title: '创建时间',
    width: 140
  }
]
