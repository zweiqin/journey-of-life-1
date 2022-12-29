import request from '@/utils/request'

export const api = {
  msgsayMsgSayTypeList: '/msgsay/msgSayTypeList',
  msgsayMsgSayList: '/msgsay/msgSayList',
  msgsaySaveMsgSay: '/msgsay/saveMsgSay',
  msgsaySelectById: '/msgsay/selectById',
  msgsayUpdateSay: '/msgsay/updateSay',
  msgsayDeleteById: '/msgsay/deleteById',
}

// 话术类型列表
export function msgsayMsgSayTypeList (params) {
  return request({
    url: api.msgsayMsgSayTypeList,
    method: 'GET',
    params
  })
}

// 话术列表分页查询
export function msgsayMsgSayList (data) {
  return request({
    url: api.msgsayMsgSayList,
    method: 'POST',
    data
  })
}

// 新增话术
export function msgsaySaveMsgSay (data) {
  return request({
    url: api.msgsaySaveMsgSay,
    method: 'POST',
    data
  })
}

// 话术查询
export function msgsaySelectById (params) {
  return request({
    url: api.msgsaySelectById,
    method: 'GET',
    params
  })
}

// 修改话术
export function msgsayUpdateSay (data) {
  return request({
    url: api.msgsayUpdateSay,
    method: 'PUT',
    data
  })
}

// 修改话术
export function msgsayDeleteById (params) {
  return request({
    url: api.msgsayDeleteById,
    method: 'DELETE',
    params
  })
}