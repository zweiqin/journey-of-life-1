import request from '@/utils/request'

export const api = {
  listArticle: '/richText/list',
  deleteArticle: '/richText/delete',
  publishArticle: '/richText/create',
  detailArticle: '/richText/detail',
  editArticle: '/richText/update'
}

// export function listArticle(query) {
//   return request({
//     url: '/richText/list',
//     method: 'get',
//     params: query
//   })
// }

export function deleteArticle(data) {
  return request({
    url: '/richText/delete',
    method: 'post',
    data
  })
}

export function publishArticle(data) {
  return request({
    url: '/richText/create',
    method: 'post',
    data
  })
}

export function detailArticle(id) {
  return request({
    url: '/richText/detail',
    method: 'get',
    params: { id }
  })
}

export function editArticle(data) {
  return request({
    url: '/richText/update',
    method: 'post',
    data
  })
}

