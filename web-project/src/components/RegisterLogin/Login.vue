<template>
 <div>
  <el-main>
    <el-form :model="user">
      <h1 style="cursor: pointer;color: blueviolet;font-size: 50px;margin-bottom: 5%">登录</h1>
      <el-form-item>
        <p v-show="user_Msg.db_Msg[user_Msg.i].flag" class="accountHint" style="vertical-align:bottom">{{user_Msg.db_Msg[user_Msg.i].Hint}}</p><el-input placeholder="请输入账号" v-model="user.account_Number"></el-input>
      </el-form-item>
      <el-form-item>                                    <!-- -->
        <p v-show="user_Msg.db_Msg[user_Msg.j].flag" class="passwordHint"  style="vertical-align:bottom">{{user_Msg.db_Msg[user_Msg.j].Hint}}</p><el-input placeholder="请输入密码" type="password" v-model="user.password"></el-input>
      </el-form-item>
    </el-form>
     <div style="padding:0;" class="s-canvas">
       <!--vertical-align:bottom  底部对齐-->
       <el-input style="width: 15%;vertical-align:bottom" placeholder="请输入验证码" v-model="identify_Code"/>
       <canvas style="vertical-align:bottom" id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
      <p style="cursor: pointer"><u v-on:click="drawPic" >看不清换一张</u></p>
       <p style="color: red;" v-show="code_Mag.display_Msg[code_Mag.i].flag">{{code_Mag.display_Msg[code_Mag.i].Hint}}</p>
    </div>

    <div style=" text-align: left;margin-left:38% ">
      <el-button style="width: 40%" type="primary" v-on:click="login()">登录</el-button>
      <br/>
      <el-checkbox style=" text-align: left;margin-top: 3%;" v-model="cooki_Msg.local_Msg.login_Flat">记住密码</el-checkbox>
      <p  style="cursor: pointer;display:inline;margin-left: 10%"><u v-on:click="Register()" >点击去注册</u></p>
    </div>
  </el-main>
 </div>
</template>

<script>
  export default {
    name: "Login",
    props: {
      identifyCode: {
        type: String,
        default:''
      },
      fontSizeMin: {
        type: Number,
        default: 16
      },
      fontSizeMax: {
        type: Number,
        default: 40
      },
      backgroundColorMin: {
        type: Number,
        default: 180
      },
      backgroundColorMax: {
        type: Number,
        default: 240
      },
      colorMin: {
        type: Number,
        default: 50
      },
      colorMax: {
        type: Number,
        default: 160
      },
      lineColorMin: {
        type: Number,
        default: 40
      },
      lineColorMax: {
        type: Number,
        default: 180
      },
      dotColorMin: {
        type: Number,
        default: 0
      },
      dotColorMax: {
        type: Number,
        default: 255
      },
      contentWidth: {
        type: Number,
        default: 112
      },
      contentHeight: {
        type: Number,
        default: 38
      },
    },
    data(){
      return{
        user:{
          account_Number:'',
          password:'',

        },
        randoms:['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
        randNumber:'',
        identify_Code:'',
        code_Mag:{
          display_Msg:[
            {
              Hint:'验证码错误',
              flag:false
            },
            {
              Hint:'请输入验证码',
              flag:false
            },
          ],
          i:0
        },
        user_Msg:{
          db_Msg:[
            {
              Hint:"输入账号",
              flag:false
            },
            {
              Hint:"无效账号",
              flag:false
            },
            {
              Hint:"输入密码" ,
              flag:false
            },
            {
              Hint:"密码错误" ,
              flag:false
            },

          ],
          db_User:{
            account_Num:'',
            password_Num:''
          },
          i:0,
          j:2
        },
        cooki_Msg:{
                  local_Msg:{
                    login_Flat:'',
                    user_Account:'',
                    user_Password:''
                  },
        },

      }
    },
    watch: {
     /*   identifyCode () {
        this.drawPic()
      }*/
    },
    methods: {
      randomNum (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      randomColor (min, max) {
        let r = this.randomNum(min, max)
        let g = this.randomNum(min, max)
        let b = this.randomNum(min, max)
        return 'rgb(' + r + ',' + g + ',' + b + ')'
      },
      drawPic() {
        console.log("drawPic")
        for (let i=0;i<2;i++)
        {
          this.code_Mag.display_Msg[this.code_Mag.i].flag=false
        }
        this.randNum();
        let canvas = document.getElementById('s-canvas')
        let ctx = canvas.getContext('2d')
        ctx.textBaseline = 'bottom'
        // 绘制背景
        ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
        ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
        // 绘制文字
         for (let i = 0; i <this.randNumber.length; i++) {
          this.drawText(ctx, this.randNumber[i], i)
         }
        this.drawLine(ctx)
        this.drawDot(ctx)
      },
      drawText (ctx, txt, i) {
              console.log("drawText")
        ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
        ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
        let x = (i + 1) * (this.contentWidth / (this.randNumber.length + 1))
        let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
        var deg = this.randomNum(-45, 45)
        // 修改坐标原点和旋转角度
        ctx.translate(x, y)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(txt, 0, 0)
        // 恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180)
        ctx.translate(-x, -y)
      },
      drawLine (ctx) {
        console.log("drawLine")
        // 绘制干扰线
        for (let i = 0; i <3; i++) {
          ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax)
          ctx.beginPath()
          ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
          ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
          ctx.stroke()
        }
      },
      drawDot (ctx) {
        console.log("drawDot")
        // 绘制干扰点
        for (let i = 0; i < 10; i++) {
          ctx.fillStyle = this.randomColor(0, 255)
          ctx.beginPath()
          ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
          ctx.fill()
        }
      },
      randNum(){
        this.randNumber=''
        let final='';let num;let flag=true;
        console.log("在外面"+final.length)
       while (final.length<4)
        {
          console.log("在while里面"+final.length)
             num= this.randomNum(0,this.randoms.length);
          console.log("num"+num)
             if(final.length==0)
           {
              final= this.randoms[num];
            } else {
                            for (let j = 0; j < final.length; j++)
                            {
                             if (final[j] === this.randoms[num])
                              {
                                   flag = false; break;
                               }
                            }
                         if (flag==true)
                         {
                               final += this.randoms[num];
                               console.log("this.randoms[num]"+this.randoms[num])
                         }

               if(final.length==4){
                 break;
               }
                   }
                  flag=true;
        }
         this.randNumber=final;
        console.log("最终结果"+final)
      },
      identify_Code_Test(){
        if(this.identify_Code==='')
        {
          this.code_Mag.i=1
          this.code_Mag.display_Msg[this.code_Mag.i].flag=true
          return 0;
        }
        else if(this.identify_Code.toString().toUpperCase()!=this.randNumber.toString().toUpperCase())
        {
          console.log("this.identify_Code="+this.identify_Code)
          console.log("this.randNumber="+this.randNumber)
          this.code_Mag.i=0
          this.code_Mag.display_Msg[this.code_Mag.i].flag=true
          return 0;
        }
        else if (this.identify_Code.toString().toUpperCase()===this.randNumber.toString().toUpperCase())
        {
          for (let i=0;i<2;i++)
          {
            this.code_Mag.display_Msg[this.code_Mag.i].flag=false
          }
          console.log("验证码正确")
          return 1;
        }
      },
      user_Account_Test(){
        if(this.user.account_Number===''){
          this.user_Msg.i=0
          this.user_Msg.db_Msg[this.user_Msg.i].flag=true
          return 0;
        }else if (this.user.password===''){
          this.user_Msg.j=2
          this.user_Msg.db_Msg[this.user_Msg.j].flag=true
          return 0;
        } else {
          for(let i=0,j=2;i<2&&j<4;i++,j++){
            this.user_Msg.db_Msg[i].flag=false
            this.user_Msg.db_Msg[j].flag=false
          }
          console.log("账号密码不为空")
          return 1;
        }
      },
      final_Test(){

        console.log("账号密码验证"+this.user.account_Number);
        console.log("账号密码验证"+this.user.password);
        console.log("数据库密码验证"+this.user_Msg.db_User.account_Num);
        console.log("数据库密码验证"+this.user_Msg.db_User.password_Num);
        if (this.user_Msg.db_User.account_Num!=this.user.account_Number)
        {
          this.user_Msg.i=1
          this.user_Msg.db_Msg[this.user_Msg.i].flag=true
          return 0;
        }
        else if (this.user_Msg.db_User.password_Num!=this.user.password)
        {
          this.user_Msg.j=3
          this.user_Msg.db_Msg[this.user_Msg.j].flag=true
          return 0;
        }else
        {
          for(let i=0,j=0;i<2&&j<2;i++,j++){
            this.user_Msg.db_Msg[i].flag=false
            this.user_Msg.db_Msg[j].flag=false
          }
          return 1;
        }
      },
      login() {

        let db_register_Flag = "";
        let that = this;

        console.log("账号密码测试"+that.user.password)
        console.log("账号密码测试"+that.user.account_Number)

        let url = "http://127.0.0.1:8080/login/judeg.json";
        {
          this.axios({
            method: 'get',
            url: url,
            params: {
              password: that.user.password,
              account: that.user.account_Number
            },
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
          }).then(function (res) {
            console.log("输出返回信息"+res.data.userPassword)



               if(res.data!='')
               {
                 console.log("这是返回信息")
                 that.user_Msg.db_User.password_Num=res.data.userPassword;
                 that.user_Msg.db_User.account_Num=res.data.userTel;
               }
                     // that.$router.push({ name: 'Home',params:{loginFlag:false}});
          });


          setTimeout(() =>{
            if (this.user_Account_Test() && this.identify_Code_Test()) {
              if (this.final_Test()) {
                if (this.cooki_Msg.local_Msg.login_Flat === true) {
                  this.cooki_set();
                } else {
                  if (this.$cookies.isKey('user')) {
                    this.$cookies.remove('user')
                  }
                }

                that.$router.push({ name: 'Home',params:{loginFlag:false}});
                //在这里跳转
              }
            }
            this.identify_Code = ''
          },2000);

          /*if (this.user_Account_Test() && this.identify_Code_Test()) {
            if (this.final_Test()) {
              if (this.cooki_Msg.local_Msg.login_Flat === true) {
                this.cooki_set();
              } else {
                if (this.$cookies.isKey('user')) {
                  this.$cookies.remove('user')
                }
              }

              that.$router.push({ name: 'Home',params:{loginFlag:false}});
              //在这里跳转
            }
          }
          this.identify_Code = ''*/
        }

      },

      cooki_set(){

        //this.$cookies.set(keyName, time)   //设置cooki
        //this.$cookies.get(keyName)       // 获取cooki
        //this.$cookies.isKey(keyName)        // 查看是否保存cooki
        //this.$cookies.remove(keyName)       //删除cooki
        let time;
        setInterval(()=>{
          //new Date() new一个data对象，当前日期和时间
          //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
          time = new Date().toLocaleString();
        },1000)
          this.cooki_Msg.local_Msg.login_Flat
          this.cooki_Msg.local_Msg.user_Account= this.user.account_Number
          this.cooki_Msg.local_Msg.user_Password= this.user.password
          let user = {flag:this.cooki_Msg.local_Msg.login_Flat,time:time,account:this.cooki_Msg.local_Msg.user_Account, password:this.cooki_Msg.local_Msg.user_Password};
          this.$cookies.set('user',user);
          // print user name
          console.log("usercooki=="+this.$cookies.get('user').flag)

      },
      judge_LoginFlag(){
        if(this.$cookies.isKey('user'))
        {
            if(this.$cookies.get('user').flag==true)
            {
                this.user.account_Number=this.$cookies.get('user').account
                this.cooki_Msg.local_Msg.user_Account= this.user.account_Number
                console.log("登录前输出cooki账号"+this.$cookies.get('user').account)
                this.user.password=this.$cookies.get('user').password
                this.cooki_Msg.local_Msg.user_Password= this.user.password
                console.log("登录前输出cooki密码"+this.user.password)
                this.cooki_Msg.local_Msg.login_Flat=this.$cookies.get('user').flag
             }

        else {
          this.user.account_Number=''
          this.user.password=''
          this.cooki_Msg.local_Msg.user_Account=''
          this.cooki_Msg.local_Msg.user_Password=''
          this.cooki_Msg.local_Msg.login_Flat=''
        }
        }

      },
      Register(){
        this.$router.push({path:'/Register'})
      }

    },
    mounted(){
       /* this.cooki_set()
      if('Ab'.toUpperCase()==='AB'.toUpperCase())
      {
         转换成大写
        console.log("A==A")
        console.log("'123Ab'.toUpperCase()="+'123ab'.toUpperCase())
      }*/

      this.judge_LoginFlag();
      this.drawPic();
      this.randNumber=''
    },

  }
</script>

<style scoped>
  .accountHint {
    position: absolute;
    left: 30%;
    font-size: 15px;
    color: red;
  }
  .passwordHint {
    position: absolute;

    left: 30%;
    color: red;
  }
  .el-input{
    width: 24%;
  }
</style>
