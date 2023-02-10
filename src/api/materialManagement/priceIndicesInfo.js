import request from '@/utils/request'

export const api = {
	pricesList: '/prices/list',
	pricesDelete: '/prices/delete',
	pricesAdd: '/prices/add',
	pricesUpdate: '/prices/update'
}

// // 价格指数列表
// export function pricesList(query) {
// 	return request({
// 		url: '/prices/list',
// 		method: 'get',
// 		params: query
// 	})
// }

export function pricesDelete(data) {
	return request({
		url: '/prices/delete',
		method: 'POST',
		data
	})
}

export function pricesAdd(data) {
	return request({
		url: '/prices/add',
		method: 'POST',
		data
	})
}

export function pricesUpdate(data) {
	return request({
		url: '/prices/update',
		method: 'POST',
		data
	})
}

