
import request from '@/utils/request'

export const api = {
  goodsTagList: '/goodsTag/list',
  goodsTagRead: '/goodsTag/read',
  goodsTagCreate: '/goodsTag/create',
  goodsTagUpdate: '/goodsTag/update',
  goodsTagDelete: '/goodsTag/delete',
}

// 查询大类标签
export function goodsTagList (params) {
  return request({
    url: api.goodsTagList,
    method: 'GET',
    params
  })
}

// 详情大类标签
export function goodsTagRead (params) {
  return request({
    url: api.goodsTagRead,
    method: 'GET',
    params
  })
}

// 添加大类标签
export function goodsTagCreate (data) {
  return request({
    url: api.goodsTagCreate,
    method: 'POST',
    data
  })
}

// 修改大类标签
export function goodsTagUpdate (data) {
  return request({
    url: api.goodsTagUpdate,
    method: 'POST',
    data
  })
}

// 删除大类标签
export function goodsTagDelete (data) {
  return request({
    url: api.goodsTagDelete,
    method: 'POST',
    data
  })
}

