<!--
 * @Descripttion: 注册页面组件
 * @Author: congz
 * @Date: 2020-06-11 10:01:19
 * @LastEditors: congz
 * @LastEditTime: 2020-08-18 19:58:16
--> 

<template>
  <div class="register">
    <div>
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>忘记密码</span>
        </div>
        <div class="item">
          <el-form :model="form" status-icon :rules="rules" ref="form">
            <el-form-item prop="password1">
              <el-input v-model="form.password1" placeholder="密码" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="password2">
              <el-input v-model="form.password2" placeholder="确认密码" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input v-model="form.email" placeholder="邮箱" type="email"></el-input>
            </el-form-item>
            <el-form-item prop="verifyCode" style="width: 60%;margin-right: 8px; display: inline-block">
              <el-input v-model="form.verifyCode" placeholder="验证码" ></el-input>
            </el-form-item>
            <el-form-item prop="verificationCode" style='display: inline-block'>
              <el-button  @click="getCode()" >获取验证码</el-button>
            </el-form-item>
          </el-form>
          <div style="margin-top:15px">
            <a href="javascript:;" class="btn-gradient blue block" @click="reset('form')">确认修改</a>
          </div>
          <el-link type="primary" href="/#/login" style="float:right;margin-bottom:20px;">前往登录></el-link>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import * as userAPI from '@/api/users'
export default {
  name: 'Reset',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 8 || value.length > 16) {
        callback(new Error('密码长度需在8到16之间'))
      } else {
        if (this.form.password2 !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('邮箱不能为空！'))
      } else {
        let pattern = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
        if(!pattern.test(value)) callback(new Error('请输入正确邮箱'))
        else {
          callback()
        }
      }
    }
    return {
      imageUrl: '',
      form: {
        username: '',
        password1: '',
        password2: '',
        email: '',
        verifyCode: '',

      },
      rules: {
        password1: [{ validator: validatePass, trigger: 'blur' }],
        password2: [{ validator: validatePass2, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur'}]
      }
    }
  },
  methods: {
    getCode() {
          userAPI
            .changeCodeEmail(this.form)
            .then(res => {
              if (res.code == 200) {
                this.notifySucceed('已发送验证码')
              } else {
                this.notifyError(res.message)
              }
            })
            .catch(error => {
              this.notifyError('验证码发送失败', error)
            })

    },
    reset(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.notifyError('请检查信息！！！')
          return
        }
          userAPI
            .changeCode(this.form)
            .then(res => {
              if (res.code == 200) {
                this.notifySucceed('密码修改成功')
                this.$router.push({
                  name: 'Login'
                })
              } else this.notifyError('修改失败', res.message)
            })
            .catch(error => {
              this.notifyError(error)
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
}

.box-card {
  margin: 0 auto;
  text-align: center;
  width: 400px;
  margin-top: 100px;
  margin-bottom: 200px;
  border-radius: 10px;
}
</style>
