/*
 * @Descripttion:
 * @Author: congz
 * @Date: 2020-07-20 11:08:33
 * @LastEditors: congz
 * @LastEditTime: 2020-08-05 15:32:59
 */
import axios from 'axios'

// 创建购物车
const postAddress = form =>
  axios.post('/api/user/addAddress', form, {
  headers: {
    token: localStorage.getItem("token"),
  },
  }).then(res => res.data)

// 读取购物车
const showAddresses = user_id =>
  axios.get(`/api/v1/addresses/${user_id}`).then(res => res.data)

// 更新购物车
const updateAddress = form =>
  axios.put('/api/v1/addresses', form).then(res => res.data)

// 删除购物车
const deleteAddress = addressID =>
  axios
    .post('/api/user/deleteAddress', { index: addressID }, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(res => res.data)

export { postAddress, showAddresses, updateAddress, deleteAddress }
