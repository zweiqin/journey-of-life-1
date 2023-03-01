export const columns = [
  {
    align: 'center',
    fixed: 'left',
    field: 'id',
    title: 'ID',
    width: 100
  },
  // {
  //   align: 'center',
  //   field: 'value',
  //   title: '所属adminId',
  //   minWidth: 150
  // },
  {
    align: 'center',
    field: 'materialCityName',
    title: '材料城名称',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'materialCityLogo',
    title: '材料城Logo',
    showOverflow: 'tooltip',
    slots: {
      default: 'materialCityLogo'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'materialCityCode',
    title: '材料城所在区域编码',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'materialCityRegion',
    title: '材料城所在区域',
    showOverflow: 'tooltip',
    slots: {
      default: 'materialCityRegion'
    },
    minWidth: 200
  },
  {
    align: 'center',
    field: 'materialCityAddress',
    title: '详细地址',
    minWidth: 200
  },
  {
    align: 'center',
    field: 'materialCityContactPerson',
    title: '联系人',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'materialCityTel',
    title: '联系电话',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'materialCityIntroduce',
    title: '材料城介绍',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'materialCityRemarks',
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
    showOverflow: 'tooltip',
    slots: {
      default: 'operate'
    },
    width: 200
  }
]
