import request from '@/utils/request'


// 话术类型列表
export function msgsayMsgSayTypeList (params) {
  return request({
    url: '/msgsay/msgSayTypeList',
    method: 'GET',
    params
  })
}

// 话术列表分页查询
export function msgsayMsgSayList (data) {
  return request({
    url: '/msgsay/msgSayList',
    method: 'POST',
    data
  })
}

// 新增话术
export function msgsaySaveMsgSay (data) {
  return request({
    url: '/msgsay/saveMsgSay',
    method: 'POST',
    data
  })
}

// 话术查询
export function msgsaySelectById (params) {
  return request({
    url: '/msgsay/selectById',
    method: 'GET',
    params
  })
}

// 修改话术
export function msgsayUpdateSay (data) {
  return request({
    url: '/msgsay/updateSay',
    method: 'PUT',
    data
  })
}

// 修改话术
export function msgsayDeleteById (params) {
  return request({
    url: '/msgsay/deleteById',
    method: 'DELETE',
    params
  })
}