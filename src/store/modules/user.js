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

  }
}
