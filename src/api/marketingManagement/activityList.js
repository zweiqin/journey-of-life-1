import request from '@/utils/request'

export const api = {
  userCrmList: '/userCrm/list',
  userCrmCreate: '/userCrm/create',
  userCrmUpdate: '/userCrm/update'
}

// 活动列表
export function userCrmList(params) {
  return request({
    url: api.userCrmList,
    method: 'GET',
    params
  })
}

// 活动创建
export function userCrmCreate(data) {
  return request({
    url: api.userCrmCreate,
    method: 'POST',
    data
  })
}

// 活动更新
export function userCrmUpdate(data) {
  return request({
    url: api.userCrmUpdate,
    method: 'POST',
    data
  })
}
