<!--
 * @Descripttion: 个人中心页面组件
 * @Author: congz
 * @Date: 2020-07-03 09:31:23
 * @LastEditors: congz
 * @LastEditTime: 2020-08-19 11:38:48
--> 

<template>
  <div class="center" id="center" name="center">
    <div class="center-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="center-content">
            <!--个人信息头部-->
            <div class="center-user">
              <div class="user-avator">
                <img :src="this.$store.getters.getAvatar" />
              </div>
              <div class="user-info">
                <p
                  style="font-size:25px;font-weight:100;color:#464547"
                >{{this.$store.getters.getUsername}}</p>
                <p>
                  <router-link to="/user/details" style="font-size:13px;color:#ff6700;">修改个人信息 ></router-link>
                </p>
              </div>
              <div class="user-message">
                <ul>
                  <li>绑定邮箱：</li>
                </ul>
              </div>
              <div class="user-data">
                <ul>
                  <li v-if="this.$store.getters.getEmail ===''">
                    <a href="javascript:;" @click="addVisible=true">绑定邮箱</a>
                  </li>
                  <li v-else>
                    {{this.$store.getters.getEmail}}
                    <a
                      href="javascript:;"
                      @click="changeVisible=true"
                    >『修改绑定』</a>
                  </li>
                </ul>
              </div>
            </div>
            <!--end--个人信息头部-->
            <div class="user-details">
              <div class>
                <img src="https://s01.mifile.cn/i/user/portal-icon-1.png" />
              </div>
              <div class="operate1">
                <p class="oper-title">待支付订单：{{notPayTotal}}</p>
                <p>
                  <router-link :to="{ path: '/order', query: {type:1} }" class="oper-href">查看待支付订单 ></router-link>
                </p>
              </div>
              <div class="operate">
                <img src="https://s01.mifile.cn/i/user/portal-icon-2.png" />
              </div>
              <div class="operate1">
                <p class="oper-title">已付款订单：{{payTotal}}</p>
                <p>
                  <router-link :to="{ path: '/order', query: {type:2} }" class="oper-href">查看已付款订单 ></router-link>
                </p>
              </div>
            </div>

          </div>
          <!-- 修改邮箱弹出框 -->
          <el-dialog title="修改邮箱" :visible.sync="changeVisible" width="25%" center>
            <el-form ref="form" :model="form" >
              <el-form-item
                prop="password"
                :rules="[{ required: true, message: '请输入账号密码', trigger: 'blur' }]"
              >
                <el-input v-model="form.password" type='password' placeholder="账号密码"></el-input>
              </el-form-item>
              <el-form-item
                prop="email"
                :rules="[
      { required: true, message: '请输入新邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
              >
                <el-input v-model="form.email" placeholder="新邮箱地址"></el-input>
              </el-form-item>
              <el-form-item
                prop="verifyCode"
                :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]"
                style="width: 60%; display: inline-block;">
                <el-input v-model="form.verifyCode" placeholder="验证码" ></el-input>
              </el-form-item>
              <el-form-item
                prop="verifyCode"
                style='display: inline-block; width: 40%; text-align: right;'>
                <el-button
                  @click="postEmail('form')"
                  style='width: 95%; text-align: center; text-overflow: ellipsis; overflow: hidden;'
                  :disabled="cannotClick">{{content}}</el-button>
              </el-form-item>
              <p>{{message}}</p>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button
                type="primary"
                @click="changeEmail('form')"
              >确认修改</el-button>
            </span>
          </el-dialog>
          <!-- 绑定邮箱弹出框END -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import CenterMenu from '../components/CenterMenu'
import * as userAPI from '@/api/users'
import * as countAPI from '@/api/count'
import { mapActions , mapGetters} from 'vuex'
import { changeEmail } from '@/api/users'
export default {
  name: 'Center',
  data() {
    return {
      clock: 0,
      notPayTotal: 0,
      payTotal: 0,
      addVisible: false,
      changeVisible: false,
      content: '获取验证码',
      message: 'Cmall 将发送一封验证邮件到你的新邮箱',
      deleteMessage: 'Cmall 将发送一封验证邮件到你的邮箱，此操作会解除邮箱绑定',
      cannotClick: false,
      totalTime: 60,
      form: {
        password: '',
        verifyCode: '',
        email: '',
        modify: true,
      },
      userInfo:{},
    }
  },
  methods: {
    ...mapActions(['setEmail']),
    changeEmail(formName){
      this.$refs[formName].validate(valid => {
          if (!valid) {
            this.notifyError('请检查注册信息！！！')
            return
          }
          this.changeVisible = false
          userAPI.changeEmail(this.form).then(res => {
            if (res.code == 200) {
              this.notifySucceed('修改成功')
              this.setEmail(this.form.email)
              this.$refs[formName].resetFields()
              if (this.totalTime !== 60) {
                window.clearInterval(this.clock)
                this.content = '发送验证码'
                this.message =
                  'Cmall 将发送一封验证邮件到你的邮箱，此邮箱将作为您的绑定邮箱'
                this.deleteMessage =
                  'Cmall 将发送一封验证邮件到你的邮箱，此操作会解除邮箱绑定'
                this.totalTime = 60
                this.cannotClick = false //这里重新开启
              }
            } else {
              this.notifyError('修改失败', res.message)
            }
          })
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
            'Cmall 将发送一封验证邮件到你的邮箱，此邮箱将作为您的绑定邮箱'
          this.deleteMessage =
            'Cmall 将发送一封验证邮件到你的邮箱，此操作会解除邮箱绑定'
          this.totalTime = 60
          this.cannotClick = false //这里重新开启
        }
      }, 1000)
    },
    postEmail(formName) {
        //this.form.operation_type = 1
        //this.form.user_id = this.$store.getters.getUser.id
        userAPI.sendEmail(this.form).then(res => {
          if (res.code == 200) {
            //this.notifySucceed('已发送验证码')
            this.countDown()
            this.message =
              '验证邮件已发送到您的邮箱，5分钟内有效，如果没有收到，请检查垃圾邮件,如果还是没有收到，请重新填写邮箱'
          } else {
            this.notifyError('发送邮件失败', res.message)
          }
      })
    },
    getPaidCount() {
      userAPI
        .getSumPaid()
        .then(res => {
          if (res.code == 200) {
            this.payTotal = res.data.total
          } else {
            this.notifyError('获取数量失败', res.message)
          }
        })
        .catch(err => {
          this.notifyError('获取数量失败', err)
        })
    },
    getUnpaidCount() {
      userAPI
        .getSumUnpaid()
        .then(res => {
          if (res.code == 200) {
            this.notPayTotal = res.data.total
          } else {
            this.notifyError('获取数量失败', res.message)
          }
        })
        .catch(err => {
          this.notifyError('获取数量失败', err)
        })
    },
    getCode() {
      userAPI
        .sendEmail(this.form)
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
  },
  created() {
    this.getPaidCount()
    this.getUnpaidCount()
  },
  components: {
    CenterMenu
  },
  computed:{
    ...mapGetters(['getUsername', 'getEmail', 'getAvatar']),
  }
}
</script>
<style scoped>
.center-layout {
  max-width: 1225px;
  margin: 0 auto;
}
.center-content {
  background-color: #ffffff;
  margin-bottom: 30px;
}
.center-user {
  height: 280px;
  width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0;
  border-bottom: 1px solid #c2c4ca;
}
.user-avator img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  padding: 5px;
  border: 1px solid #ddd;
}
.user-info {
  width: 260px;
  line-height: 30px;
  margin-left: 15px;
  padding: 0;
}
.user-message {
  line-height: 30px;
  padding: 0;
}
.user-message ul li {
  color: #77787b;
  font-size: 15px;
}
.user-data {
  line-height: 30px;
  padding: 0;
}
.user-data ul li {
  color: #77787b;
  font-size: 15px;
}
.user-data ul li a {
  color: #77787b;
}
.user-data ul li a:hover {
  color: #ff6700;
}
.user-details {
  height: 150px;
  width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-top: 50px;
}
.user-details1 {
  height: 150px;
  width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding-bottom: 50px;
}
.operate {
  margin-left: 200px;
}
.operate1 {
  line-height: 30px;
  margin-left: 20px;
}
.operate1 .oper-title {
  font-size: 20px;
  color: #7b7f86;
}
.operate1 .oper-href {
  font-size: 15px;
  color: #7b7f86;
}
.operate1 .oper-href:hover {
  color: #ff6700;
}

.email-pop-out {
  text-align: center;
}
</style>