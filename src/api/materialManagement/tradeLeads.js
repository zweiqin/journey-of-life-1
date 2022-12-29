import request from '@/utils/request'

export function listGet (query) {
  return request({
    url: '/tradeLeads/list',
    method: 'get',
    params: query
  })
}

export function listDelete (data) {
  return request({
    url: '/tradeLeads/delete',
    method: 'post',
    data
  })
}

export function listAdd (data) {
  return request({
    url: '/tradeLeads/add',
    method: 'post',
    data
  })
}

export function listUpdate (data) {
  return request({
    url: '/tradeLeads/update',
    method: 'post',
    data
  })
}

