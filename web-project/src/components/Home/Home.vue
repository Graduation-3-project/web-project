<template>
  <div  v-show="!((display==='/Register')||(display==='/Login')||(display==='/ToLogin'))">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!--cornflowerblue-->

      <el-menu-item style="size: 50px;color: cornflowerblue;margin-bottom: 10px">
        <!--  <h1 style="float: left">C r e a t o r</h1>-->
        <h1 style="float: left">同城子女</h1>
        <!--<h2 style="float: left;margin-left: 10px">缔 造 者</h2>-->
      </el-menu-item>
      <el-menu-item  index="1" style="margin-left: 3%" v-on:click="GoNextPage('')">首页</el-menu-item>
      <el-menu-item  index="2" style="margin-left: 2%" v-on:click="GoNextPage('News')">最新资讯</el-menu-item>
      <el-menu-item  index="3" style="margin-left: 2%" v-on:click="GoNextPage('HomePage')">交流园地</el-menu-item>
      <el-menu-item  index="4" style="margin-left: 2%" v-on:click="GoNextPage('')">最新通告</el-menu-item>
      <el-menu-item  v-show="loginFlag" index="7" style="margin-left: 20%"v-on:click="GoNextPage('Login')">登录</el-menu-item>
      <el-menu-item  v-show="loginFlag" index="8" style="margin-left: 1%" v-on:click="GoNextPage('Register')">注册</el-menu-item>
      <el-menu-item  v-show="!loginFlag" index="9" style="margin-left: 27%;">
        <img  style="width: 30px;height: 30px;margin-right:1%"  @click="centerDialogVisible = true" src="./../../assets/login.png"/>
        <el-dialog
          style="margin-left: 80%;"
          title="已登录"
          :visible.sync="centerDialogVisible"
          width="90%"
          center>
          <p v-on:click="GoPersonalCenter">个人信息</p>
           <p>退出</p>
        </el-dialog>
      </el-menu-item>

    </el-menu>

   <!-- <div v-show="0" style="width:300px;height:200px;background: blueviolet;margin-left: 70%">
      personal_center
    </div>-->

    <el-container>
      <el-aside width="20%">
        Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>


    <el-container>
      <el-aside width="20%">
       aside
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>



  </div>

</template>
<script>
    export default {
      name: "Home.vue",
    /*  name: "Home",*/
        data() {
        return {
          activeIndex: '1',
          display:'',
          allMessageData:'',
          centerDialogVisible:false,
          loginFlag:true
        }
      },
        methods: {
          handleSelect(key, keyPath) {
            console.log(key, keyPath);
          },
          GoNextPage(path){
            if(path==="ToLogin"||path==="Register"||path==="Login")
            {
              this.display=false;
            }
            let paths='/'+path
            this.$router.push({path:paths});
          },
          GoPersonalCenter(){

            if(this.$route.path!="FinishInfo")
            this.$router.push({path:"/FinishInfo"})
          }
        },
      mounted(){
          //
        console.log("Home"+this.$route.params.loginFlag);
        if(this.$route.params.loginFlag==false){
          this.loginFlag=this.$route.params.loginFlag
        }

      }
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .personal_center{
    /*background: url("./../../assets/login.png");
    width: 50px;
    height: 50px;*/
    width:300px;height:200px;background: blueviolet;margin-left: 70%
  }

</style>
