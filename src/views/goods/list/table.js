export const columns = [
  {
    align: 'center',
    fixed: 'left',
    field: 'goodsSn',
    title: '商品编号',
    width: 100
  },
  {
    align: 'center',
    fixed: 'left',
    field: 'categoryName',
    title: '品类名称',
    width: 150
  },
  {
    align: 'center',
    fixed: 'left',
    field: 'name',
    title: '商品名称',
    minWidth: 200
  },
  {
    align: 'center',
    field: 'picUrl',
    title: '商品图片',
    showOverflow: 'tooltip',
    slots: {
      default: 'picUrl'
    },
    width: 100
  },
  {
    align: 'center',
    field: 'gallery',
    title: '宣传图片',
    showOverflow: 'tooltip',
    slots: {
      default: 'gallery'
    },
    width: 100
  },
  {
    align: 'center',
    field: 'brief',
    title: '商品简介',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'keywords',
    title: '搜索关键字',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'unit',
    title: '商品单位',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'counterPrice',
    title: '零售价格',
    width: 100
  },
  {
    align: 'center',
    field: 'vipPrice',
    title: '会员价格',
    width: 100
  },
  {
    align: 'center',
    field: 'retailPrice',
    title: '优惠价格',
    width: 100
  },
  {
    align: 'center',
    field: 'isOnSale',
    title: '上架状态',
    showOverflow: 'tooltip',
    slots: {
      default: 'isOnSale'
    },
    width: 80
  },
  {
    align: 'center',
    field: 'supportVoucher',
    title: '支持代金券',
    showOverflow: 'tooltip',
    slots: {
      default: 'supportVoucher'
    },
    width: 100
  },
  {
    align: 'center',
    field: 'voucherAmount',
    title: '支持代金券数量',
    width: 120
  },
  {
    align: 'center',
    field: 'saleType',
    title: '在售状态',
    showOverflow: 'tooltip',
    slots: {
      default: 'saleType'
    },
    width: 150
  },
  {
    align: 'center',
    field: 'productTag',
    title: '产品标签',
    showOverflow: 'tooltip',
    slots: {
      default: 'productTag'
    },
    width: 150
  },
  {
    align: 'center',
    field: 'deliveryDay',
    title: '商品状态',
    showOverflow: 'tooltip',
    slots: {
      default: 'deliveryDay'
    },
    width: 150
  },
  {
    align: 'center',
    field: 'styleName',
    title: '商品风格',
    width: 100
  },
  {
    align: 'center',
    field: 'tagName',
    title: '大类标签',
    width: 100
  },
  {
    align: 'center',
    field: 'placeName',
    title: '产地名称',
    width: 100
  },
  {
    align: 'center',
    field: 'browse',
    title: '浏览量',
    width: 100
  },
  {
    align: 'center',
    field: 'sales',
    title: '已销售总量',
    width: 100
  },
  {
    align: 'center',
    field: 'sortOrder',
    title: '排序',
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
    align: 'left',
    field: 'operate',
    fixed: 'right',
    title: '操作',
    className: 'small-padding fixed-width',
    showOverflow: 'tooltip',
    slots: {
      default: 'operate'
    },
    width: 360
  }
]
