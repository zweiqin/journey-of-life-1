import { regionList } from '@/api/business/region'
import XeUtils from 'xe-utils'

const commonStore = {
  state: {
    common_regionList: [], // 区域集合
  },
  mutations: {
    SET_RegionList: (state, data) => {
      state.common_regionList = data
    },
  },
  actions: {
    async GET_RegionList({ commit }) {
      const res = await regionList()
      XeUtils.eachTree(res.data.items, item => {
        if (Array.isArray(item.children) && item.children.length === 0) {
          item.children = undefined
        }
      })
      commit('SET_RegionList', res.data.items)
    },
  }
}

export default commonStore
