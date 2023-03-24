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
    field: 'customerName',
    title: '客户名称',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'customerGender',
    title: '会员性别',
    formatter: ({ cellValue }) => ({
      0: '未知',
      1: '男',
      2: '女'
    }[cellValue] || '--'),
    width: 100
  },
  {
    align: 'center',
    field: 'customerPhone',
    title: '手机号',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'companyName',
    title: '公司名称',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'customerPosition',
    title: '职位',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'participantsNumber',
    title: '参会人数',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'invite',
    title: '邀约人',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'remarks',
    title: '备注',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'createTime',
    title: '创建时间',
    minWidth: 150
  }
  // {
  //   align: 'center',
  //   field: 'operate',
  //   fixed: 'right',
  //   title: '操作',
  //   className: 'small-padding fixed-width',
  //   showOverflow: 'tooltip',
  //   slots: {
  //     default: 'operate'
  //   },
  //   width: 200
  // }
]
