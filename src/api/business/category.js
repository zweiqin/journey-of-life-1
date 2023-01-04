import request from '@/utils/request'

export const api = {
  categoryList: '/category/list',
  categoryL1: '/category/l1',
  categoryL2: '/category/l2',
  categoryTreeList: '/category/treeList',
  categoryRead: '/category/read',
  categoryCreate: '/category/create',
  categoryUpdate: '/category/update',
  categoryDelete: '/category/delete',
}

// 查询一级类目
export function categoryL1 (params) {
  return request({
    url: api.categoryL1,
    method: 'GET',
    params
  })
}

// 查询二级类目
export function categoryL2 (params) {
  return request({
    url: api.categoryL2,
    method: 'GET',
    params
  })
}

// 查询全部类目树结构列表
export function categoryTreeList(params) {
  return request({
    url: api.categoryTreeList,
    method: 'GET',
    params
  })
}

// 类目列表
export function categoryList (params) {
  return request({
    url: api.categoryList,
    method: 'GET',
    params
  })
}

// 查询类目详情
export function categoryRead (params) {
  return request({
    url: api.categoryRead,
    method: 'GET',
    params
  })
}

// 新增类目
export function categoryCreate (data) {
  return request({
    url: api.categoryCreate,
    method: 'POST',
    data
  })
}

// 编辑类目
export function categoryUpdate (data) {
  return request({
    url: api.categoryUpdate,
    method: 'POST',
    data
  })
}

// 删除类目
export function categoryDelete (data) {
  return request({
    url: api.categoryDelete,
    method: 'POST',
    data
  })
}
