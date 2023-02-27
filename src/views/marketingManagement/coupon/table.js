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
    field: 'name',
    title: '优惠券名称',
    sortable: true,
    minWidth: 100
  },
  {
    align: 'center',
    field: 'min',
    title: '最低消费',
    slots: {
      default: 'min'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'discount',
    title: '满减金额',
    slots: {
      default: 'discount'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'limit',
    title: '每人限领',
    slots: {
      default: 'limit'
    },
    minWidth: 80
  },
  {
    align: 'center',
    field: 'goodsType',
    title: '商品使用范围',
    slots: {
      default: 'goodsType'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'type',
    title: '优惠券类型',
    slots: {
      default: 'type'
    },
    minWidth: 100
  },
  {
    align: 'center',
    field: 'total',
    title: '优惠券数量',
    sortable: true,
    slots: {
      default: 'total'
    },
    minWidth: 120
  },
  {
    align: 'center',
    field: 'status',
    title: '状态',
    sortable: true,
    slots: {
      default: 'status'
    },
    minWidth: 60
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
    width: 250
  }
]
