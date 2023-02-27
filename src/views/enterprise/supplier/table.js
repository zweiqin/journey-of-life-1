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
    field: 'value',
    title: '所属adminId',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'supplierName',
    title: '供应商名称',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'supplierLogo',
    title: '供应商Logo',
    showOverflow: false,
    slots: {
      default: 'supplierLogo'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'supplierCode',
    title: '供应商所在区域编码',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'supplierRegion',
    title: '供应商所在区域',
    showOverflow: false,
    slots: {
      default: 'supplierRegion'
    },
    minWidth: 200
  },
  {
    align: 'center',
    field: 'supplierAddress',
    title: '详细地址',
    minWidth: 200
  },
  {
    align: 'center',
    field: 'supplierContactPerson',
    title: '联系人',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'supplierTel',
    title: '联系电话',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'supplierIntroduce',
    title: '供应商介绍',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'supplierRemarks',
    title: '备注',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'createTime',
    title: '创建时间',
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
    width: 200
  }
]
