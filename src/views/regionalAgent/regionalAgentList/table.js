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
    fixed: 'left',
    field: 'userId',
    title: '用户ID',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'agentName',
    title: '公司名称（代理商名称）',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'agentCode',
    title: '代理商区域编码',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'agentRegion',
    title: '代理商区域',
    slots: {
      default: 'agentRegion'
    },
    minWidth: 150
  },
  {
    align: 'center',
    field: 'companyAddress',
    title: '公司地址',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'businessLicense',
    title: '营业执照',
    slots: {
      default: 'businessLicense'
    },
    minWidth: 150
  },
  {
    align: 'center',
    field: 'legalPerson',
    title: '法人名称',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'legalP',
    title: '法人联系方式',
    minWidth: 150
  },
  {
    align: 'center',
    field: 'idcardProsUrl',
    title: '身份证正面',
    slots: {
      default: 'idcardProsUrl'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'idcardConsUrl',
    title: '身份证反面',
    slots: {
      default: 'idcardConsUrl'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'status',
    title: '状态',
    slots: {
      default: 'status'
    },
    minWidth: 100
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
    width: 350
  }
]
