export const columns = [
  {
    align: 'center',
    fixed: 'left',
    field: 'id',
    title: '高德商家ID',
    width: 100,
  },
  {
    align: 'center',
    field: 'name',
    title: '商家名称',
    minWidth: 200,
    fixed: 'left',
  },
  {
    align: 'center',
    field: 'photos',
    title: '商家图片',
    minWidth: 200,
    slots: {
      default: 'photos',
    },
  },
  {
    align: 'center',
    field: 'pname',
    title: '所在省',
    width: 100,
  },
  {
    align: 'center',
    field: 'cityname',
    title: '所在城市',
    minWidth: 150,
  },
  {
    align: 'center',
    field: 'adname',
    title: '所在区',
    width: 100,
  },
  {
    align: 'center',
    field: 'address',
    title: '详细地址',
    width: 250,
  },

  {
    align: 'center',
    field: 'tel',
    title: '联系电话',
    minWidth: 300,
    slots: {
      default: 'tel',
    },
  },
  {
    align: 'center',
    field: 'type',
    title: '商家分类',
    minWidth: 200,
    slots: {
      default: 'type',
    },
  },
  {
    align: 'center',
    field: 'location',
    title: '经纬度',
    minWidth: 150,
  },
  {
    align: 'center',
    field: 'biz_ext',
    title: '每日营业时间',
    minWidth: 250,
    formatter: ({ cellValue }) => {
      const time = cellValue.opentime2;
      if (Array.isArray(time)) {
        return time.length ? time.join('-') : '--';
      }
      return time || '--';
    },
  },
  // {
  //   align: 'center',
  //   field: 'biz_ext',
  //   title: '营业时间说明',
  //   minWidth: 250,
  //   formatter: ({ cellValue }) => {
  //     const time = cellValue.open_time;
  //     if (Array.isArray(time)) {
  //       return time.length ? time.join('-') : '--';
  //     }
  //     return time || '--';
  //   },
  // },
  // {
  //   align: 'center',
  //   field: 'operate',
  //   fixed: 'right',
  //   title: '操作',
  //   className: 'small-padding fixed-width',
  //   showOverflow: 'tooltip',
  //   slots: {
  //     default: 'operate',
  //   },
  //   width: 100,
  // },
];

export const radiusList = [
  {
    label: '附近一公里',
    value: 1000,
  },
  {
    label: '附近三公里',
    value: 3000,
  },
  {
    label: '附近五公里',
    value: 5000,
  },
  {
    label: '附近十公里',
    value: 10000,
  },
  {
    label: '附近20公里',
    value: 20000,
  },
  {
    label: '附近50公里',
    value: 50000,
  },
];
