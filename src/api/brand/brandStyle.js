/**
 * 门店风格
*/
import request from '@/utils/request'

export const api = {
  brandStyleList: '/brandStyle/list',
  brandStyleCreate: '/brandStyle/create',
  brandStyleUpdate: '/brandStyle/update',
  brandStyleDelete: '/brandStyle/delete',
}

// 门店风格列表
export function brandStyleList(params) {
  return request({
    url: api.brandStyleList,
    method: 'GET',
    params
  })
}

// 添加门店风格
export function brandStyleCreate(data) {
  return request({
    url: api.brandStyleCreate,
    method: 'POST',
    data
  })
}

// 编辑门店风格
export function brandStyleUpdate(data) {
  return request({
    url: api.brandStyleUpdate,
    method: 'POST',
    data
  })
}

// 删除门店风格
export function brandStyleDelete(data) {
  return request({
    url: api.brandStyleDelete,
    method: 'POST',
    data
  })
}
