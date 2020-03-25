// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import my_routes from './router/my_router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.axios = axios;
Vue.use(VueAxios, axios);
Vue.use(ElementUI);


import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import Vuex from 'vuex'
import store from './store'
Vue.use(Vuex)

/* eslint-disable no-new */
//import Home from './components/Home/Home.vue'
new Vue({
  el: '#app',
  router,
  my_routes,
  store,
  components: {App},
  template: '<App/>'
/*  components:{Home},
  template:'<Home/>'*/
})
