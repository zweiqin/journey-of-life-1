import request from '@/utils/request'

export const api = {
  financeWithdrawalStatistics: '/finance/withdrawalStatistics'
}

// 累计提现（师傅、店长）
export function financeWithdrawalStatistics(data) {
  return request({
    url: api.financeWithdrawalStatistics,
    method: 'POST',
    data
  })
}
