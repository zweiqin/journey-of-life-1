import request from '@/utils/request'

export const api = {
  getNewSupplierList: '/newsupplier/getNewSupplierList',
  newsupplierSave: '/newsupplier/save',
  newsupplierUpdateById: '/newsupplier/updateById',
  getNewSupplierInfo: '/newsupplier/getNewSupplierInfo',
  newsupplierDeleteById: '/newsupplier/deleteById'
}

// 查询供应商列表
export function getNewSupplierList(data) {
  return request({
    url: api.getNewSupplierList,
    method: 'POST',
    data
  })
}

// 查询供应商详情
export function getNewSupplierInfo(params) {
  return request({
    url: `${api.getNewSupplierInfo}/${params.id}`,
    method: 'GET',
    params
  })
}

// 添加供应商
export function newsupplierSave(data) {
  return request({
    url: api.newsupplierSave,
    method: 'POST',
    data
  })
}

// 编辑供应商
export function newsupplierUpdateById(data) {
  return request({
    url: api.newsupplierUpdateById,
    method: 'POST',
    data
  })
}

// 删除供应商
export function newsupplierDeleteById(params) {
  return request({
    url: api.newsupplierDeleteById,
    method: 'DELETE',
    params
  })
}
