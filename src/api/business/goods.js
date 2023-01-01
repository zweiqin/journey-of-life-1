import request from '@/utils/request'

export const api = {
  goodsList: '/goods/list',
  goodsDelete: '/goods/delete',
  goodsCreate: '/goods/create',
  goodsDetail: '/goods/detail',
  goodsUpdate: '/goods/update',
  goodsCatAndBrand: '/goods/catAndBrand',
  goodsProductPlaceList: '/goods/productPlaceList',
}

export function goodsList (params) {
  return request({
    url: api.goodsList,
    method: 'GET',
    params
  })
}

export function goodsDelete (data) {
  return request({
    url: api.goodsDelete,
    method: 'POST',
    data
  })
}

export function goodsCreate (data) {
  return request({
    url: api.goodsCreate,
    method: 'POST',
    data
  })
}

export function goodsDetail (id) {
  return request({
    url: api.goodsDetail,
    method: 'GET',
    params: { id }
  })
}

export function goodsUpdate (data) {
  return request({
    url: api.goodsUpdate,
    method: 'post',
    data
  })
}

export function goodsCatAndBrand (params) {
  return request({
    url: '/goods/catAndBrand',
    method: 'GET',
    params
  })
}

export function goodsProductPlaceList (params) {
  return request({
    url: api.goodsProductPlaceList,
    method: 'GET',
    params
  })
}
