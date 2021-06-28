import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    // 登录页
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    // 首页
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/Home.vue'),
    // redirect 表示当路径使用到'/'时，就自动跳转到路径为'/ComponentRessoucesOverview'
    redirect: '/ComponentRessoucesOverview',
    children: [
      // 导航栏各页
      {
        path: 'ComponentRessoucesOverview',
        name: 'ComponentRessoucesOverview',
        component: () => import('@/views/ComponentRessoucesOverview/ComponentRessoucesOverview.vue')
      },
      {
        path: 'ComponentSupermarket',
        name: 'ComponentSupermarket',
        component: () => import('@/views/ComponentSupermarket/ComponentSupermarket.vue')
      },
      {
        path: 'ComponentAssetManagement',
        name: 'ComponentAssetManagement',
        component: () => import('@/views/ComponentAssetManagement/ComponentAssetManagement.vue')
      },
      {
        path: 'ComponentTypeManagement',
        name: 'ComponentTypeManagement',
        component: () => import('@/views/ComponentTypeManagement/ComponentTypeManagement.vue')
      },
      {
        path: 'UserAccountManagement',
        name: 'UserAccountManagement',
        component: () => import('@/views/UserAccountManagement/UserAccountManagement.vue'),
        // 因为我们需要为 UserAccountManagement 界面设置登录拦截，那么需要加上 meta
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/MyRelease',
        name: 'MyRelease',
        component: () => import('@/views/MyRelease/MyRelease.vue')
      },
      {
        path: '/MyDownload',
        name: 'MyDownload',
        component: () => import('@/views/MyDownload/MyDownload.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 登录拦截
router.beforeEach((to, from, next) => {
  // isLogin为空说明未登录
  if (!sessionStorage.getItem('isLogin')) {
    if (to.path === '/UserAccountManagement') {
      return next({ path: '/Login' })
    } else {
      next()
    }
  } else {
    // 已登录
    // if (to.path === '/Login') {
    //   next({ path: '/UserAccountManagement' })
    // }
    next()
  }
})

export default router
