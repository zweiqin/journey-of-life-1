import request from '@/utils/request'

export const api = {
  getRegionAgentList: '/regionagent/getRegionAgentList',
  updaetRegionAgentStatus: '/regionagent/updaetRegionAgentStatus',
  updaetRegionAgent: '/regionagent/updaetRegionAgent',
  getRegionAgentInfo: '/regionagent/getRegionAgentInfo',
  bindingSalesman: '/regionagent/bindingSalesman'
}

// // 区域代理列表
// export function getRegionAgentList (data) {
//   return request({
//     url: '/regionagent/getRegionAgentList',
//     method: 'POST',
//     data
//   })
// }

export function updaetRegionAgentStatus(data) {
  return request({
    url: '/regionagent/updaetRegionAgentStatus',
    method: 'POST',
    data
  })
}

export function updaetRegionAgent(data) {
  return request({
    url: '/regionagent/updaetRegionAgent',
    method: 'POST',
    data
  })
}

export function getRegionAgentInfo(query) {
  return request({
    url: '/regionagent/getRegionAgentInfo',
    method: 'GET',
    params: query
  })
}

export function bindingSalesman(data) {
  return request({
    url: '/regionagent/bindingSalesman',
    method: 'POST',
    data
  })
}

