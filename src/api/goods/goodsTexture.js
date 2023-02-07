import request from '@/utils/request'

export const api = {
	goodsTextureList: '/todo'
}

// 查询商品材质列表
export function goodsTextureList(params) {
	return request({
		url: api.goodsTextureList,
		method: 'GET',
		params
	})
}
