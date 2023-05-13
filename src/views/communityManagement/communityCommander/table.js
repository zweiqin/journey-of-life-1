export const columns = [
  {
    type: 'checkbox'
  },
  // {
  // 	align: 'center',
  // 	field: 'id',
  // 	title: 'ID',
  // 	width: 100
  // },
  // {
  // 	align: 'center',
  // 	field: 'sfUserId',
  // 	title: '师傅用户ID',
  // 	width: 100
  // },
  {
    align: 'center',
    field: 'sfUserName',
    title: '师傅用户名称',
    width: 100
  },
  {
    align: 'center',
    field: 'sfUserPhone',
    title: '师傅手机号',
    width: 100
  },
  {
    align: 'left',
    field: 'sfUserWorkCity',
    title: '师傅主营区域',
    // className: 'vxe-cell-two-row',
    showOverflow: 'tooltip',
    width: 150,
    slots: {
      default: 'sfUserWorkCity'
    }
  },
  // {
  // 	align: 'center',
  // 	field: 'zzUserId',
  // 	title: '店长用户ID',
  // 	width: 100
  // },
  {
    align: 'center',
    field: 'zzUserName',
    title: '店长用户名称',
    width: 100
  },
  {
    align: 'center',
    field: 'zzUserPhone',
    title: '店长手机号',
    width: 100
  },
  {
    align: 'center',
    field: 'zzUserServerCity',
    title: '服务区域',
    width: 150,
    slots: {
      default: 'zzUserServerCity'
    }
  },
  {
    align: 'center',
    fixed: 'right',
    field: 'status',
    title: '状态',
    showOverflow: 'tooltip',
    slots: {
      default: 'status'
    },
    width: 80
  },
  {
    align: 'center',
    field: 'cause',
    title: '审核不通过原因',
    width: 180
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
    width: 280
  }
]
