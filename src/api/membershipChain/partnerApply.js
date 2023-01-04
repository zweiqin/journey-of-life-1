import request from '@/utils/request'

export const api = {
  partnerApplyList: '/partnerApply/list',
  partnerApplyManage: '/partnerApply/manage',
}

// 合伙人申请列表
export function partnerApplyList (data) {
  return request({
    url: api.partnerApplyList,
    method: 'POST',
    data
  })
}

// 合伙人申请状态
export function partnerApplyManage (data) {
  return request({
    url: api.partnerApplyManage,
    method: 'POST',
    data
  })
}
