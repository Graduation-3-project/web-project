<template>
  <div v-show="!((display==='/Register')||(display==='/Login')||(display==='/ToLogin'))">
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
      <el-menu-item  index="2" style="margin-left: 2%" v-on:click="GoNextPage('')">最新资讯</el-menu-item>
      <el-menu-item  index="3" style="margin-left: 2%" v-on:click="GoNextPage('')">交流园地</el-menu-item>
      <el-menu-item  index="4" style="margin-left: 2%" v-on:click="GoNextPage('')">最新通告</el-menu-item>
      <el-menu-item  index="5" style="margin-left: 2%" v-on:click="GoNextPage('')">作品展示</el-menu-item>
      <el-menu-item  index="6" style="margin-left: 2%" v-on:click="GoNextPage('')">科技板块</el-menu-item>
      <el-menu-item  index="7" style="margin-left: 20%"v-on:click="GoNextPage('Login')">登录</el-menu-item>
      <el-menu-item  index="8" style="margin-left: 1%" v-on:click="GoNextPage('Register')">注册</el-menu-item>
    </el-menu>
  </div>

</template>

<script>
    export default {
      name: "Home.vue",
      data() {
        return {
          activeIndex: '1',
          display:''
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
</style>
