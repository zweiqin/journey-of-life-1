import request from '@/utils/request'

export const api = {
  messagesentryQueryMsgSentryList: '/messagesentry/queryMsgSentryList',
  messagesentrySaveMsgSentry: '/messagesentry/saveMsgSentry',
  messagesentryConversion: '/messagesentry/conversion',
  messagesentryIsConversion: '/messagesentry/isConversion',
  messagesentrySalesmanBinding: '/messagesentry/salesmanBinding',
  messagesentrySetOverdueTime: '/messagesentry/setOverdueTime',
}

// 信息哨兵列表
export function messagesentryQueryMsgSentryList (data) {
  return request({
    url: api.messagesentryQueryMsgSentryList,
    method: 'POST',
    data
  })
}

// 新增信息哨兵客户信息
export function messagesentrySaveMsgSentry (data) {
  return request({
    url: api.messagesentrySaveMsgSentry,
    method: 'POST',
    data
  })
}

// 转化（从收集 -> 转化阶段）
export function messagesentryConversion (data) {
  return request({
    url: api.messagesentryConversion,
    method: 'POST',
    data
  })
}

// 回访（从转化 -> 追销 追销 -> 铁粉）
export function messagesentryIsConversion (data) {
  return request({
    url: api.messagesentryIsConversion,
    method: 'POST',
    data
  })
}

// 业务员绑定
export function messagesentrySalesmanBinding (data) {
  return request({
    url: api.messagesentrySalesmanBinding,
    method: 'POST',
    data
  })
}

// 设定用户的报警时间
export function messagesentrySetOverdueTime (data) {
  return request({
    url: api.messagesentrySetOverdueTime,
    method: 'POST',
    data
  })
}
