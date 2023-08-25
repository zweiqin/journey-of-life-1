import request from '@/utils/request'

export const api = {
  customerFeedbackList: '/dtsCustomerFeedback/customerList',
  customerFeedbackUpdateStatus: '/dtsCustomerFeedback/updateStatus'
}

// 建议列表
export function customerFeedbackList(params) {
  return request({
    url: '/dtsCustomerFeedback/customerList',
    method: 'get',
    params
  })
}

// 处理建议
export function customerFeedbackUpdateStatus(params) {
  return request({
    url: '/dtsCustomerFeedback/updateStatus',
    method: 'get',
    params
  })
}
