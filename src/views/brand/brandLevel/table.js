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
    field: 'brandId',
    title: '门店ID',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'levelTier',
    title: '等级层级',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'name',
    title: '等级名称',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'discount',
    title: '等级折扣',
    minWidth: 100
  },
  {
    align: 'left',
    field: 'description',
    title: '等级描述',
    minWidth: 200
  },
  {
    align: 'left',
    field: 'moneyCriterion',
    title: '等级所需消费总额',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'countCriterion',
    title: '等级所需消费次数',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'goodIdCriterion',
    title: '等级所需消费的产品',
    minWidth: 150
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
    showOverflow: 'tooltip',
    slots: {
      default: 'operate'
    },
    width: 150
  }
]
