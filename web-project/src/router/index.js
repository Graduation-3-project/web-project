import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/RegisterLogin/Register.vue'
import ToLogin from '@/components/RegisterLogin/ToLogin.vue'
import Home from '@/components/Home/Home.vue'
import Login from '@/components/RegisterLogin/Login.vue'
import News from './../components/NewsMessage/News'
import NewsNextPage from './../components/NewsMessage/NewsNextPage'
import FinishInfo from '@/components/RegisterLogin/FinishInfo.vue'
import LoginSystem from './../components/System/LoginSystem'
import HomePage from './../components/ConmunicationSpace/HomePage'
//import admin from './../components/System/admin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/ToLogin',
      name: 'ToLogin',
      component: ToLogin
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/News',
      name: 'News',
      component: News
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/LoginSystem',
      name: 'LoginSystem',
      component: LoginSystem,
      /*children:[
        {
          path: 'admin',
          name: 'admin',
          component: admin,
        }
      ]*/
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/NewsNextPage',
      name: 'NewsNextPage',
      component: NewsNextPage
    }, {
      path: '/FinishInfo',
      name: 'FinishInfo',
      component: FinishInfo
    },



  ]
})
