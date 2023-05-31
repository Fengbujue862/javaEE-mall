<!--
 * @Descripttion: 登录页面组件
 * @Author: congz
 * @Date: 2020-06-11 11:08:34
 * @LastEditors: congz
 * @LastEditTime: 2020-08-19 10:14:30
--> 

<template>
  <div class="login">
    <div>
      <el-card class="box-card" shadow="hover">
        <router-link to="/">
          <img style='width: 320px' src="../assets/imgs/img.png" alt />
        </router-link>
        <div class="clearfix">
          <span>使用CMall账号 登录网站</span>
        </div>
        <div class="item">
          <el-form :model="form" status-icon :rules="rules" ref="form">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
            </el-form-item>
          </el-form>
          <div style="margin-top:15px">
            <a href="javascript:;" class="btn-gradient blue block" @click="login('form')">登录</a>
          </div>
          <el-link
            type="primary"
            href="/#/reset"
            style='margin:10px 0;float: left'>
            忘记密码？
          </el-link>
          <el-link
            type="primary"
            href="/#/register"
            style="float:right;margin:10px;"
          >注册账号></el-link>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import * as userAPI from '@/api/users'
export default {
  name: 'Login',
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (value.length < 5 || value.length > 15) {
        callback(new Error('用户名长度需在5到15之间'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 8 || value.length > 16) {
        callback(new Error('密码长度需在8到16之间'))
      }
      callback()
    }
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        user_name: [{ validator: validateUser, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions(['setUsername', 'setUserid', 'setAvatar', 'setEmail','setProperty', 'setAddress', 'setAvailableIndex']),
    getInfo(){
      userAPI.showInfo({user_id: Number.parseInt(localStorage.getItem('user_id'))} ).then(res => {
        if (res.code == 200) {
          //this.setUser(res.data[0])
          this.setUserid(res.data[0].id)
          this.setUsername(res.data[0].username)
          this.setEmail(res.data[0].email)
          this.setAvatar(res.data[0].avatar)
          this.setProperty(res.data[0].property)
          this.setAddress(res.data[0].shippingAddress)
          this.setAvailableIndex(res.data[0].shippingAddress.length)
        } else {
          this.notifyError(res.message)
          localStorage.removeItem('user_id')
          localStorage.removeItem('token')
        }
      })
    },
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }
          userAPI
            .postLogin(this.form)
            .then(res => {
              if (res.code == 200){
                let user = res.data[0].user_id
                localStorage.setItem('user_id', user)
                localStorage.setItem('token', res.data[0].token)
                // 登录信息存到vuex
                this.getInfo()
                // 弹出通知框提示登录成功信息
                this.notifySucceed('登录成功')
                this.$router.push({
                  name: 'Home'
                })
              } else this.notifyError(res.message)
            })
            .catch(error => {
              this.notifyError('登录失败', error)
            })
      })
    },
  },

  components: {}
}
</script>

<style scoped>
@import '../assets/css/button.css';
.text {
  font-size: 14px;
}

.item {
  margin: 0 auto;
  width: 300px;
}

.clearfix {
  font-size: 20px;
  margin-bottom: 20px;
}

.box-card {
  margin: 0 auto;
  text-align: center;
  width: 400px;
  margin-top: 100px;
  margin-bottom: 300px;
  border-radius: 10px;
}
.box-card .line {
  height: 30px;
  width: 300px;
  margin: 0 auto;
  border-bottom: 1px solid #c0c0c0;
}
/*其他账号登录*/
.box-card .logo {
  width: 300px;
  margin: 0 auto;
  height: 30px;
  display: flex;
  align-items: center;
}
.box-card .logo .logo-info {
  font-size: 14px;
  color: #757575;
}
.box-card .logo .logo-login {
  height: 15px;
  margin-left: 10px;
}
/*其他账号登录END*/
</style>
