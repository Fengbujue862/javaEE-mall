/*
 * @Descripttion:用户登录状态模块
 * @Author: congz
 * @Date: 2020-06-04 11:22:40
 * @LastEditors: congz
 * @LastEditTime: 2020-08-06 10:18:08
 */

export default {
  state: {
    user: '', // 登录的用户
    userId: '',
    username: '',
    email: '',
    avatar: '',
    address: [],
    availableIndex: 0,
    property:'',
    orderId:'',
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getUserid(state) {
      return state.userId
    },
    getUsername(state) {
      return state.username
    },
    getEmail(state) {
      return state.email
    },
    getAvatar(state) {
      return state.avatar
    },
    getAddress(state) {
      return state.address
    },
    getAvailableIndex(state) {
      return state.availableIndex
    },
    getProperty(state) {
      return state.property
    },
    getOrderId(state) {
      return state.orderId
    },
  },
  mutations: {
    setUser(state, data) {
      state.user = data
    },
    setUserid(state, data) {
      state.userId = data
    },
    setUsername(state, data) {
      state.username = data
    },
    setEmail(state, data) {
      state.email = data
    },
    setAvatar(state, data) {
      state.avatar = data
    },
    setProperty(state, data) {
      state.property = data
    },
    setOrderId(state, data) {
      state.orderId = data
    },
    setAddress(state, data) {
      //state.address = data
      for (let i = 0; i < data.length; i++) {
        state.address.push({id:i, info: data[i]})
      }
    },
    addAddress(state, data) {
      // 添加购物车
      // 用于在商品详情页点击添加购物车,后台添加成功后，更新vuex状态
      state.address.push(data)
      state.availableIndex += 1
    },
    deleteAddressMap(state, index) {
      //state.address.splice(index, 1)
      for (let i = 0; i < state.address.length; i++) {
        const item = state.address.at(i)
        if (item.id === index) {
          state.address.splice(index, 1)
          break
        }
      }

    },
    addAvailableIndex(state) {
      state.availableIndex += 1
    },
    setAvailableIndex(state, data) {
      state.availableIndex = data
    }
  },
  actions: {
    setUser({ commit }, data) {
      commit('setUser', data)
    },
    setUserid({ commit }, data) {
      commit('setUserid', data)
    },
    setUsername({ commit }, data) {
      commit('setUsername', data)
    },
    setEmail({ commit }, data) {
      commit('setEmail', data)
    },
    setAvatar({ commit }, data) {
      commit('setAvatar', data)
    },
    setAddress({ commit }, data) {
      commit('setAddress', data)
    },
    setProperty({ commit }, data) {
      commit('setProperty', data)
    },
    setOrderId({ commit }, data) {
      commit('setOrderId', data)
    },
    addAddress({ commit }, data) {
      commit('addAddress', data)
    },
    deleteAddressMap({ commit }, data) {
      commit('deleteAddressMap', data)
    },
    addAvailableIndex({ commit }) {
      commit('addAvailableIndex')
    },
    setAvailableIndex({ commit }, data) {
      commit('setAvailableIndex', data)
    },
  }
}
