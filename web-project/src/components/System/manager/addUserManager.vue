<template>
  <div style="position: absolute;width: 80%;margin-left: 19%;margin-top: 5%;">
    <el-form :model="user">
      <h1 style="cursor: pointer;color: blueviolet;font-size: 50px;margin-bottom: 5%">添加管理员</h1>
      <el-input style="width: 24%" placeholder="设置账号" v-model="user.account"/>
      <el-form-item style="margin-top: 3%">
      </el-form-item>
      <el-form-item>
        <el-input  style="width: 24%" placeholder="输入密码" v-model="user.password"/>
        <br/>
        <el-button style="width: 24%;margin-top: 3%" v-on:click="addManager()" type="primary">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "addUserManager",
      data(){
        return{
          user:{
            account:'',
            password:'',
            type:'管理员',//管理员类型
          }
        }
      },
      methods:{
          judge(){
            if(this.user.account!=''&&this.user.password!=''){
              return 1;
            }else {
              return 0;
            }
          },
        addManager(){
             if(this.judge()){
               let url="http://127.0.0.1:8080/administrator/add"
               let that=this;
               this.axios({
                 method:"post",
                 url:url,
                 data:that.user,
                 headers: {
                   'Content-Type': 'application/json;charset=UTF-8'
                 },
               }).then(function (res) {
                 that.$alert(res.data)
                 that.user.account='';
                 that.user.password='';
               })
             }else
               {
               this.$alert("请填写完信息")
             }


        }
      }
    }
</script>

<style scoped>

</style>
