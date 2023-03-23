import request from '@/utils/request'

export const api = {
  customerpoolQueryCustomerPoolList: '/customerpool/queryCustomerPoolList',
  customerpoolInsertSelective: '/customerpool/insertSelective',
  customerpoolUpdateByPrimaryKeySelective: '/customerpool/updateByPrimaryKeySelective',
  customerpoolSelectByPrimaryKey: '/customerpool/selectByPrimaryKey',
  customerpoolDeleteByPrimaryKey: '/customerpool/deleteByPrimaryKey'
}

// 查询客户池列表
export function customerpoolQueryCustomerPoolList(data) {
  return request({
    url: api.customerpoolQueryCustomerPoolList,
    method: 'POST',
    data
  })
}

// 查询客户池详情
export function customerpoolSelectByPrimaryKey(params) {
  return request({
    url: api.customerpoolSelectByPrimaryKey,
    method: 'GET',
    params
  })
}

// 添加客户池
export function customerpoolInsertSelective(data) {
  return request({
    url: api.customerpoolInsertSelective,
    method: 'POST',
    data
  })
}

// 编辑客户池
export function customerpoolUpdateByPrimaryKeySelective(data) {
  return request({
    url: api.customerpoolUpdateByPrimaryKeySelective,
    method: 'POST',
    data
  })
}

// 删除客户池
export function customerpoolDeleteByPrimaryKey(params) {
  return request({
    url: api.customerpoolDeleteByPrimaryKey,
    method: 'GET',
    params
  })
}
