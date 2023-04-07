import request from '@/utils/request'

export const api = {
  queryDepartmentList: '/department/queryDepartmentList',
  departmentInsertSelective: '/department/insertSelective',
  departmentUpdateByPrimaryKeySelective: '/department/updateByPrimaryKeySelective',
  departmentSelectByPrimaryKey: '/department/selectByPrimaryKey',
  departmentDeleteByPrimaryKey: '/department/deleteByPrimaryKey'
}

// 部门列表
export function queryDepartmentList(data) {
  return request({
    url: api.queryDepartmentList,
    method: 'POST',
    data
  })
}

// 新增部门
export function departmentInsertSelective(data) {
  return request({
    url: api.departmentInsertSelective,
    method: 'POST',
    data
  })
}

// 编辑部门
export function departmentUpdateByPrimaryKeySelective(data) {
  return request({
    url: api.departmentUpdateByPrimaryKeySelective,
    method: 'POST',
    data
  })
}

// 部门详情
export function departmentSelectByPrimaryKey(params) {
  return request({
    url: api.departmentSelectByPrimaryKey,
    method: 'GET',
    params
  })
}

// 删除部门
export function departmentDeleteByPrimaryKey(params) {
  return request({
    url: api.departmentDeleteByPrimaryKey,
    method: 'GET',
    params
  })
}
