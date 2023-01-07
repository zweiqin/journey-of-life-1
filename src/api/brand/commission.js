/**
 * 佣金流水
*/
import request from '@/utils/request'

export const api = {
  commissionRecordList: '/commission/recordList',
  commissionList: '/commission/list',
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
export function commissionList(data) {
  return request({
    url: api.commissionList,
    method: 'POST',
    data
  })
}

