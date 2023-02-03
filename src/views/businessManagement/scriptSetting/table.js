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
    field: 'say',
    title: '话术内容',
    minWidth: 150
  },
  {
    align: 'left',
    field: 'type',
    title: '话术类型',
    showOverflow: false,
    slots: {
      default: 'type'
    },
    minWidth: 150
  },
  {
    align: 'left',
    field: 'createTime',
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
    showOverflow: false,
    slots: {
      default: 'operate'
    },
    width: 150
  },
]
