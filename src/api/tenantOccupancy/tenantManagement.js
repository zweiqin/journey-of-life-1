import request from '@/utils/request'

export function getTenantList(params) { // 获取租户列表
  return request({
    url: '/tenant',
    method: 'GET',
    params
  })
}

export function getTenantDetail(params) { // 获取租户详情
  return request({
    url: `/tenant/${params}`,
    method: 'GET'
  })
}

export function getQueryDeletailByKey(params) {
  return request({
    url: `/sysDict/queryDetailByKey`,
    params: { key: 'page_style' } // 获取页面风格
  })
}

export function getTenantPermisson(params) { // 获取租户权限
  return request({
    url: '/tenant/tenantPermissionList',
    method: 'GET',
    params
  })
}

export function getTenantPfGoodsList(params) { // 获取租户商品列表
  return request({
    url: '/tenant/tenantPfGoodsList',
    method: 'GET',
    params
  })
}

export function getGoodsList(params) { // 获取商品列表
  return request({
    url: '/tenant/pfGoodsList',
    method: 'GET',
    params
  })
}

export function createTenant(data) { // 获取租户列表
  return request({
    url: '/tenant',
    method: 'POST',
    data
  })
}

export function updatedTenant(data) { // 修改租户列表
  return request({
    url: `/tenant`,
    method: 'PUT',
    data
  })
}

export function deleteTenant(data) { // 删除租户
  return request({
    url: `/tenant?id=${data}`,
    method: 'DELETE'
  })
}
