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
import addUserManager from './../components/System/manager/addUserManager'


Vue.use(Router)

export default  {
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
          meta:{
            type:'新闻管理员',
            passFlag:false
          }
        },
        {
          path: 'noticeManager',
          name: 'noticeManager',
          component: noticeManager,
          meta:{
            type:'通告管理员',
            passFlag:false
          }
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
          meta:{
            type:'用户管理员',
            passFlag:false
          },

        },
        {
            path: 'cityManager',
            name: 'cityManager',
            component: cityManager,
            meta:{
            type:'城市管理员',
            passFlag:false
          }
        },
        {
          path: 'newsEdit',
          name: 'newsEdit',
          component: newsEdit,
          meta:{
            type:'新闻管理员',
            passFlag:false
          }
        },
        {
          path: 'newsFirstPageManager',
          name: 'newsFirstPageManager',
          component: newsFirstPageManager,
          meta:{
            type:'新闻管理员',
            passFlag:false
          }
        },
        {
          path: 'noticeEdit',
          name: 'noticeEdit',
          component: noticeEdit,
          meta:{
            type:'通告管理员',
            passFlag:false
          }
        },
        {
          path: 'addUserManager',
          name: 'addUserManager',
          component: addUserManager,
          meta:{
            type:'用户管理员',
            passFlag:false
          }
        },
      ],
      meta:{
        user_type:'admin',
        passFlag:false
      }
    },
  ],


};

