<template>
<div>
  <div>
    <div>
    <h3>{{AllMsg.message.messageTitle}}</h3>

    <div style="margin-top: 5%" v-for="item in AllMsg.message.messagePicsList">
      <img style="width: 200px;" :src="item.picData"/>
    </div>
    <p>内容{{AllMsg.message.messageContent}}</p>
      <div style="margin-bottom: 0;margin-left: 70%">
        <p><span style=" color: rgba(246,29,29,1);font-size: 25px;"><img id="good" v-on:click="good(AllMsg.message.id)" class="goodpic" src="./../../assets/good.png"/>{{AllMsg.message.message_goodPointNumber}}</span><span><img id="bad" class="badpic" v-on:click="bad(AllMsg.message.id)"  src="./../../assets/bad.png"/>{{AllMsg.message.message_badPointNumber}}</span></p>
      </div>
    <!--  <div style="margin-top: 30%;margin-left: 50%">批评数{{AllMsg.message.message_badPointNumber}}</div>
      <div>点赞数{{AllMsg.message.message_goodPointNumber}}</div>-->
    </div>
    <div>
    <!--  评论{{AllMsg.message.}}-->
    </div>
    <div>
   <!--   消息回复{{AllMsg.message.}}-->
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "MessageDisPlay",
      data(){
          return{
          AllMsg:{
            message:''
          }
          }
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
          this.AllMsg.message.message_badPointNumber++;
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
          this.AllMsg.message.message_goodPointNumber++;

        },
          comment(){

          }
      },
      mounted(){
        this.AllMsg.message=this.$route.params.message;
          console.log("输出标题"+this.$route.params.message)
      }

    }
</script>

<style scoped>
  .goodpic{
    width: 30px;height: 30px;cursor: pointer;
  }
  .badpic{
    width: 30px;height: 30px;transform: rotate(180deg);cursor: pointer
  }
</style>
