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
    field: 'orderSn',
    title: '订单编号',
    minWidth: 150
  },
  {
    align: 'left',
    fixed: 'left',
    field: 'userId',
    title: '用户ID',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'orderType',
    title: '订单类型',
    slots: {
      default: 'orderType'
    },
    minWidth: 100
  },
  {
    align: 'left',
    field: 'orderStatus',
    title: '订单状态',
    slots: {
      default: 'orderStatus'
    },
    minWidth: 100
  },
  {
    align: 'left',
    field: 'consignee',
    title: '收货人名称',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'mobile',
    title: '收货人手机号',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'address',
    title: '收货地址',
    minWidth: 300
  },
  {
    align: 'left',
    field: 'regionName',
    title: '区域',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'message',
    title: '订单留言',
    minWidth: 200
  },
  {
    align: 'left',
    field: 'goodsPrice',
    title: '商品总价',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'freightPrice',
    title: '快递费用',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'couponPrice',
    title: '优惠券减免',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'integralPrice',
    title: '积分减免',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'voucherPrice',
    title: '代金券减免',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'grouponPrice',
    title: '团购减免',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'orderPrice',
    title: '订单费用',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'actualPrice',
    title: '实付费用',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'payId',
    title: '微信付款编号',
    minWidth: 200
  },
  {
    align: 'left',
    field: 'payTime',
    title: '付款时间',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'shipSn',
    title: '快递单号',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'shipChannel',
    title: '发货快递',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'shipTime',
    title: '发货时间',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'salesman',
    title: '业务员名称',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'confirmTime',
    title: '确认收货时间',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'comments',
    title: '待评价商品数',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'endTime',
    title: '订单关闭时间',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'settlementMoney',
    title: '代理结算金额',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'settlementStatus',
    title: '结算状态',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'freightType',
    title: '配送方式',
    slots: {
      default: 'freightType'
    },
    minWidth: 100
  },
  {
    align: 'left',
    field: 'shareUserId',
    title: '推广用户',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'fetchCode',
    title: '提货码',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'createUserId',
    title: '原始创建人',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'giftSendTime',
    title: '转赠发送时间',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'giftReceiveTime',
    title: '转赠接收时间',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'useVoucher',
    title: '使用代金券',
    slots: {
      default: 'useVoucher'
    },
    minWidth: 100
  },
  {
    align: 'left',
    field: 'isFreeze',
    title: '是否冻结',
    slots: {
      default: 'isFreeze'
    },
    minWidth: 100
  },
  {
    align: 'left',
    field: 'freezeType',
    title: '冻结类型',
    slots: {
      default: 'freezeType'
    },
    minWidth: 100
  },
  {
    align: 'left',
    field: 'complainReason',
    title: '投诉原因',
    minWidth: 200
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
    width: 320
  }
]
