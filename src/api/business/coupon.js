import request from '@/utils/request'

export const api = {
	couponList: '/coupon/list',
	couponCreate: '/coupon/create',
	couponRead: '/coupon/read',
	couponUpdate: '/coupon/update',
	couponDelete: '/coupon/delete',
	couponListuser: '/coupon/listuser'
}

// // 优惠券列表
// export function couponList(query) {
// 	return request({
// 		url: '/coupon/list',
// 		method: 'get',
// 		params: query
// 	})
// }

export function couponCreate(data) {
	return request({
		url: '/coupon/create',
		method: 'POST',
		data
	})
}

export function couponRead(id) {
	return request({
		url: '/coupon/read',
		method: 'GET',
		params: { id }
	})
}

export function couponUpdate(data) {
	return request({
		url: '/coupon/update',
		method: 'POST',
		data
	})
}

export function couponDelete(data) {
	return request({
		url: '/coupon/delete',
		method: 'POST',
		data
	})
}

// export function couponListuser(query) {
// 	return request({
// 		url: '/coupon/listuser',
// 		method: 'GET',
// 		params: query
// 	})
// }
