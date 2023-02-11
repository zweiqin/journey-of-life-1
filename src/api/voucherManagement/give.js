import request from '@/utils/request'

export const api = {
	circulaList: '/circula/list',
	circulaCircula: '/circula/circula'
}

// // 转赠记录列表
// export function circulaList(query) {
// 	return request({
// 		url: '/circula/list',
// 		method: 'GET',
// 		params: query
// 	})
// }

// 转赠
export function circulaCircula(data) {
	return request({
		url: '/circula/circula',
		method: 'POST',
		data
	})
}
