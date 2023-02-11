import request from '@/utils/request'

export const api = {
	tradeLeadsList: '/tradeLeads/list',
	tradeLeadsDelete: '/tradeLeads/delete',
	tradeLeadsAdd: '/tradeLeads/add',
	tradeLeadsUpdate: '/messagesentry/isConversion'
}

// // 供求信息列表
// export function tradeLeadsList(query) {
// 	return request({
// 		url: '/tradeLeads/list',
// 		method: 'get',
// 		params: query
// 	})
// }

export function tradeLeadsDelete(data) {
	return request({
		url: '/tradeLeads/delete',
		method: 'post',
		data
	})
}

export function tradeLeadsAdd(data) {
	return request({
		url: '/tradeLeads/add',
		method: 'post',
		data
	})
}

export function tradeLeadsUpdate(data) {
	return request({
		url: '/tradeLeads/update',
		method: 'post',
		data
	})
}

