import request from '@/utils/request'

export const api = {
  queryMallReportForms: '/finance/queryMallReportForms',
  queryLogisticsReportForms: '/finance/queryLogisticsReportForms',
  queryCommunityReportForms: '/finance/queryCommunityReportForms'
}

// 报表
export function queryMallReportForms(data) {
  return request({
    url: api.queryMallReportForms,
    method: 'POST',
    data
  })
}

// 报表
export function queryLogisticsReportForms(data) {
  return request({
    url: api.queryLogisticsReportForms,
    method: 'POST',
    data
  })
}

// 报表
export function queryCommunityReportForms(data) {
  return request({
    url: api.queryCommunityReportForms,
    method: 'POST',
    data
  })
}
