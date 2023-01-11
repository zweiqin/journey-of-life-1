/**
 * 订单管理
*/
import request from '@/utils/request'
import Qs from 'qs'

export const api = {
  orderList: '/order/list',
  orderDetail: '/order/detail',
  orderShip: '/order/ship',
  orderChangePrice: '/order/changePrice',
  orderRefund: '/order/refund',
  orderIsFreeze: '/order/isFreeze',
  orderAddLineOrder: '/order/addLineOrder',
  orderListShipChannel: '/order/listShipChannel',
}

// 订单管理列表
export function orderList(params) {
  return request({
    url: api.orderList,
    method: 'GET',
    params,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

// 订单详情
export function orderDetail(params) {
  return request({
    url: api.orderDetail,
    method: 'GET',
    params
  })
}

// 订单发货
export function orderShip(data) {
  return request({
    url: api.orderShip,
    method: 'POST',
    data
  })
}

// 订单发货
export function orderChangePrice(data) {
  return request({
    url: api.orderChangePrice,
    method: 'POST',
    data
  })
}

// 订单退款
export function orderRefund(data) {
  return request({
    url: api.orderRefund,
    method: 'POST',
    data
  })
}

// 订单冻结/解冻
export function orderIsFreeze(params) {
  return request({
    url: api.orderIsFreeze,
    method: 'GET',
    params
  })
}

// 添加线下下单
export function orderAddLineOrder(data) {
  return request({
    url: api.orderAddLineOrder,
    method: 'POST',
    data
  })
}

// 快递公司列表
export function orderListShipChannel(params) {
  return request({
    url: api.orderListShipChannel,
    method: 'GET',
    params
  })
}