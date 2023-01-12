/**
 * 佣金流水
*/
import request from '@/utils/request'

export const api = {
  commissionRecordList: '/commission/recordList',
  commissionList: '/commission/list',
  commissionGrant: '/commission/grant',
  commissionRevoke: '/commission/revoke',
}

// 佣金流水列表
export function commissionRecordList(params) {
  return request({
    url: api.commissionRecordList,
    method: 'GET',
    params
  })
}

// 佣金提现申请列表
export function commissionList(params) {
  return request({
    url: api.commissionList,
    method: 'GET',
    params
  })
}

// 提现同意
export function commissionGrant(data) {
  return request({
    url: api.commissionGrant,
    method: 'POST',
    data
  })
}

// 提现拒绝
export function commissionRevoke(data) {
  return request({
    url: api.commissionRevoke,
    method: 'POST',
    data
  })
}

