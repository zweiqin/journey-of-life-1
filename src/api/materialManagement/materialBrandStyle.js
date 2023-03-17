import request from '@/utils/request'

export const api = {
  getMaterialBrandStyleList: '/materialBrandStyle/getMaterialBrandStyleList',
  materialBrandStyleSave: '/materialBrandStyle/save',
  materialBrandStyleUpdateById: '/materialBrandStyle/updateById',
  getMaterialBrandStyleInfo: '/materialBrandStyle/getMaterialBrandStyleInfo',
  materialBrandStyleDeleteById: '/materialBrandStyle/deleteById'
}

// 查询材料风格列表
export function getMaterialBrandStyleList(data) {
  return request({
    url: api.getMaterialBrandStyleList,
    method: 'POST',
    data
  })
}

// 查询材料风格详情
export function getMaterialBrandStyleInfo(params) {
  return request({
    url: `${api.getMaterialBrandStyleInfo}/${params.id}`,
    method: 'GET',
    params
  })
}

// 添加材料风格
export function materialBrandStyleSave(data) {
  return request({
    url: api.materialBrandStyleSave,
    method: 'POST',
    data
  })
}

// 编辑材料风格
export function materialBrandStyleUpdateById(data) {
  return request({
    url: api.materialBrandStyleUpdateById,
    method: 'POST',
    data
  })
}

// 删除材料风格
export function materialBrandStyleDeleteById(params) {
  return request({
    url: api.materialBrandStyleDeleteById,
    method: 'DELETE',
    params
  })
}
