import request from '@/utils/request'

export const api = {
  brandList: '/brand/list',
  brandRead: '/brand/read',
  brandCreate: '/brand/create',
  brandUpdate: '/brand/update',
  brandDelete: '/brand/delete',
  brandCatAndAdmin: '/brand/catAndAdmin',
  brandLabelList: '/brand/labelList',
  freezeBrand: '/userup/freezeBrand',
  storeTypeList: '/storeType/list',
  setUser: '/brand/setUser'
}

// 门店列表
export function brandList(params) {
  return request({
    url: api.brandList,
    method: 'GET',
    params
  })
}

// 门店详情
export function brandRead(params) {
  return request({
    url: api.brandRead,
    method: 'GET',
    params
  })
}

// 添加门店
export function brandCreate(data) {
  return request({
    url: api.brandCreate,
    method: 'POST',
    data
  })
}

// 编辑门店
export function brandUpdate(data) {
  return request({
    url: api.brandUpdate,
    method: 'POST',
    data
  })
}

// 删除门店
export function brandDelete(data) {
  return request({
    url: api.brandDelete,
    method: 'POST',
    data
  })
}

// 门店类型+风格
export function brandCatAndAdmin(params) {
  return request({
    url: api.brandCatAndAdmin,
    method: 'GET',
    params
  })
}

// 门店标签列表
export function brandLabelList(params) {
  return request({
    url: api.brandLabelList,
    method: 'GET',
    params
  })
}

// 获取门店类型
export function storeTypeList(params) {
  return request({
    url: api.storeTypeList,
    method: 'GET',
    params
  })
}

// 冻结门店
export function freezeBrand(params) {
  return request({
    url: api.freezeBrand,
    method: 'GET',
    params
  })
}

// 门店设置用户
export function setUserForBrand(data){
  return request({
    url: api.setUser,
    data,
    method: 'POST'
  })
}