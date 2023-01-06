import request from '@/utils/request'

export const api = {
  commentList: '/comment/list',
  commentDelete: '/comment/delete',
  commentBrandReply: '/comment/brandReply',
}

// 查询商品评论列表
export function commentList(params) {
  return request({
    url: api.commentList,
    method: 'GET',
    params
  })
}

// 删除评论
export function commentDelete(data) {
  return request({
    url: api.commentDelete,
    method: 'POST',
    data
  })
}

// 添加门店回复评论
export function commentBrandReply(data) {
  return request({
    url: api.commentBrandReply,
    method: 'POST',
    data
  })
}
