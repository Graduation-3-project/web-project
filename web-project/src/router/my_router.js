import Vue from 'vue'
import Router from 'vue-router'

import admin from './../components/System/admin'

Vue.use(Router)

export default new Router({
  routes:[
    {
      path: '/admin',
      name: 'adminsss',
      component: admin,
      meta:{
        user_type:'admin',
        passFlag:false
      }
    },
  ]

});

