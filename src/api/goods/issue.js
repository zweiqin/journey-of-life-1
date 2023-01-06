import request from '@/utils/request'

export const api = {
  issueGetTypeEnum: '/issue/getTypeEnum',
  issueList: '/issue/list',
  issueRead: '/issue/read',
  issueCreate: '/issue/create',
  issueUpdate: '/issue/update',
  issueDelete: '/issue/delete',
  issueChangeEnable: '/issue/changeEnable',
}

// 获取问题范围列表
export function issueGetTypeEnum(params) {
  return request({
    url: api.issueGetTypeEnum,
    method: 'GET',
    params
  })
}

// 通用问题列表
export function issueList(params) {
  return request({
    url: api.issueList,
    method: 'GET',
    params
  })
}

// 通用问题详情
export function issueRead(params) {
  return request({
    url: api.issueRead,
    method: 'GET',
    params
  })
}

// 通用问题添加
export function issueCreate(data) {
  return request({
    url: api.issueCreate,
    method: 'POST',
    data
  })
}

// 通用问题编辑
export function issueUpdate(data) {
  return request({
    url: api.issueUpdate,
    method: 'POST',
    data
  })
}

// 通用问题删除
export function issueDelete(data) {
  return request({
    url: api.issueDelete,
    method: 'POST',
    data
  })
}

// 通用问题停启用
export function issueChangeEnable(params) {
  return request({
    url: api.issueChangeEnable,
    method: 'GET',
    params
  })
}
