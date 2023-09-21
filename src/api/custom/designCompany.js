import request from '@/utils/request'

export function getDescignType(params) { // 获取可选择的类型
  return request({
    url: '/sysDict',
    method: 'GET',
    params
  })
}

export function getDescignCompanyList(params) {  // 获取公司列表
  return request({
    url: '/dtsDesignCom',
    method: 'GET',
    params
  })
}

export function deleteDescignCompanyItem(params) {  // 删除数据
  return request({
    url: '/dtsDesignCom',
    method: 'DELETE',
    params
  })
}

