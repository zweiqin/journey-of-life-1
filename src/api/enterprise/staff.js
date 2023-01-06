import request from '@/utils/request'

export const api = {
  staffList: '/staff/list',
  staffDetail: '/staff/detail',
  staffCreate: '/staff/create',
  staffUpdate: '/staff/update',
  staffDelete: '/staff/delete',
}

// 员工列表
export function staffList(params) {
  return request({
    url: api.staffList,
    method: 'GET',
    params
  })
}

// 员工详情
export function staffDetail(params) {
  return request({
    url: api.staffDetail,
    method: 'GET',
    params
  })
}

// 新增员工
export function staffCreate(data) {
  return request({
    url: api.staffCreate,
    method: 'POST',
    data
  })
}

// 修改员工
export function staffUpdate(data) {
  return request({
    url: api.staffUpdate,
    method: 'POST',
    data
  })
}

// 删除员工
export function staffDelete(data) {
  return request({
    url: api.staffDelete,
    method: 'POST',
    data
  })
}
