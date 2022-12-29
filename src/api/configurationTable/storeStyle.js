import request from '@/utils/request'

// 增
export function listAdd (data) {
  return request({
    url: '/brandStyle/create',
    method: 'post',
    data
  })
}

// 删
export function listDelete (data) {
  return request({
    url: '/brandStyle/delete',
    method: 'post',
    data
  })
}

// 查
// 查询列表
export function listGet (query) {
  return request({
    url: '/brandStyle/list',
    method: 'get',
    params: query
  })
}

// 查询详情
export function detailGet (query) {
  return request({
    url: '/brandStyle/detail',
    method: 'get',
    params: query
  })
}

// 查询子配置列表
export function sonListGet (query) {
  return request({
    url: '/brandStyle/findSonList',
    method: 'get',
    params: query
  })
}

// 改
export function listEdit (data) {
  return request({
    url: '/brandStyle/update',
    method: 'post',
    data
  })
}
