export const columns = [
  // fieid对应着请求过来的数据的字段名
  {
    fixed: 'left',
    field: 'orderNo',
    title: '单号',
    width: 160
  },
  {
    field: 'productName',
    title: '品名',
    minWidth: 100
  },
  {
    field: 'region',
    title: '区域',
    minWidth: 100
  },
  {
    // 找不到门店字段 暂时不写 绑定的是收支浮动
    field: 'profitFloat',
    title: '门店',
    minWidth: 150
  },
  {
    field: 'number',
    title: '数量',
    minWidth: 110
  },
  {
    field: 'income',
    title: '收入',
    minWidth: 110
  },
  {
    field: 'expenditure',
    title: '支出',
    minWidth: 110
  },
  {
    field: 'profitFloat',
    title: '收支浮动',
    minWidth: 100
  }
]
