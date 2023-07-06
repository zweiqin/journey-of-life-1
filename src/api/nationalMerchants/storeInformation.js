import request from '@/utils/request';

export const api = {
  getNearbyBusiness: '/gaode/poi/queryVicinityShop',
};

// 获取附近商家列表
export function getNearbyBusinessList(data) {
  return request({
    url: api.getNearbyBusiness,
    method: 'GET',
    data,
  });
}
