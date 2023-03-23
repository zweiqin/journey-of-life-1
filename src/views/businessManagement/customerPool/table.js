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
    field: 'customerSex',
    title: '客户性别',
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
    title: '客户电话',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'professional',
    title: '职业',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'hobby',
    title: '爱好',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'workingPlace',
    title: '工作地点',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'homeAddress',
    title: '家庭住址',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'birthday',
    title: '生日',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'belongsSalesman',
    title: '所属业务员',
    minWidth: 150
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
