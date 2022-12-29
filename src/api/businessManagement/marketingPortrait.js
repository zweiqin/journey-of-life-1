import request from '@/utils/request'

export const api = {
  statisticalHome: '/statistical/home',
}

// 营销画像数据统计
export function statisticalHome (params) {
  return request({
    url: api.statisticalHome,
    method: 'GET',
    params
  })
}
