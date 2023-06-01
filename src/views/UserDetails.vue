<!--
 * @Descripttion: 个人信息页面组件
 * @Author: congz
 * @Date: 2020-07-11 14:59:00
 * @LastEditors: congz
 * @LastEditTime: 2020-08-13 11:30:55
--> 

<template>
  <div class="user-details" id="user-details" name="user-details">
    <div class="user-details-layout">
      <el-row :gutter="10">
        <div>
          <CenterMenu></CenterMenu>
        </div>
        <el-col :span="20">
          <div class="user-details-content">
            <div class="extra"></div>
            <div class="user-details-title">
              <p>个人信息</p>
            </div>
            <div class="user-details-form">
              <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px">
                <el-form-item label="头像:">
                  <el-upload
                    action="#"
                    accept="image/png,image/jpg,image/jpeg"
                    class="avatar-uploader"
                    :file-list="file"
                    label="描述"
                    ref="upload"
                    :before-upload="fnBeforeUpload"
                    :http-request="fnUploadRequest"
                    :show-file-list="false"
                  >
                    <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__tip" slot="tip">点击上传头像,只能上传png/jpg文件，且不超过2M</div>
                  </el-upload>
                </el-form-item>
                <el-form-item prop="username" label="用户名:   ">
                  <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="margin-bottom:83px" @click="save('form')">保存</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import CenterMenu from '../components/CenterMenu'
import { mapActions } from 'vuex'
import * as uplpadAPI from '@/api/upload/'
import * as userAPI from '@/api/users/'
import th from 'element-ui/src/locale/lang/th'
export default {
  name: 'Details',
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length < 5 || value.length > 15) {
        callback(new Error('用户名长度需在5到15之间'))
      }
      callback()
    }
    return {
      file: [],
      form: {
        avatar: '',
        username: '',
      },
      rules: {
        username: [{ validator: validateUser, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions(['setUsername', 'setAvatar']),
    fnBeforeUpload(file) {
      const isPNG = file.type === 'image/png' || file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPNG) {
        this.$message.error('上传头像图片只能是 PNG/JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPNG && isLt2M
    },
    fnUploadRequest(option) {
      //console.log(option.file)
      const fd = new FormData()
      fd.append('file', option.file)
      uplpadAPI
        .UploadAvatar(fd)
        .then(res => {
          if (res.code == 200) {
            this.form.avatar = res.data[0].url
          } else {
            this.notifyError('上传失败', res.message)
          }
        })
        .catch(error => {
          this.notifyError('上传失败', error)
        })
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        }
        let payload = {}
        if(this.form.avatar !== '') payload.avatar = this.form.avatar
        if(this.form.username !== '') payload.username = this.form.username
        if(this.form.avatar === '' && this.form.username === ''){
          this.notifyError('修改内容不能为空')
          return
        }
        userAPI
          .updateUser(payload)
          .then(res => {
            if (res.code == 200) {
              // 登录信息存到本地
              // 登录信息存到vuex
              if(this.form.username !== '') this.setUsername(this.form.username)
              if(this.form.avatar !== '') this.setAvatar(this.form.avatar)
              this.notifySucceed('修改成功')
              this.$router.push({
                name: 'Center'
              })
            } else {
              this.notifyError('修改失败', res.msg)
            }
          })
          .catch(error => {
            this.notifyError('修改失败', error)
          })
      })
    }
  },
  beforeMount() {
    //this.form.username = this.$store.getters.getUsername
    //this.form.avatar = this.$store.getters.getAvatar
  },
  components: {
    CenterMenu
  }
}
</script>
<style>
.user-details-layout {
  max-width: 1225px;
  margin: 0 auto;
}
.user-details-content {
  background-color: #ffffff;
  margin-bottom: 30px;
}
.user-details-title {
  height: 100px;
  display: flex;
  align-items: center;
}
.user-details-title p {
  font-size: 30px;
  color: #757575;
  margin-left: 50px;
}
.user-details-form {
  width: 500px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #ff6700;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  max-width: 178px;
  max-height: 178px;
  border-radius: 100%;
  display: block;
}
.extra {
  height: 10px;
}
</style>