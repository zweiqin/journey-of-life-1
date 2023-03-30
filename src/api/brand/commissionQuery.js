/**
 * 佣金
*/

import request from '@/utils/request'

export const api = {
  commissionQueryCommissionList: '/new/commission/queryCommissionList',
  commissionInsertSelective: '/new/commission/insertSelective',
  commissionUpdateByPrimaryKeySelective: '/new/commission/updateByPrimaryKeySelective',
  commissionSelectByPrimaryKey: '/new/commission/selectByPrimaryKey',
  commissionDeleteByPrimaryKey: '/new/commission/deleteByPrimaryKey'
}

// 佣金列表
export function commissionQueryCommissionList(data) {
  return request({
    url: api.commissionQueryCommissionList,
    method: 'POST',
    data
  })
}

// 新增佣金
export function commissionInsertSelective(data) {
  return request({
    url: api.commissionInsertSelective,
    method: 'POST',
    data
  })
}

// 编辑佣金
export function commissionUpdateByPrimaryKeySelective(data) {
  return request({
    url: api.commissionUpdateByPrimaryKeySelective,
    method: 'POST',
    data
  })
}

// 详情
export function commissionSelectByPrimaryKey(params) {
  return request({
    url: api.commissionSelectByPrimaryKey,
    method: 'GET',
    params
  })
}

// 删除
export function commissionDeleteByPrimaryKey(params) {
  return request({
    url: api.commissionDeleteByPrimaryKey,
    method: 'GET',
    params
  })
}

