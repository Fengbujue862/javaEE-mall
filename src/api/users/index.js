/*
 * @Descripttion:调用后端用户接口的函数
 * @Author: congz
 * @Date: 2020-06-11 09:39:58
 * @LastEditors: congz
 * @LastEditTime: 2020-08-19 10:16:06
 */

import axios from 'axios'

//注册
const postUser = form =>
  axios.post('/api/user/register', form).then(res => res.data)
//登录
const postLogin = form =>
  axios.post('/api/user/login', form).then(res => res.data)
//忘记密码
const changeCode = form =>
  axios.post('/api/user/changePasswordByEmail', form).then(res => res.data)
//忘记密码邮箱验证
const changeCodeEmail = form =>
  axios.post('/api/user/sendForgotPasswordEmail', form).then(res => res.data)
//修改邮箱
const changeEmail = form =>
  axios.post('/api/user/modifyEmail', form,{
    headers: {
      token: localStorage.getItem("token"),
    },
  }).then(res => res.data)
//获取登录信息
const showInfo = form =>
  axios.get('/api/user/showInfo', {
    params: {
      user_id: form.user_id
    },
    headers: {
      token: localStorage.getItem("token"),
    },
  }).then(res => res.data)
//修改信息
const updateUser = form => axios.post('/api/user/modifyUserInfo', form, {
  headers: {
    token: localStorage.getItem("token"),
  },
}).then(res => res.data)


//发送验证码邮件
const sendEmail = form =>
  axios.post('/api/user/sendRegistrationVerificationCode',form).then(res => res.data)

const getSumPaid = () =>
  axios.get('/api/shopping/listOrders', {
    params: {
      limit: 10000,
      page: 1,
      state: "PAID"
    },
    headers: {
      token: localStorage.getItem("token"),
    },

  }).then(res => res.data)

const getSumUnpaid = () =>
  axios.get('/api/shopping/listOrders', {
    params: {
      limit: 10000,
      page: 1,
      state: "UNPAID"
    },
    headers: {
      token: localStorage.getItem("token"),
    },

  }).then(res => res.data)
//登出
const postLogout = form =>
  axios.get('/api/user/logout', {
    headers: {
      token: localStorage.getItem("token"),
    },
  }).then(res => res.data)
//绑定或解绑邮箱
const vaildEmail = val =>
  axios.post('/api/v1/user/vaild-email', { token: val }).then(res => res.data)


//QQ登录
const qqLogin = code =>
  axios
    .post('/api/v1/qq/login', { authorization_code: code })
    .then(res => res.data)


export {
  postUser,
  postLogin,
  changeCode,
  changeCodeEmail,
  changeEmail,
  showInfo,
  updateUser,
  sendEmail,
  getSumUnpaid,
  getSumPaid,
  postLogout,
  vaildEmail,
  qqLogin,
}
