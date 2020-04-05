<template>
<div>
<h1 style="color: blueviolet;margin-top: 10%">管理员登录</h1>
  <el-form>
    <el-form-item style="margin-top: 5%">
      <label style="font-size: 20px;vertical-align:bottom;" >账号</label><el-input style="margin-left: 10px;" v-model="users.account" />
    </el-form-item>
    <el-form-item style="margin-top: 3%">
      <label style="font-size: 20px;vertical-align:bottom;" >密码</label><el-input style="margin-left: 10px;" v-model="users.password" />
    </el-form-item>
    <el-form-item style="margin-top: 0;padding: 0">

      <el-button  type="primary" style="width: 25%;margin-top: 30px;margin-left: 3.5%">登录</el-button>
      <div v-show="users.Tips">
        <h4 style="color: red;margin-left: 3.8%">账号或密码不正确</h4>
      </div>
    </el-form-item>
  </el-form>
</div>
</template>
<router-view/>
<script>
  import routes from './../../router'
  import my_routes from './../../router/my_router'
  import admin from './admin'
    export default {
        name: "LoginSystem.vue",
      data(){
          return{
            users:{
              password:'',
              account:'',
              Tips:false
            }
          }
      },
      methods:{

      },
      mounted()
      {

console.log("输出我的路由"+my_routes.routes)
        //动态添加路由
      /*  this.$router.addRoutes([
        {
          path: '/admin',
          name: 'admin',
          component: admin,
          meta:{
            user_type:'admin',
            passFlag:false
          }
        },
      ])*/
     this.$router.addRoutes(my_routes.routes)
        console.log("LoginSystem")
        this.$router.push({path:'/amdin'})

      }
    }
</script>

<style scoped>

  .el-input{
    width: 25%;
    vertical-align:bottom;
  }


</style>
