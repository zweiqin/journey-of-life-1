import request from '@/utils/request'

export function getTenanConfigList(params) { // 获取租户列表
  return request({
    url: '/dtsTenantConfig',
    method: 'GET',
    params
  })
}

export function createdTenanConfig(data) { // 添加租户
  return request({
    url: '/dtsTenantConfig',
    method: 'POST',
    data
  })
}

export function updatedTenanConfig(data) { // 添加租户
  return request({
    url: '/dtsTenantConfig',
    method: 'PUT',
    data
  })
}

export function deleteTenanConfig(params) { // 删除租户
  return request({
    url: '/dtsTenantConfig',
    method: 'DELETE',
    params
  })
}

