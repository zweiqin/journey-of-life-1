import request from '@/utils/request'

export const api = {
  partnerApplyList: '/partnerApply/list',
  partnerApplyManage: '/partnerApply/manage',
  partnerApplySignin: '/partnerApply/signin',
}

// 合伙人申请列表
export function partnerApplyList (params) {
  return request({
    url: api.partnerApplyList,
    method: 'GET',
    params
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

// 手动完成升级
export function partnerApplySignin (data) {
  return request({
    url: api.partnerApplySignin,
    method: 'POST',
    data
  })
}
