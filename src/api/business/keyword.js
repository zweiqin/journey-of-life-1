import request from '@/utils/request'

export const api = {
  keywordList: '/keyword/list',
  keywordRead: '/keyword/read',
  keywordCreate: '/keyword/create',
  keywordUpdate: '/keyword/update',
  keywordDelete: '/keyword/delete',
}

// 关键词列表
export function keywordList(params) {
  return request({
    url: api.keywordList,
    method: 'GET',
    params
  })
}

// 关键词详情
export function keywordRead(params) {
  return request({
    url: api.keywordRead,
    method: 'GET',
    params
  })
}

// 添加关键词
export function keywordCreate(data) {
  return request({
    url: api.keywordCreate,
    method: 'POST',
    data
  })
}

// 编辑关键词
export function keywordUpdate(data) {
  return request({
    url: api.keywordUpdate,
    method: 'POST',
    data
  })
}

// 删除关键词
export function keywordDelete(data) {
  return request({
    url: api.keywordDelete,
    method: 'POST',
    data
  })
}
