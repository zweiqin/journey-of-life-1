import request from '@/utils/request'

export const api = {
  getNewMaterialCityList: '/newaterialcity/getNewMaterialCityList',
  newaterialcitySave: '/newaterialcity/save',
  newaterialcityUpdateById: '/newaterialcity/updateById',
  getNewMaterialCityInfo: '/newaterialcity/getNewMaterialCityInfo',
  newaterialcityDeleteById: '/newaterialcity/deleteById'
}

// 查询材料城列表
export function getNewMaterialCityList(data) {
  return request({
    url: api.getNewMaterialCityList,
    method: 'POST',
    data
  })
}

// 查询材料城详情
export function getNewMaterialCityInfo(params) {
  return request({
    url: `${api.getNewMaterialCityInfo}/${params.id}`,
    method: 'GET',
    params
  })
}

// 添加材料城
export function newaterialcitySave(data) {
  return request({
    url: api.newaterialcitySave,
    method: 'POST',
    data
  })
}

// 编辑材料城
export function newaterialcityUpdateById(data) {
  return request({
    url: api.newaterialcityUpdateById,
    method: 'POST',
    data
  })
}

// 删除材料城
export function newaterialcityDeleteById(params) {
  return request({
    url: api.newaterialcityDeleteById,
    method: 'DELETE',
    params
  })
}
