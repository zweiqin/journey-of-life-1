export const columns = [
  {
    align: 'left',
    fixed: 'left',
    field: 'id',
    title: 'ID',
    width: 100
  },
  {
    align: 'left',
    fixed: 'left',
    field: 'name',
    title: '公司名称',
    minWidth: 120
  },
  {
    align: 'left',
    field: 'keeperName',
    title: '店主名称',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'desc',
    title: '简介',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'phone',
    title: '电话',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'picUrl',
    title: '公司图片',
    showOverflow: false,
    slots: {
      default: 'picUrl'
    },
    width: 100
  },
  {
    align: 'left',
    field: 'regionList',
    title: '区域',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'styleName',
    title: '门店风格',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'productAmount',
    title: '产品数量',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'employeeAmount',
    title: '员工数量',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'businessChargeName',
    title: '业务负责人',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'deliveryChargeName',
    title: '交付负责人',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'addTime',
    title: '创建时间',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'updateTime',
    title: '更新时间',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'operate',
    fixed: 'right',
    title: '操作',
    className: 'small-padding fixed-width',
    showOverflow: false,
    slots: {
      default: 'operate'
    },
    width: 380
  }
]
