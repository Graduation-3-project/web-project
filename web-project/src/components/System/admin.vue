<template>
    <div>
      <el-header style="background-color: #545c64;"><h3 style="color: gainsboro;">同城子女后台管理</h3></el-header>
      <el-col style="width: 18%;background:#545c64;height:600px ">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">



          <el-submenu index="1">


            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>



            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>


            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>


            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>






          <el-menu-item index="2" v-on:click="goo">
            <i class="el-icon-menu"></i>
            <span slot="title">新闻管理</span>
          </el-menu-item>




          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">通告管理</span>
          </el-menu-item>

          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title"> 统计分析</span>
          </el-menu-item>


          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">城市管理</span>
          </el-menu-item>



        </el-menu>
      </el-col>
    </div>
</template>

<script>
    export default {
        name: "admin.vue",
      methods: {

          goo(){
            this.$router.push({path:'newsManager'})
          },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      },
      mounted(){
          console.log("admin")
      }
    }
</script>

<style scoped>
.el-menu{

}
</style>
