import request from '@/utils/request'

// 部门列表
export function queryDepartmentList(data) {
  return request({
    url: '/finance/queryMallReportForms',
    method: 'POST',
    data
  })
}

