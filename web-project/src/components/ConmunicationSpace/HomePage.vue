<template>
  <el-container>
    <el-header style="padding: 0;margin: 0">
        <div style="display: inline;padding: 0;margin: 0">
          <div class="manspace" v-on:click="GoNextPage('PersonSpace')">
            个人空间
          </div>
        </div>
    </el-header>

    <el-container>
      <el-aside width="20%">
        <h3>热讯推荐</h3>
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
          <div style="margin-bottom: 0;margin-left: 70%">
            <p><span style=" color: rgba(246,29,29,1);font-size: 25px;"><img id="good" v-on:click="good(item.id,index)" class="goodpic" src="./../../assets/good.png"/>{{item.message_goodPointNumber}}</span><span><img id="bad" class="badpic" v-on:click="bad(item.id,index)"  src="./../../assets/bad.png"/>{{item.message_badPointNumber}}</span></p>
          </div>
        </div>
      </el-main>

      <el-aside width="30%" style="padding: 0" >
        <div style="margin-top: 0px">
          <h3>热讯推荐</h3>
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
            },
          }
      },
      mounted(){
      this.getAllMsg();
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
        }
      }
    }
</script>

<style scoped>
  .el-header, .el-footer {
    /*background-color: #B3C0D1;
    color: #333;*/
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  .el-main {
   /* background-color: #E9EEF3;*/
   /* color: #333;*/
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
    border-left:2px solid #000;
    border-right:2px solid #000;
    border-top :2px solid #000;
    border-bottom:2px solid #000;
  }
  .goodpic{
    width: 30px;height: 30px;cursor: pointer;
  }
  .badpic{
    width: 30px;height: 30px;transform: rotate(180deg);cursor: pointer
  }
</style>
