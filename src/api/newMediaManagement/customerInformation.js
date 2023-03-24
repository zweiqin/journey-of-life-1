import request from '@/utils/request'

export const api = {
  queryCustomerPoolList: '/customerscancode/queryCustomerPoolList'
}

// 查询客户信息列表
export function queryCustomerPoolList(data) {
  return request({
    url: api.queryCustomerPoolList,
    method: 'POST',
    data
  })
}
