/*
 * @Descripttion:用户登录状态模块
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-08-06 10:18:08
 */

export default {
  state: {
    orderid: '',
    createTime: '',
    price: '',
    address:'',
    goodsInfo: [],
  },
  getters: {
    getOrderid(state) {
      return state.orderid
    },
    getCreatetime(state) {
      return state.createTime
    },
    getPrice(state) {
      return state.price
    },
    getAddress(state) {
      return state.address
    },
    getGoodsinfo(state) {
      return state.goodsInfo
    }
  },
  mutations: {
    setOrderid(state, data) {
      state.orderid = data
    },
    setCreatetime(state, data) {
      state.createTime = data
    },
    setPrice(state, data) {
      state.price = data
    },
    setAddress(state, data) {
      state.address = data
    },
    setGoodsinfo(state, data) {
      state.goodsInfo = data
    },
  },
  actions: {
    setOrderid({ commit }, data) {
      commit('setOrderid', data)
    },
    setCreatetime({ commit }, data) {
      commit('setCreatetime', data)
    },
    setPrice({ commit }, data) {
      commit('setPrice', data)
    },
    setAddress({ commit }, data) {
      commit('setAddress', data)
    },
    setGoodsinfo({ commit }, data) {
      commit('setGoodsinfo', data)
    },

  }
}
