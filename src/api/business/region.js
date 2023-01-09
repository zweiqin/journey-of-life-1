import request from '@/utils/request'

const api = {
  regionList: '/region/list',
}

// 获取区域集合
export function regionList(params) {
  return request({
    url: api.regionList,
    method: 'get',
    params
  })
}