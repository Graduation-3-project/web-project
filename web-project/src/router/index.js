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
import MessageDisPlay from './../components/ConmunicationSpace/MessageDisPlay'
import PersonSpace from './../components/ConmunicationSpace/PersonSpace'


//import admin from './../components/System/admin'
Vue.use(Router)

const router = new Router({
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
    {
      path: '/MessageDisPlay',
      name: 'MessageDisPlay',
      component: MessageDisPlay
    },
    {
      path: '/PersonSpace',
      name: 'PersonSpace',
      component: PersonSpace
    },



  ]

})

import stores from './../store'

router.beforeEach((to, from, next) => {

  console.log("路由首位输出路由地址"+to.path)
  console.log("路由首位输出路由元信息="+to.meta.type)
  console.log("输出路由来源信息"+from.path)
  console.log("输出管理员权限信息"+stores.state.administrator.type)
  console.log("vuex中的值"+stores.state.count)


   let pass=false
  if(stores.state.administrator.type==="超级管理员")
  {
    to.meta.passFlag=true
  }else if(stores.state.administrator.type===to.meta.type){
    to.meta.passFlag=true
  }
  if(to.meta==='')
  {
    pass=true
  }
  if(to.meta.passFlag)
  {
    pass=to.meta.passFlag
  }
if(pass)
{
  next()
}else {
  next("/admin")
}



})
export default router
