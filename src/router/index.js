import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Room from '../views/Room.vue'
import DialogChat from '../components/DialogComps/DialogChat.vue'
import DialogAudio from '../components//DialogComps/DialogAudio.vue'
import DialogControl from '../components/DialogComps/DialogControl.vue'
import DialogIndex from '../components/DialogComps/DialogIndex.vue'
import DrawerIndex from '../components/DrawerComps/DrawerIndex.vue'
import DrawerLatest from '../components/DrawerComps/DrawerLatest.vue'
import DrawerFavorite from '../components/DrawerComps/DrawerFavorite.vue'
import DrawerFavoriteItem from '../components/DrawerComps/DrawerFavoriteItem.vue'
import Authenticate from '../views/Authenticate.vue'
// import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/authenticate',
    name: 'authenticate',
    component: Authenticate
  },
  // {
  //   path: '/dashboard2',
  //   name: 'dashboard2',
  //   component: Dashboard
  // },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Room,
    children: [
      {
        path: 'dialog',
        components: {
          rvdialog: DialogIndex
        },
        children: [
          {
            path: 'chat',
            component: DialogChat
          },
          {
            path: 'control',
            component: DialogControl
          },
          {
            path: 'audio',
            component: DialogAudio
          }
        ]
      },
      {
        path: 'drawer',
        components: {
          rvdrawer: DrawerIndex
        },
        children: [
          {
            path: 'latest',
            component: DrawerLatest
          },
          {
            path: 'favorite',
            component: DrawerFavorite
          },
          {
            path: 'favorite/:id',
            component: DrawerFavoriteItem
          }]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

/**
 * 解决报错问题：报错显示是路由重复
 * Error: Avoided redundant navigation to current location
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  // console.log('beforeEach(to, from)->', to, from)
  // redirect to login page if user is not logged in and trying to access a restricted page
  const publicPages = ['/authenticate', '/']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user_info')

  if (authRequired && !loggedIn) {
    return next('/authenticate')
  }

  next()
})

export default router
