<template>
  <el-container>
      <el-header style="background-color: #545c64;display: inline"><h3 style="color: gainsboro;">同城子女后台管理</h3>
      <el-button type="text"  style="position: absolute;cursor: pointer;top: 10px;left: 90%"   v-on:click="quitLogin">退出</el-button>
      </el-header>
      <el-col style="width: 18%;background:#545c64;height:800px ">
        <el-menu

          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">

          <el-submenu index="1">
            <template slot="title" >
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>

            <el-menu-item-group >
              <el-menu-item index="1-1" v-on:click="goNextPage('userManager')">用户管理</el-menu-item>
             <!-- <el-menu-item index="1-2">选项2</el-menu-item>-->
            </el-menu-item-group>
            <el-menu-item-group >
              <el-menu-item index="1-2" v-on:click="goNextPage('addUserManager')">添加管理</el-menu-item>
              <!-- <el-menu-item index="1-2">选项2</el-menu-item>-->
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title" >
              <i class="el-icon-location"></i>
              <span>新闻管理</span>
            </template>

            <el-menu-item-group>
              <el-menu-item index="1-1" v-on:click="goNextPage('newsManager')">文本管理</el-menu-item>
              <el-menu-item index="1-2" v-on:click="goNextPage('newsEdit')">文本编辑</el-menu-item>
              <el-menu-item index="1-3" v-on:click="goNextPage('newsFirstPageManager')">首页管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title" >
              <i class="el-icon-location"></i>
              <span>通告管理</span>
            </template>

            <el-menu-item-group>
              <el-menu-item index="1-1" v-on:click="goNextPage('noticeManager')">同告管理</el-menu-item>
              <el-menu-item index="1-2" v-on:click="goNextPage('noticeEdit')">通告编辑</el-menu-item>
            </el-menu-item-group>
          </el-submenu>


          <el-menu-item index="4" v-on:click="goNextPage('statisticManager')">
            <i class="el-icon-setting"></i>
            <span slot="title"> 统计分析</span>
          </el-menu-item>

          <el-menu-item index="5" v-on:click="goNextPage('cityManager')">
            <i class="el-icon-setting"></i>
            <span slot="title">城市管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <router-view></router-view>
  </el-container>
</template>

<script>
    export default {
        name: "admin.vue",
      data(){
        return{
          goNextPageFlag:""
        }
      },
      computed:{
        administrator(){
          return this.$store.state.administrator
        }
      },
      methods: {
        goNextPage(paths){
            if(this.goNextPageFlag!=("/admin/"+paths))
            {
              this.$router.push({path:'/admin/'+paths})
              this.goNextPageFlag='/admin/'+paths;
            }
          },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        quitLogin(){

          //this.$store.state.administrator.id
           console.log("输出管理员信息"+ this.$store.state.administrator.id)
          let url="http://127.0.0.1:8080/administrator/quitLogin"
          let that=this;
          this.axios({
            method:"post",
            url:url,
            params:{
            id:that.$store.state.administrator.id
            },
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
          }).then(function (res) {
            that.$router.push({path:'/LoginSystem'})

          });
          }


      },
      mounted(){
        //console.log("输出用户类型"+this.$route.meta.type)
      }
    }
</script>

<style scoped>

</style>
