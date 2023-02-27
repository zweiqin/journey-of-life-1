import request from '@/utils/request'

export const api = {
  getNewMaterialList: '/newmaterial/getNewMaterialList',
  newmaterialSave: '/newmaterial/save',
  newmaterialUpdateById: '/newmaterial/updateById',
  getNewMaterialInfo: '/newmaterial/getNewMaterialInfo',
  newmaterialDeleteById: '/newmaterial/deleteById'
}

// 查询商品材质列表
export function getNewMaterialList(data) {
  return request({
    url: api.getNewMaterialList,
    method: 'POST',
    data
  })
}

// 查询商品材质详情
export function getNewMaterialInfo(params) {
  return request({
    url: `${api.getNewMaterialInfo}/${params.id}`,
    method: 'GET',
    params
  })
}

// 添加商品材质
export function newmaterialSave(data) {
  return request({
    url: api.newmaterialSave,
    method: 'POST',
    data
  })
}

// 编辑商品材质
export function newmaterialUpdateById(data) {
  return request({
    url: api.newmaterialUpdateById,
    method: 'POST',
    data
  })
}

// 删除商品材质
export function newmaterialDeleteById(params) {
  return request({
    url: api.newmaterialDeleteById,
    method: 'DELETE',
    params
  })
}
