import request from '@/utils/request'

export const api = {
	pricesViewList: '/pricesView/list',
	pricesViewDelete: '/pricesView/delete',
	pricesViewAdd: '/pricesView/add',
	pricesViewUpdate: '/pricesView/update'
}

// // 价格指数图表列表
// export function listGet (query) {
//   return request({
//     url: '/pricesView/list',
//     method: 'get',
//     params: query
//   })
// }

export function pricesViewDelete(data) {
	return request({
		url: '/pricesView/delete',
		method: 'POST',
		data
	})
}

export function pricesViewAdd(data) {
	return request({
		url: '/pricesView/add',
		method: 'POST',
		data
	})
}

export function pricesViewUpdate(data) {
	return request({
		url: '/pricesView/update',
		method: 'POST',
		data
	})
}

