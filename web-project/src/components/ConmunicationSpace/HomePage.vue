<template>
  <el-container>

     <div v-once><img src="./../../assets/交流空间.png"/></div>
    <el-header style="padding: 0;margin: 0">

        <div style="display: inline;padding: 0;margin: 0">
          <div class="manspace" v-on:click="GoNextPage('PersonSpace')">
            个人空间
          </div>
        </div>
      <!--<div style="width: 80%;height:78px;padding: 0;margin: 0;background:rgba(246,121,106,0.21)">
         很欢迎来到交流空间
      </div>-->
    </el-header>

    <el-container>
      <el-aside width="20%">
        <h3>热讯推荐左</h3>
      </el-aside>

      <el-main>
       <!-- <div style="">
          <h1>动态浏览</h1>
        </div>
-->
        <div class="message" v-for="(item,index) in AllMsg.allMessageList" >
          <h1 style="cursor: pointer">{{item.messageTitle}}</h1>
          <p style="width: 600px;cursor: pointer" v-on:click="GoNextPage('MessageDisPlay',AllMsg.allMessageList[index])">
          {{item.messageContent}}
          </p>
          <div style="margin-bottom: 0;margin-left: 70%;margin-top: 23%">
            <p><span style=" color: rgba(246,29,29,1);font-size: 25px;"><img id="good" v-on:click="good(item.id,index)" class="goodpic" src="./../../assets/good.png"/>{{item.message_goodPointNumber}}</span><span><img id="bad" class="badpic" v-on:click="bad(item.id,index)"  src="./../../assets/bad.png"/>{{item.message_badPointNumber}}</span></p>
          </div>
        </div>
     </el-main>

      <el-aside width="30%" style="padding: 0" >
        <div  style="margin-top: 0px" >
          <h3>同城信息</h3>
          <div  style="width:100%;height: 100px; ">
           <div v-for="item in AllMsg.locationMessage">
             <p v-on:click="GoNextPage('MessageDisPlay',item)" style="cursor: pointer">{{item.messageTitle}}</p>
           </div>
          </div>
        </div>
      </el-aside>

    </el-container>
    <el-footer>
    </el-footer>
  </el-container>
</template>

<script>
    export default {
        name: "HomePage",
      data(){
          return{
            AllMsg:{
              allMessageList:[],
              locationMessage:[],
              userMsg:{
                db_User_Msg:''
              },
            },
          }
      },
      mounted(){
      this.getAllMsg();
      this.getUserInfo();


      setTimeout(()=>{

        console.log("消息列表长度"+this.AllMsg.allMessageList.length)
        for(let item in this.AllMsg.allMessageList)
        {
          console.log("消息列表"+this.AllMsg.allMessageList[item])
          console.log("个人列表"+this.AllMsg.userMsg.user_db_msg.location.city)
          if(this.AllMsg.allMessageList[item].messageCity===this.AllMsg.userMsg.user_db_msg.location.city)
          {
            this.AllMsg.locationMessage.push(this.AllMsg.allMessageList[item])
          }
        }
        console.log("输出长度"+ this.AllMsg.locationMessage.length)
      },2000)
      },
      methods:{
        bad(id,num){
          console.log("输出不点赞"+id)
          let urls = "http://127.0.0.1:8080/message/pointBad.json";
          let that=this;
          this.axios({
            method: 'post',
            url: urls,
            params:{
              id:id,
            },
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
          }).then(function (res) {
          });
          this.AllMsg.allMessageList[num].message_badPointNumber++;
        },
        good(id,num){
          console.log("输出点赞"+id)
            let urls = "http://127.0.0.1:8080/message/pointGood.json";
            let that=this;
            this.axios({
              method: 'post',
              url: urls,
              params:{
                id:id,
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
            }).then(function (res) {
            });
          this.AllMsg.allMessageList[num].message_goodPointNumber++;

          let obj = document.getElementById("good");
          obj.style.cssText = ""
          this.num++;
          setTimeout({
          },1000)
         // obj.style.cssText = ""
        },
        GoNextPage(path,message){
          this.$router.push({name:path,params:{message:message}})
          //this.$router.push({ name: 'Home',params:{loginFlag:true}});
        },
        getAllMsg(){
          let urls = "http://127.0.0.1:8080/message/findAll.json";
          let that=this;
          this.axios({
            method: 'get',
            url: urls,
            /* data:that.AllMsg.message.picsList,*/
            /* picsSet:that.AllMsg.messagePics*/
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
          }).then(function (res) {
            that.AllMsg.allMessageList=res.data;
          });
        },
        getUserInfo(){
          let url="http://127.0.0.1:8080/user/findOneUser.json";
          let that=this;
          this.axios({
            method: 'get',
            url: url,
            params:{
              id:that.$cookies.get('userID').id,
            },
            headers:{
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then(function (res) {
            that.AllMsg.userMsg.user_db_msg=res.data;

            console.log("输出城市"+that.AllMsg.userMsg.user_db_msg.location.city)
          });


         // this.$forceUpdate()

        }
      }
    }
</script>

<style scoped>
  .el-header, .el-footer {
    text-align: center;
    line-height: 60px;
  }


  .el-aside {
    color: #333;
    text-align: center;
  }
  .el-main {
    text-align: center;
  }
  .manspace{
    position: absolute;
    margin: 0;
    padding: 0;
    top: 1px;
    right: 10px;
    font-size: 25px;
    margin-right: 90px;
    cursor: pointer;
    display: inline
  }
  .message{
    width: 620px;
    height: 250px;
    border-radius: 4px;
    border-bottom:2px solid #000;
  }
  .goodpic{
    width: 30px;height: 30px;cursor: pointer;
  }
  .badpic{
    width: 30px;height: 30px;transform: rotate(180deg);cursor: pointer
  }
</style>
