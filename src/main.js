import Vue from 'vue'
import Lockr from 'lockr'
import axios from 'axios'
import NProgress from 'nprogress' // Progress 进度条
import _g from '@/utils/global'
import Cookies from 'js-cookie'
import filter from '@/utils/filter'  //导入全局的vue过滤器
import _ from 'lodash'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import '@/icons' // icon
//import '@/permission' // permission control

Vue.config.productionTip = false

let bus = new Vue();

//绑定第三方插件到window全局
window.router = router;
window.axios = axios;
window._g = _g;
window._ = _;
window.bus = bus;
window.Lockr = Lockr;
window.store = store;
window.Cookies = Cookies

console.log(router)

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  zhLocale
});

axios.defaults.baseURL = 'http://js.upingou.com/';
axios.defaults.timeout = 1000 * 15;
axios.defaults.headers.authKey = Lockr.get('authKey');
axios.defaults.headers.sessionId = Lockr.get('sessionId');
axios.defaults.headers['Content-Type'] = 'application/json';

const whiteList = [`/login`]; // 不重定向白名单  如果当前是登录页就不需要重定向login
router.beforeEach((to, from, next) => {
  NProgress.start();
  if(to.meta.requireAuth){  //判断该路由是否需要登录权限
    let authkey = Lockr.get(`authKey`);
    let sessionId = Lockr.get('sessionId');
    if(authkey || sessionId){
      if(to.path === '/login'){
        next({ path: '/' });
        NProgress.done();
      }else{
        next();
      }
    }else{
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login');
        NProgress.done();
      }
    }
  }else{
    next();
  }
});

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

import mixins from "./utils/mixins";
Vue.use(mixins);

new Vue({
  el: '#app',
  router,
  filters: filter,
  store,
  i18n,
  template: '<App/>',
  components: { App }
});

