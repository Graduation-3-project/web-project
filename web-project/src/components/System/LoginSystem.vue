<template>
<div>
<h1 style="color: blueviolet;margin-top: 10%">管理员登录</h1>
  <el-form>
    <el-form-item style="margin-top: 5%">
      <label style="font-size: 20px;vertical-align:bottom;" >账号</label><el-input style="margin-left: 10px;" v-model="users.account" />
    </el-form-item>
    <el-form-item style="margin-top: 3%">
      <label style="font-size: 20px;vertical-align:bottom;" >密码</label><el-input type="password" style="margin-left: 10px;" v-model="users.password" />
    </el-form-item>

    <el-form-item style="margin-top: 0;padding: 0">

      <el-button  v-on:click="loginSystem()" type="primary" style="width: 25%;margin-top: 30px;margin-left: 3.5%">登录</el-button>
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
              type:'',
              loginFlag:false
            }
          }
      },

      methods:{
              loginSystem(){
              //  data:that.users,
                let url="http://127.0.0.1:8080/administrator/login"
                let that=this;
                this.axios({
                  method:"post",
                  url:url,
                  params:{
                    password:that.users.password,
                    account:that.users.account
                  },
                  headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                  },
                }).then(function (res) {

                  if(res.data){
                    that.getOne();
                    that.GoNextPage()
                  }else {
                    that.$alert("登录失败")
                  }
                })

              },
              getOne(){
                let url="http://127.0.0.1:8080/administrator/getOne"
                let that=this;
                this.axios({
                  method:"get",
                  url:url,
                  params:{
                    account:this.users.account
                  },
                  headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                  },
                }).then(function (res) {
                       that.$store.commit("setAdministrator",res.data);
                })



                },
              GoNextPage(){
                this.$router.addRoutes(my_routes.routes)
                this.$router.push({path:'/admin'})
              }
      },
      mounted()
      {
       //console.log("输出我的路由"+my_routes.routes)
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
      // this.$router.push({path:'/admin'})

      }
    }
</script>

<style scoped>
  .el-input{
    width: 25%;
    vertical-align:bottom;
  }
</style>
