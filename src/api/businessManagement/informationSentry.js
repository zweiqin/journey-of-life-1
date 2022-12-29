import request from '@/utils/request'

// 信息哨兵列表
export function messagesentryQueryMsgSentryList (data) {
  return request({
    url: '/messagesentry/queryMsgSentryList',
    method: 'POST',
    data
  })
}

// 新增信息哨兵客户信息
export function messagesentrySaveMsgSentry (data) {
  return request({
    url: '/messagesentry/saveMsgSentry',
    method: 'POST',
    data
  })
}

// 转化（从收集 -> 转化阶段）
export function messagesentryConversion (data) {
  return request({
    url: '/messagesentry/conversion',
    method: 'POST',
    data
  })
}

// 回访（从转化 -> 追销 追销 -> 铁粉）
export function messagesentryIsConversion (data) {
  return request({
    url: '/messagesentry/isConversion',
    method: 'POST',
    data
  })
}

// 业务员绑定
export function messagesentrySalesmanBinding (data) {
  return request({
    url: '/messagesentry/salesmanBinding',
    method: 'POST',
    data
  })
}

// 设定用户的报警时间
export function messagesentrySetOverdueTime (data) {
  return request({
    url: '/messagesentry/setOverdueTime',
    method: 'POST',
    data
  })
}
