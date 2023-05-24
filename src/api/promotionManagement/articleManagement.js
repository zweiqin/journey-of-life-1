import request from '@/utils/request'

export const api = {
  getArticleList: '/newarticle/getArticleList',
  getArticleTypeList: '/newarticle/getArticleTypeList',
  queryArticleTypeList: '/newarticle/queryArticleTypeList',
  saveArticleType: '/newarticle/saveArticleType',
  updateByIdArticleType: '/newarticle/updateByIdArticleType',
  articleUpdaetByStatus: '/newarticle/updaetByStatus',
  deleteByIdArticleType: '/newarticle/deleteByIdArticleType'
}

// 各大平台列表
export function getArticleList(query) {
  return request({
    url: '/newarticle/getArticleList',
    method: 'get',
    params: query
  })
}

// 获取对应平台的文章类型
export function getArticleTypeList(query) {
  return request({
    url: '/newarticle/getArticleTypeList',
    method: 'get',
    params: query
  })
}

// 文章列表
export function queryArticleTypeList(data) {
  return request({
    url: '/newarticle/queryArticleTypeList',
    method: 'post',
    data
  })
}

// 新增文章
export function saveArticleType(data) {
  return request({
    url: '/newarticle/saveArticleType',
    method: 'post',
    data
  })
}

// 编辑文章
export function updateByIdArticleType(data) {
  return request({
    url: '/newarticle/updateByIdArticleType',
    method: 'post',
    data
  })
}

// 发布、下架文章
export function articleUpdaetByStatus(data) {
  return request({
    url: '/article/updaetByStatus',
    method: 'post',
    data
  })
}

// 删除文章
export function deleteByIdArticleType(data) {
  return request({
    url: '/newarticle/deleteByIdArticleType',
    method: 'post',
    data
  })
}

