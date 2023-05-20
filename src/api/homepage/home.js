import request from '@/utils/request'

export const api = {
  homeData: '/home/statistics/getTfHomeStatistics'
}

// 团蜂首页数据
export function getHomeData(params) {
  return request({
    url: api.homeData,
    method: 'GET',
    params
  })
}
