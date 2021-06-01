import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'

import axios from 'axios'
axios.defaults.baseURL='http://timemeetyou.com:8889/api/private/v1/';
//axios请求拦截器
axios.interceptors.request.use(
  config=>{
    config.headers.Authorization=window.sessionStorage.getItem('token');
   return config;
  }
)
Vue.prototype.$http=axios;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
