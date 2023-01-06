import request from '@/utils/request'

export const api = {
  goodsStyleList: '/goodsStyle/list',
  goodsStyleRead: '/goodsStyle/read',
  goodsStyleCreate: '/goodsStyle/create',
  goodsStyleUpdate: '/goodsStyle/update',
  goodsStyleDelete: '/goodsStyle/delete',
}

// 查询商品风格列表
export function goodsStyleList (params) {
  return request({
    url: api.goodsStyleList,
    method: 'GET',
    params
  })
}

// 查询商品风格详情
export function goodsStyleRead (params) {
  return request({
    url: api.goodsStyleRead,
    method: 'GET',
    params
  })
}

// 添加商品风格
export function goodsStyleCreate (data) {
  return request({
    url: api.goodsStyleCreate,
    method: 'POST',
    data
  })
}

// 编辑商品风格
export function goodsStyleUpdate (data) {
  return request({
    url: api.goodsStyleUpdate,
    method: 'POST',
    data
  })
}

// 删除商品风格
export function goodsStyleDelete (data) {
  return request({
    url: api.goodsStyleDelete,
    method: 'POST',
    data
  })
}
