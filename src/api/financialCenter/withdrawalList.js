import request from '@/utils/request'

export const api = {
  financeGetWithdrawRecordList: '/finance/getWithdrawRecordList',
  financeWithdrawApprove: '/finance/withdrawApprove'
}

// 师傅提现列表（师傅和店长）
export function financeGetWithdrawRecordList(data) {
  return request({
    url: api.financeGetWithdrawRecordList,
    method: 'POST',
    data
  })
}

// 提现审核（师傅、店长）
export function financeWithdrawApprove(data) {
  return request({
    url: api.financeWithdrawApprove,
    method: 'POST',
    data
  })
}
