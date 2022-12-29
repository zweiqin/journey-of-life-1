import request from '@/utils/request'

export function listArticle (query) {
  return request({
    url: '/community/richText/list',
    method: 'get',
    params: query
  })
}

export function deleteArticle (data) {
  return request({
    url: '/community/richText/delete',
    method: 'post',
    data
  })
}

export function publishArticle (data) {
  return request({
    url: '/community/richText/create',
    method: 'post',
    data
  })
}

export function detailArticle (id) {
  return request({
    url: '/community/richText/detail',
    method: 'get',
    params: { id }
  })
}

export function editArticle (data) {
  return request({
    url: '/community/richText/update',
    method: 'post',
    data
  })
}
