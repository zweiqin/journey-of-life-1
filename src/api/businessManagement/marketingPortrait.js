import request from '@/utils/request'

// 营销画像数据统计
export function statisticalHome (params) {
  return request({
    url: '/statistical/home',
    method: 'GET',
    params
  })
}
