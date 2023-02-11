import request from '@/utils/request'

export const api = {
	voucherRecordList: '/voucherRecord/list',
	holdAdd: '/hold/add'
}

// // 订单记录列表
// export function voucherRecordList(query) {
// 	return request({
// 		url: '/voucherRecord/list',
// 		method: 'get',
// 		params: query
// 	})
// }

// 手动发放代金券
export function holdAdd(data) {
	return request({
		url: '/hold/add',
		method: 'POST',
		data
	})
}
