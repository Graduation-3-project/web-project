import Vue from 'vue'
import Router from 'vue-router'


import admin from './../components/System/admin.vue'
import cityManager from './../components/System/manager/cityManager'
import newsManager from './../components/System/manager/newsManager'
import noticeManager from './../components/System/manager/noticeManager'
import statisticManager from './../components/System/manager/statisticManager'
import userManager from './../components/System/manager/userManager'
import newsEdit from './../components/System/manager/newsEdit'
Vue.use(Router)

export default {
  routes:[
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children:[
        {
        path: 'newsManager',
          name:'newsManager',
        component: newsManager,
        },
        {
          path: 'noticeManager',
          name: 'noticeManager',
          component: noticeManager,
        },
        {
          path: 'statisticManager',
          name: 'statisticManager',
          component: statisticManager,
        },
        {
          path: 'userManager',
          name: 'userManager',
          component: userManager,
        },
        {
            path: 'cityManager',
            name: 'cityManager',
            component: cityManager,
        },
        {
          path: 'newsEdit',
          name: 'newsEdit',
          component: newsEdit,
        },


      ],
      meta:{
        user_type:'admin',
        passFlag:false
      }
    },
  ]

};
