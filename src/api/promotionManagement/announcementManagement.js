import request from '@/utils/request'

export const api = {
  queryAnnouncementList: '/announcement/queryAnnouncementList',
  saveAnnouncement: '/announcement/saveAnnouncement',
  updaetByStatus: '/announcement/updaetByStatus',
  updateByIdAnnouncement: '/announcement/updateByIdAnnouncement',
  deleteByIdAnnouncement: '/announcement/deleteByIdAnnouncement'
}

export function queryAnnouncementList(query) {
  return request({
    url: '/announcement/queryAnnouncementList',
    method: 'get',
    params: query
  })
}

export function saveAnnouncement(data) {
  return request({
    url: '/announcement/saveAnnouncement',
    method: 'post',
    data
  })
}

export function updaetByStatus(data) {
  return request({
    url: '/announcement/updaetByStatus',
    method: 'post',
    data
  })
}

export function updateByIdAnnouncement(data) {
  return request({
    url: '/announcement/updateByIdAnnouncement',
    method: 'post',
    data
  })
}

export function deleteByIdAnnouncement(data) {
  return request({
    url: '/announcement/deleteByIdAnnouncement',
    method: 'post',
    data
  })
}

