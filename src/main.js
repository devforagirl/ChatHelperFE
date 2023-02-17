import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueToast from 'vue-toast-notification'
import dayjs from 'dayjs'
import 'vue-toast-notification/dist/theme-sugar.css'
import './registerServiceWorker'

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

Vue.prototype.$dayjs = dayjs

Vue.prototype.$axios = axios

console.log('process.env.VUE_APP_API_URL->', process.env.VUE_APP_API_URL)

Vue.use(VueToast, {
  position: 'top-right'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created() {
    const userString = localStorage.getItem('user_info')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('mutation_set_userInfoData', userData)
    }
    // 添加axios的响应拦截器，用来统一处理401错误码时怎么做
    axios.interceptors.response.use(
      response => response,
      error => {
        console.log(error.response)
        if (error.response.status === 401) {
          this.$store.dispatch('action_exit')
        }
        return Promise.reject(error)
      }
    )
  },
  render: (h) => h(App)
}).$mount('#app')
