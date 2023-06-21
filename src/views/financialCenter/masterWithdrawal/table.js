export const columns = [
  {
    align: 'center',
    fixed: 'left',
    field: 'amount',
    title: '提现金额',
    width: 100
  },
  {
    align: 'center',
    fixed: 'left',
    field: 'orderNo',
    title: '提现单号',
    minWidth: 140
  },
  {
    align: 'center',
    field: 'receiverName',
    title: '收款人持卡人姓名',
    minWidth: 140
  },
  {
    align: 'center',
    field: 'fee',
    title: '手续费',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'orderStatus',
    title: '订单状态',
    slots: {
      default: 'orderStatus'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'errorCode',
    title: '第三方错误码',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'bankName',
    title: '提现银行名称',
    minWidth: 140
  },
  {
    align: 'center',
    field: 'receiverAccount',
    title: '银行卡号',
    minWidth: 140
  },
  {
    align: 'center',
    field: 'bankChannel',
    title: '银行卡提现渠道',
    slots: {
      default: 'bankChannel'
    },
    minWidth: 120
  },
  {
    align: 'center',
    field: 'realAmount',
    title: '实际到账金额',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'sourceType',
    title: '来源类型',
    slots: {
      default: 'sourceType'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'auditTime',
    title: '审核时间',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'createTime',
    title: '申请提现时间',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'outTradeNo',
    title: '第三方流水号',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'arrivaTime',
    title: '到账时间',
    minWidth: 100
  },
  {
    align: 'center',
    field: 'remark',
    title: '备注',
    minWidth: 200
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
    width: 220
  }
]
