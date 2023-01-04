import request from '@/utils/request'

export const api = {
  goodsList: '/goods/list',
  goodsDetail: '/goods/detail',
  goodsCreate: '/goods/create',
  goodsUpdate: '/goods/update',
  goodsDelete: '/goods/delete',
  goodsUpOnSale: '/goods/upOnSale',
  goodsCatAndBrand: '/goods/catAndBrand',
  goodsProductPlaceList: '/goods/productPlaceList',
}

// 商品列表
export function goodsList (params) {
  return request({
    url: api.goodsList,
    method: 'GET',
    params
  })
}

// 商品详情
export function goodsDetail (params) {
  return request({
    url: api.goodsDetail,
    method: 'GET',
    params
  })
}

// 添加商品
export function goodsCreate (data) {
  return request({
    url: api.goodsCreate,
    method: 'POST',
    data
  })
}


// 编辑商品
export function goodsUpdate (data) {
  return request({
    url: api.goodsUpdate,
    method: 'POST',
    data
  })
}

// 删除商品
export function goodsDelete (data) {
  return request({
    url: api.goodsDelete,
    method: 'POST',
    data
  })
}

// 上下架商品
export function goodsUpOnSale (data) {
  return request({
    url: api.goodsUpOnSale,
    method: 'POST',
    data
  })
}

// 门店，品类
export function goodsCatAndBrand (params) {
  return request({
    url: '/goods/catAndBrand',
    method: 'GET',
    params
  })
}

// 产地
export function goodsProductPlaceList (params) {
  return request({
    url: api.goodsProductPlaceList,
    method: 'GET',
    params
  })
}
