/**
 * 会员管理
*/

import request from '@/utils/request'

export const api = {
	userList: '/user/list',
	businessList: '/partnerApply/getBusinessResponsiblePersonList',
	getRoleCount: '/user/getRoleCount',
	userUpdate: '/user/update',
	orderSVsAdd: '/orderSVs/add',
	orderSVsDeleted: '/orderSVs/deleted',
	userupSaveAndSignin: '/userup/saveAndSignin',
	partnerApplySaveAndSignin: '/partnerApply/saveAndSignin',
	bdUserAdd: '/bdUser/add',
	bdUserDeleted: '/bdUser/deleted'
}

// 会员管理列表
export function userList(params) {
	return request({
		url: api.userList,
		method: 'GET',
		params
	})
}

// 业务责任人列表
export function businessList(params) {
	return request({
		url: api.businessList,
		method: 'GET',
		params
	})
}

// 业务责任人列表
export function getRoleCount(params) {
	return request({
		url: api.getRoleCount,
		method: 'GET',
		params
	})
}

// 会员信息编辑
export function userUpdate(data) {
	return request({
		url: api.userUpdate,
		method: 'POST',
		data
	})
}

// 指派业务员
export function orderSVsAdd(data) {
	return request({
		url: api.orderSVsAdd,
		method: 'POST',
		data
	})
}

// 取消指派业务员
export function orderSVsDeleted(data) {
	return request({
		url: api.orderSVsDeleted,
		method: 'POST',
		data
	})
}

// 提交并完成门店申请
export function userupSaveAndSignin(data) {
	return request({
		url: api.userupSaveAndSignin,
		method: 'POST',
		data
	})
}

// 提交并完成合伙人申请
export function partnerApplySaveAndSignin(data) {
	return request({
		url: api.partnerApplySaveAndSignin,
		method: 'POST',
		data
	})
}

// 新增绑定关系(用于超管指定会员在平台的负责人)
export function bdUserAdd(data) {
	return request({
		url: api.bdUserAdd,
		method: 'POST',
		data
	})
}

// 取消绑定关系(用于超管指定会员在平台的负责人)
export function bdUserDeleted(data) {
	return request({
		url: api.bdUserDeleted,
		method: 'POST',
		data
	})
}
