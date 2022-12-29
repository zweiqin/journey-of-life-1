import request from '@/utils/request'

export function listGet (query) {
  return request({
    url: '/prices/list',
    method: 'get',
    params: query
  })
}

export function listDelete (data) {
  return request({
    url: '/prices/delete',
    method: 'post',
    data
  })
}

export function listAdd (data) {
  return request({
    url: '/prices/add',
    method: 'post',
    data
  })
}

export function listUpdate (data) {
  return request({
    url: '/prices/update',
    method: 'post',
    data
  })
}

