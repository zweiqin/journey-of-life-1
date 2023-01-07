/**
 * 会员管理
*/
import request from '@/utils/request'

export const api = {
  userList: '/user/list',
  userUpdate: '/user/update',
}

// 会员管理列表
export function userList(params) {
  return request({
    url: api.userList,
    method: 'GET',
    params
  })
}

// 会员信息编辑
export function userUpdate(data) {
  return request({
    url: api.userUpdate,
    method: 'POST',
    data
  })
}
