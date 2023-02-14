import request from '@/utils/request'

export const api = {
	roleList: '/role/list',
	roleCreate: '/role/create',
	roleUpdate: '/role/update',
	roleDelete: '/role/delete',
	rolePmsList: '/role/pmsList',
	rolePermissions: '/role/permissions'
}

// 角色列表
export function roleList(params) {
	return request({
		url: api.roleList,
		method: 'GET',
		params
	})
}

// 新增角色
export function roleCreate(data) {
	return request({
		url: api.roleCreate,
		method: 'POST',
		data
	})
}

// 修改角色
export function roleUpdate(data) {
	return request({
		url: api.roleUpdate,
		method: 'POST',
		data
	})
}

// 删除角色
export function roleDelete(data) {
	return request({
		url: api.roleDelete,
		method: 'POST',
		data
	})
}

// 权限列表
export function rolePmsList(params) {
	return request({
		url: api.rolePmsList,
		method: 'GET',
		params
	})
}

// 权限修改
export function rolePermissions(data) {
	return request({
		url: api.rolePermissions,
		method: 'POST',
		data
	})
}
