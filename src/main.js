import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './utils/http'
import './plugins/element.js'
import './assets/css/reset.css'
import './assets/css/global.css'
import './assets/Iconiconfont/css/all.css'
import qs from 'qs';
import { VueMasonryPlugin } from 'vue-masonry';
import store from './store'
import 'windi.css'




Vue.use(VueMasonryPlugin);

//将qs挂载到全局
Vue.prototype.$qs = qs;


//挂载全局
Vue.prototype.$http = http;

// 全局模块

// 帖子
import Table from './components/module/Table'

//滑块
import Slider from './components/module/Slider'

import 'windi.css'

Vue.component('Table', Table);
Vue.component('Comment', Comment);
Vue.component('Slider', Slider);

Vue.config.productionTip = false;


Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})


// 定义全局函数
Vue.prototype.isNull = function (obj) {
  return obj === '' || obj === undefined || obj === null || (obj != null && obj.length === 0);
};

//获取token
Vue.prototype.getToken = function (token) {
  if (Vue.prototype.isNull(Vue.prototype.g_token)) {
    let token = window.localStorage.getItem("token");
    return Vue.prototype.isNull(token) ? '' : token
  }

  return Vue.prototype.g_token
};

//设置token
Vue.prototype.setToken = function (token) {
  Vue.prototype.g_token = token
  window.localStorage.setItem("token", token)
};

// 全局变量
Vue.prototype.g_token = '';

// 将时间戳转换为时间
Vue.prototype.toDates = function (times) {
  // 获取当前年份
  let NowDate = new Date()
  let NowDateYear = NowDate.getFullYear()
  let NowDateMonth = NowDate.getMonth() + 1
  let NowDateDay = NowDate.getDate()
  const date = new Date(times)
  // 年
  const Y = date.getFullYear()
  // 月
  const M = date.getMonth() + 1
  // 日
  const D = date.getDate()

  // 时
  const hours = date.getHours()
  const H = hours < 10 ? '0' + hours : hours
  // 分
  var minutes = date.getMinutes()
  const Min = minutes < 10 ? '0' + minutes : minutes
  // 秒
  // const S = date.getSeconds() < 10 ? date.getSeconds() : date.getSeconds()
  // 判断年份和当前年份是否相等
  var dateTime = ''
  if (NowDateYear === Y) {
    if (NowDateMonth === M) {
      if (NowDateDay === D) {
        dateTime = '今天\xa0' + H + ':' + Min
        return dateTime
      }
    }
    dateTime = M + '月' + D + '日\xa0' + H + ':' + Min
    return dateTime
  }
  dateTime = Y + '年' + M + '月' + D + '日\xa0' + H + ':' + Min
  return dateTime
}

Vue.prototype.getIsMobile = function () {
  return window.screen.width < 1000
}

Vue.config.devtools = true;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
