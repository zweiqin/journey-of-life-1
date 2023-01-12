/**
 * 佣金板块
*/
import request from '@/utils/request'

export const api = {
  comModuleList: '/comModule/list',
  comModuleModuleList: '/comModule/moduleList',
  comModuleAdd: '/comModule/add',
  comModuleUpdate: '/comModule/update',
  comModuleDeleted: '/comModule/deleted',
  comModuleSaveRatio: '/comModule/saveRatio',
}

// 佣金板块列表
export function comModuleList(params) {
  return request({
    url: api.comModuleList,
    method: 'GET',
    params
  })
}

// 佣金板块详情
export function comModuleModuleList(params) {
  return request({
    url: api.comModuleModuleList,
    method: 'GET',
    params
  })
}

// 添加佣金板块
export function comModuleAdd(data) {
  return request({
    url: api.comModuleAdd,
    method: 'POST',
    data
  })
}

// 编辑佣金板块
export function comModuleUpdate(data) {
  return request({
    url: api.comModuleUpdate,
    method: 'POST',
    data
  })
}

// 删除佣金板块
export function comModuleDeleted(data) {
  return request({
    url: api.comModuleDeleted,
    method: 'POST',
    data
  })
}

// 保存佣金比例
export function comModuleSaveRatio(data) {
  return request({
    url: api.comModuleSaveRatio,
    method: 'POST',
    data
  })
}

