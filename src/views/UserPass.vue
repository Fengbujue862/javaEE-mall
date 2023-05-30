<!--
 * @Descripttion: 
 * @Author: congz
 * @Date: 2020-08-09 12:53:22
 * @LastEditors: congz
 * @LastEditTime: 2020-08-09 21:31:44
-->
<template>
  <div class="user-pass" id="user-pass" name="user-pass">
    <div class="user-pass-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="user-pass-content">
            <div class="extra"></div>
            <div class="user-pass-title">
              <p>修改密码</p>
            </div>
            <div class="user-pass-form" v-if="this.$store.getters.getEmail">
              <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px">
                <el-form-item label="密码" prop="password1">
                  <el-input type="password" v-model="form.password1" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                  <el-input type="password" v-model="form.password2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                  label="验证码"
                  style="width: 70%; display: inline-block;"
                  prop="verifyCode">
                  <el-input v-model="form.verifyCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                  label-width='0'
                  style='display: inline-block; width: 30%; text-align: right;'>
                  <el-button
                    @click="getCode()"
                    :disabled="cannotClick"
                    style='width: 95%; text-align: center; text-overflow: ellipsis; overflow: hidden;'
                    >{{content}}</el-button>
                </el-form-item>
                <p
                  style="margin-left:20px;margin-bottom:10px;color:#757575;font-size:15px"
                >{{message}}</p>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitForm('form')"

                  >修改密码</el-button>
                  <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="bind-email" v-else>
              <span>请先前往</span>
              <router-link to="/center" class="bind-email-href">个人中心</router-link>
              <span>绑定邮箱</span>
            </div>
            <div class="extra"></div>
            <div class="extra"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import CenterMenu from '../components/CenterMenu'
import * as userAPI from '@/api/users'
export default {
  name: 'UpdatePass',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 8 || value.length > 16) {
        callback(new Error('密码长度需在8到16之间'))
      } else {
        if (this.form.password_confirm !== '') {
          this.$refs.form.validateField('password_confirm')
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
    var validateVerifyCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      form: {
        password1: '',
        password2: '',
        verifyCode: '',
        email: '',
        modify: true
      },
      clock: '',
      rules: {
        password1: [{ validator: validatePass, trigger: 'blur' }],
        password2: [{ validator: validatePass2, trigger: 'blur' }],
        verifyCode: [{ validator: validateVerifyCode, trigger: 'blur' }]
      },
      content: '发送验证码',
      cannotClick: false,
      totalTime: 60,
      message: 'Cmall 将发送一封验证邮件到账号绑定邮箱，此操作会更改账号密码'
    }
  },
  methods: {
    getCode(){
      userAPI
        .changeCodeEmail({ email : this.$store.getters.getEmail})
        .then(res => {
          if (res.code == 200) {
            this.notifySucceed('已发送验证码')
            this.countDown()
          } else {
            this.notifyError(res.message)
          }
        })
        .catch(error => {
          this.notifyError('验证码发送失败', error)
        })

    },
    //按钮点击计时器
    countDown() {
      if (this.cannotClick) return //改动的是这两行代码
      this.cannotClick = true
      this.content = this.totalTime + 's后重新发送'
      this.clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(this.clock)
          this.content = '发送验证码'
          this.message =
            'Cmall 将发送一封验证邮件到账号绑定邮箱，此操作会更改账号密码'
          this.totalTime = 60
          this.cannotClick = false //这里重新开启
        }
      }, 1000)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.email = this.$store.getters.getEmail
          userAPI.changeCode(this.form).then(res => {
            if (res.code == 200) {
              this.message =
                'Cmall 将发送一封验证邮件到账号绑定邮箱，此操作会更改账号密码'
              this.notifySucceed('密码修改成功')
              if (this.totalTime !== 60) {
                window.clearInterval(this.clock)
                this.content = '发送验证码'
                this.message =
                  'Cmall 将发送一封验证邮件到账号绑定邮箱，此操作会更改账号密码'
                this.totalTime = 60
                this.cannotClick = false //这里重新开启
              }
            } else {
              this.notifyError('发送邮件失败', res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  components: {
    CenterMenu
  }
}
</script>
<style scoped>
.user-pass-layout {
  max-width: 1225px;
  margin: 0 auto;
}
.user-pass-content {
  background-color: #ffffff;
  margin-bottom: 30px;
}
.user-pass-title {
  height: 100px;
  display: flex;
  align-items: center;
}
.user-pass-title p {
  font-size: 30px;
  color: #757575;
  margin-left: 50px;
}
.extra {
  height: 10px;
}
.user-pass-form {
  width: 500px;
}
.bind-email {
  margin-left: 50px;
  color: #757575;
}
.bind-email .bind-email-href {
  color: #757575;
  margin-left: 5px;
  margin-right: 5px;
}
.bind-email .bind-email-href:hover {
  color: #ff6700;
}
</style>