import request2 from '@/utils/request2'

export const api = {
  partnerGetCustomerList: '/api/third/partner/getCustomerList',
  partnerGetPartnerInfo: '/api/third/partner/getPartnerInfo',
  partnerStartAudit: '/api/third/partner/startAudit'
}

export function partnerGetCustomerList(data) {
  return request2({
    url: '/api/third/partner/getCustomerList',
    method: 'post',
    data
  })
}

export function partnerGetPartnerInfo(query) {
  return request2({
    url: '/api/third/partner/getPartnerInfo',
    method: 'get',
    params: query
  })
}

export function partnerStartAudit(data) {
  return request2({
    url: '/api/third/partner/startAudit',
    method: 'post',
    data
  })
}
