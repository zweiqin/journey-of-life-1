import request from '@/utils/request'

export const api = {
  // 第一条和第二条接口 502 err
  queryMallReportForms: '/finance/queryMallReportForms',
  queryLogisticsReportForms: '/finance/queryLogisticsReportForms',
  queryCommunityReportForms: '/finance/queryCommunityReportForms'
}

// 部门列表
export function queryDepartmentList(data) {
  // {
  //   "date": "2023",
  //   "address": "广东省",
  //   "page": 1,
  //   "limit": 10,
  //   "orderDate": "2023"
  // }
  return request({
    url: api.queryCommunityReportForms,
    method: 'POST',
    data
  })
}
