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
        <h3 v-if="db_Msg.db_identify_Code!=''">{{db_Msg.db_identify_Code}}</h3>
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
              db_identify_Code:'',
              db_User:'',
            },
            cooki_Msg:{
              local_Msg:{
                user_Account:'',
                user_Password:'',
                login_Flat:true,
                user_id:''
              },
              cooki_Name:''
            }
          }
      },
      methods:{
        send_Code(){
          let that=this;
          let url="http://127.0.0.1:8080/register/getVerificationCode.json";
          {
            this.axios({
              method: 'get',
              url: url,
              params:{
                number:that.user.account_Number
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }, /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
            }).then(function (res) {
              if(res.data===''){
                that.db_Msg.db_identify_Code="您已经注册了"
                console.log("输出返回值"+res.data)
              }else {
                console.log("验证码"+res.data.userRegisterCode);
                that.db_Msg.db_identify_Code=res.data.userRegisterCode;
                that.db_Msg.db_identify_Code="验证码"+ that.db_Msg.db_identify_Code;
                console.log("返回的ID"+res.data.id)

                that.cooki_Msg.local_Msg.user_id= res.data.id
                that.db_Msg.db_User=res.data;
                console.log("输出返回值"+res.data)
              }
               console.log("用户"+ that.db_Msg.db_User);
            });
          }
         //从后台发送验证码
        },
        judge_Code(){
                 if(this.db_Msg.db_identify_Code==("验证码"+this.register_Msg.identify_Code))
                 {
                   this.register_Msg.password_PageFlag=true
                 }
        },
        register_Success(){
          let db_register_Flag="";
          let that=this;
          let url="http://127.0.0.1:8080/register/setPassword.json";
          {
            this.axios({
              method: 'get',
              url: url,
              params:{
                password:that.user.password,
                id:that.db_Msg.db_User.id
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
            }).then(function (res) {

              db_register_Flag=res.data
              console.log("设置密码"+db_register_Flag)

              if(res.data==1){

                //this.cooki_Msg.local_Msg.user_id=this.user_Msg.db_User.id
                console.log("注册成功标志"+db_register_Flag)
                //that.cooki_set(that.user.password)
                that.$router.push({ name: 'Home',params:{loginFlag:true}});
              }else {
               // console.log("注册失败标志"+db_register_Flag)
                that.$alert("注册失败");
              }
            });
          }
         // 设置密码
        },
        cooki_set(password){
          //this.$cookies.set(keyName, time)   //设置cooki
          //this.$cookies.get(keyName)       // 获取cooki
          //this.$cookies.isKey(keyName)        // 查看是否保存cooki
          //this.$cookies.remove(keyName)       //删除cooki
          this.cooki_Msg.local_Msg.user_Password= password;let time;
          setInterval(()=>{
            //new Date() new一个data对象，当前日期和时间
            //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
            time = new Date().toLocaleString();
          },1000)
          let user = {flag:this.cooki_Msg.local_Msg.login_Flat,time:time, password:this.cooki_Msg.local_Msg.user_Password,id:this.cooki_Msg.local_Msg.user_id};
          this.$cookies.set('userId',user);
          // print user name
          console.log("usercooki=="+this.$cookies.get('userId'))
        },
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
