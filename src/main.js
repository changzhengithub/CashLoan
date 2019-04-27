// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import fastclick from 'fastclick'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// Vue.use(VueAwesomeSwiper)
import 'swiper/dist/css/swiper.css'

import { Tab, Tabs, Picker, Popup, PullRefresh, Toast, Step, Steps, Actionsheet, Uploader } from 'vant'
Vue.use(Tab).use(Tabs).use(Picker).use(Popup).use(PullRefresh).use(Toast).use(Step).use(Steps).use(Actionsheet).use(Uploader)
// 引入公共样式
import '../static/iconfont/iconfont.css'
import './assets/sass/main.scss'
import './assets/css/reset.css'
require('es6-promise').polyfill()
Es6Promise.polyfill()
// 300延迟
fastclick.attach(document.body)

Vue.config.productionTip = false

// 拦截路由判断是否需要登录
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.state.token) { // 通过vuex state获取当前的token是否存在
      next()
    }
    else {
      next({
        path: '/empower'
      })
    }
  }
  else {
    next()
  }
  next()
})
/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
