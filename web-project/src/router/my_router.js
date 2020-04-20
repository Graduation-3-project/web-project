import Vue from 'vue'
import Router from 'vue-router'


import admin from './../components/System/admin.vue'
import cityManager from './../components/System/manager/cityManager'
import newsManager from './../components/System/manager/newsManager'
import noticeManager from './../components/System/manager/noticeManager'
import statisticManager from './../components/System/manager/statisticManager'
import userManager from './../components/System/manager/userManager.vue'
import newsEdit from './../components/System/manager/newsEdit'
import newsFirstPageManager from './../components/System/manager/newsFirstPageManager'
import noticeEdit from './../components/System/manager/noticeEdit'


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
        {
          path: 'newsFirstPageManager',
          name: 'newsFirstPageManager',
          component: newsFirstPageManager,
        },
        {
          path: 'noticeEdit',
          name: 'noticeEdit',
          component: noticeEdit,
        },



      ],
      meta:{
        user_type:'admin',
        passFlag:false
      }
    },
  ]

};
