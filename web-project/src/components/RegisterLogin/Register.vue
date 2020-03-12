<template>
    <el-main>
      <el-form :model="user">
        <h1 style="cursor: pointer;color: blueviolet;font-size: 50px;margin-bottom: 5%">注册</h1>

        <el-form-item>
          <el-input placeholder="输入手机号" v-model="user.account_Number"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 3%">
          <el-input placeholder="输入验证码" v-model="register_Msg.identify_Code" style="width: inherit"/>
          <el-button type="info" v-on:click="send_Code()" style="width: inherit;display: inline">获取验证码</el-button>

        </el-form-item>
        <el-form-item style="margin-top: 3%">
          <el-button  style="width: 24%;" type="primary" v-on:click="judge_Code">确认</el-button>
        </el-form-item>
        <el-form-item v-show="register_Msg.password_PageFlag">
          <el-input placeholder="输入密码" v-model="user.password"/>
          <br/>
          <el-button style="width: 24%;margin-top: 3%" v-on:click="register_Success()" type="primary">注册</el-button>
        </el-form-item>
      <!--  <el-form-item>
          <el-input placeholder="请输入密码" v-model="user.password"></el-input>
        </el-form-item>-->
      </el-form>
    </el-main>
</template>

<script>
    export default {
        name: "Register",
      data(){
          return{
            user:{
              account_Number:'',
              password:''
            },
            register_Msg:{
              identify_Flag:false,
              identify_Code:'',
              password_PageFlag:false
            },
            db_Msg:{
              db_identify_Code:'111',
            }
          }
      },
      methods:{
        send_Code(){
         //从后台发送验证码
        },
        judge_Code(){
                 if(this.db_Msg.db_identify_Code==this.register_Msg.identify_Code)
                 {
                   this.register_Msg.password_PageFlag=true
                 }
        },
        register_Success(){


        }

      },
      mounted(){
          console.log("register")



      }
    }
</script>

<style scoped>
.el-input{
  width: 24%;
}
</style>
