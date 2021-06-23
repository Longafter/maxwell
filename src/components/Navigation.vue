<template>
  <div class="navigation">
    <div class="div-logo">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <el-menu
      router
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        v-for="(item, i) in navList"
        :key="i"
        :index="'/' + item.navUrl"
      >
        {{ item.navName }}
      </el-menu-item>
      <el-menu-item class="user-elmenu">
        <el-dropdown trigger="click">
          <span v-if="currentUser" class="el-icon-user">
            {{ currentUser }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <span v-else @click="login()"> 登录 </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-if="currentUser"
              class="clearfix"
              @click.native="logout()"
            >
              注销
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import '../common/css/style.css'
import { postLogoutAPI } from '@/api/user.js'
export default {
  name: 'Navigation',
  data () {
    return {
      navList: [
        { navUrl: 'ComponentRessoucesOverview', navName: '组件资源总览' },
        { navUrl: 'ComponentSupermarket', navName: '组件超市' },
        { navUrl: 'ComponentAssetManagement', navName: '组件资产管理' },
        { navUrl: 'ComponentTypeManagement', navName: '组件类型管理' },
        { navUrl: 'UserAccountManagement', navName: '用户账号管理' },
        { navUrl: 'MyRelease', navName: '我的发布' },
        { navUrl: 'MyDownload', navName: '我的下载' },
      ],
      currentUser: sessionStorage.getItem('user')
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      // console.log('route: ', this.$route)
      // console.log('router: ', this.$router)
    },
    login () {
      this.$router.replace('/Login')
    },
    logout () {
      this.$confirm('此操作将注销登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postLogoutAPI().then(res => {
          console.log(res)
          sessionStorage.removeItem('isLogin')
          sessionStorage.removeItem('user')
        })
        this.$message({
          type: 'success',
          message: '注销成功!'
        })
        setTimeout(() => {
          location.reload() // 强制刷新
        }, 300)
        if (this.$route.path === '/UserAccountManagement') {
          this.$router.replace('/login')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注销'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.navigation {
  display: flex;
  width: 100%;
  height: 69px;
  .div-logo {
    background: #222732;
    padding-right: 30px;
    img {
      width: 292px;
      height: 36px;
      padding: 5px;
      margin-top: 9px;
    }
  }
  .el-menu {
    display: flex;
    height: 69px;
    width: 100%;
    background-color: #222732 !important;
    .el-menu-item {
      height: 69px;
      background-color: #222732 !important;
      font-size: 16px;
      line-height: 69px;
    }
    .is-active {
      border-bottom: 0 !important;
      border-bottom-color: #0082c8 !important;
      color: #ffffff !important;
      background-color: #0082c8 !important;
    }
    .el-dropdown {
      width: 150px;
      text-align: center;
      line-height: 69px;
      font-size: 16px;
      color: #ffffff;
      .el-icon--right {
        color: #ffffff;
      }
    }
  }
}
</style>