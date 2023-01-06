/**
 * 门店申请
*/
import request from '@/utils/request'

export const api = {
  userupList: '/userup/list',
  userupManage: '/userup/manage',
  userupSignin: '/userup/signin',
}

// 门店申请列表
export function userupList(params) {
  return request({
    url: api.userupList,
    method: 'GET',
    params
  })
}

// 申请订单处理
export function userupManage(data) {
  return request({
    url: api.userupManage,
    method: 'POST',
    data
  })
}

// 审核通过并完成注册
export function userupSignin(data) {
  return request({
    url: api.userupSignin,
    method: 'POST',
    data
  })
}
