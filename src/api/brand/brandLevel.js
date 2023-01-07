/**
 * 门店等级
*/
import request from '@/utils/request'

export const api = {
  brandLevelList: '/brandLevel/list',
  brandLevelCreate: '/brandLevel/create',
  brandLevelUpdate: '/brandLevel/update',
  brandLevelDelete: '/brandLevel/delete',
}

// 门店等级列表
export function brandLevelList(params) {
  return request({
    url: api.brandLevelList,
    method: 'GET',
    params
  })
}

// 添加门店等级
export function brandLevelCreate(data) {
  return request({
    url: api.brandLevelCreate,
    method: 'POST',
    data
  })
}

// 编辑门店等级
export function brandLevelUpdate(data) {
  return request({
    url: api.brandLevelUpdate,
    method: 'POST',
    data
  })
}

// 删除门店等级
export function brandLevelDelete(data) {
  return request({
    url: api.brandLevelDelete,
    method: 'POST',
    data
  })
}
