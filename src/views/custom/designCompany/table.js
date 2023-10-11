export const columns = [
  {
    align: 'center',
    // fixed: 'left',
    field: 'id',
    title: 'Id',
    showOverflow: 'tooltip',
    width: 100
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'brandId',
    title: '商家编号',
    showOverflow: 'tooltip',
    width: 100
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'name',
    title: '公司名字',
    slots: {
      default: 'name'
    },
    width: 200
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'createdBy',
    title: '创建人',
    width: 100
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'picUrl',
    title: '公司logo',
    slots: {
      default: 'picUrl'
    },
    width: 150
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'upperPrice',
    title: '价格上限',
    width: 100
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'lowerPrice',
    title: '价格下限',
    width: 100
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'tenantId',
    title: '租户号',
    width: 100
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'practiceYear',
    title: '从业年限',
    width: 100
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'comType',
    title: '公司类型',
    slots: {
      default: 'comType'
    },
    width: 120
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'designType',
    title: '设计风格',
    slots: {
      default: 'designType'
    },
    width: 120
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'combType',
    title: '搭配风格',
    slots: {
      default: 'combType'
    },
    width: 120
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'serviceScope',
    title: '服务范围',
    slots: {
      default: 'serviceScope'
    },
    width: 120
  },
  {
    align: 'center',
    // fixed: 'left',
    field: 'createdTime',
    title: '创建时间',
    width: 200
  },
  {
    align: 'left',
    field: 'function',
    fixed: 'right',
    title: '操作',
    className: 'small-padding fixed-width',
    // showOverflow: 'tooltip',
    slots: {
      default: 'function'
    },
    width: 190
  }
]
