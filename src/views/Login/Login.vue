<template>
  <div class="div-login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名：" prop="userName">
        <el-input
          ref="userName"
          v-model="loginForm.userName"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          show-password
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 按需导入每个API
import { postLoginAPI } from '@/api/user.js'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入正确的用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码至少六位', trigger: 'blur' },
          { min: 6, message: '密码至少六位', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // 输入框为空时，聚焦输入框
    if (this.loginForm.userName === '') {
      this.$refs.userName.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    onLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          let params = {
            password: this.loginForm.password,
            userName: this.loginForm.userName
          }
          postLoginAPI(params).then(res => {
            console.log(res)
            if (res.data.code === 200) {
              sessionStorage.setItem('isLogin', 1)
              sessionStorage.setItem('user', this.loginForm.userName)
              this.$router.push('/UserAccountManagement')
            } else {
              alert(res.data.message)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit')
          return false
        }
      })
    }
  }
}
</script>

<style>
.div-login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.div-login .el-form {
  display: flex;
  flex-direction: row;
}
</style>
