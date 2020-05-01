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
     <el-input style="width: 20%"  type="textarea"
                :rows="2"
                placeholder="请输入评论内容"
                v-model="AllMsg.commentMsg.commentContent" />
      <el-button v-on:click="Savecomment" type="primary">发表</el-button>
    </div>
    <div style="margin-top: 30px;margin-left: 30%">
      <div v-for="item in AllMsg.dbCommentMsg">
        <p style="text-align: left;"><label style="color: blueviolet;">{{item.commentPeopleName}}:</label><span>{{item.commentContent}}</span><el-button v-on:click="AllMsg.dialogVisible = true" type="text" style="color: silver;margin-left: 30px;">回复</el-button><el-button v-on:click="AllMsg.replyOthers.replydialogVisible = true" type="text" style="color: silver;margin-left: 30px;">查看全部回复</el-button></p>
        <el-dialog
          title=""
          :visible.sync="AllMsg.dialogVisible"
          width="30%"
          >
          <!--:before-close="handleClose"-->
          <h4>输入回复内容</h4>
          <span slot="footer" class="dialog-footer"></span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="AllMsg.messageCommentReply.replyCommentContent">
          </el-input>
          <el-button  style="margin-top: 30px" type="info" v-on:click="ReplyComment(item.userId,item.id)">确定发表</el-button>
        </el-dialog>



        <el-dialog
          :visible.sync="AllMsg.replyOthers.replydialogVisible"
          width="60%" >
          <div v-for="(items,index) in item.messageCommentReplySet">
            <p style="margin-top: 10px;text-align: left"><span>{{items.messageFromUserName}}:</span><span>:>{{items.messageToUserName}}：：：</span>{{items.replyCommentContent}}<el-button v-on:click="showInputFrame(index,items)"  type="text" style="color: silver;margin-left: 30px;">回复他/她</el-button></p>
          </div>
          <div v-show="AllMsg.replyOthers.showInputFrame">
            <el-input
              style="width: 30%"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="AllMsg.replyOthers.replyCommentContent">
            </el-input>
            <el-button style="margin-left: 10%" v-on:click="Reply()"  type="primary">发送</el-button>
          </div>
        </el-dialog>
      </div>
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
            message:'',//获取的message对象
            commentMsg:{
              commentPeopleName:'',
              commentContent:'',
              //messageFromUserName:'',
              //messageToUserName:''
            },//评论信息
            dbCommentMsg:[],
            messageCommentReply:{
              replyCommentContent:'',
              messageFromUserId:'',
              messageToUserId:'',
              messageFromUserName:'',
              messageToUserName:'',
            },
            dbCommentReplyMsg:[],
            dialogVisible:false,
            replyOthers:{
              replydialogVisible:false,
              showInputFrame:false,
              willReplyCommentMsg:'',
              replyCommentContent:'',
              messageFromUserId:'',
              messageToUserId:'',

            }
          }
          }
      },
      methods:{

        showInputFrame(index,items){
          console.log("index输出"+index)
          console.log("items输出"+items)
          this.AllMsg.replyOthers.showInputFrame=true;
          this.AllMsg.replyOthers.willReplyCommentMsg=items
        },
        Reply(){

          let urls = "http://127.0.0.1:8080/messageCommentReply/peopleToPeople.json";
          let that=this;

          console.log("输出id"+that.AllMsg.replyOthers.willReplyCommentMsg.messageId)
          this.axios({
            method: 'post',
            url: urls,
            params:{
             // messageId:that.AllMsg.replyOthers.willReplyCommentMsg.messageId,
              messageCommentId:that.AllMsg.replyOthers.willReplyCommentMsg.messageCommentId,
              replyCommentContent:that.AllMsg.replyOthers.replyCommentContent,
              messageFromUserId:this.$cookies.get('userID').id,
              messageToUserId:that.AllMsg.replyOthers.willReplyCommentMsg.messageFromUserId,
            },
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
          }).then(function (res) {
            that.$alert(res.data)
          });

          that.AllMsg.replyOthers.replyCommentContent='';
          that.AllMsg.replyOthers.replydialogVisible=false

        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        ReplyComment(receiveUserId,messageId){

          console.log("userId",receiveUserId);
          console.log("messageId",messageId);
        //  let replyId=this.$cookies.get('userID').id;
          //receiveUserId接收评论人的id

          let urls = "http://127.0.0.1:8080/messageCommentReply/Add.json";
          let that=this;
          this.axios({
            method: 'post',
            url: urls,
            params:{
                replyCommentContent:that.AllMsg.messageCommentReply.replyCommentContent,
                messageFromUserId:this.$cookies.get('userID').id,
                messageToUserId:receiveUserId,
                messageId:messageId
            },
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
          }).then(function (res) {
            that.$alert(res.data)
          });

          this.AllMsg.messageCommentReply.replyCommentContent=''
          this.AllMsg.dialogVisible=false
          console.log("发表信息")
        },
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
          Savecomment(){
            console.log("评论")
            let urls = "http://127.0.0.1:8080/messageComment/Add.json";
            let that=this;
            this.axios({
              method: 'post',
              url: urls,
              params:{
                id:that.AllMsg.message.id,//message的id
                userId:that.$cookies.get('userID').id,//发评论人的id
                commentContent:that.AllMsg.commentMsg.commentContent,
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
            }).then(function (res) {
                that.$alert(res.data)
              //that.GetOneMessage();
            });
            that.AllMsg.commentMsg.commentContent=''
          },
          GetOneMessageComment(){
            console.log("GetOneMessageComment")
            let urls = "http://127.0.0.1:8080/messageComment/findById.json";
            let that=this;
            this.axios({
              method: 'post',
              url: urls,
              params:{
                id:this.$cookies.get("messageId").id//that.AllMsg.message.id,//message的id
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
            }).then(function (res) {
              that.AllMsg.dbCommentMsg=res.data.messageCommentSet;
             // that.AllMsg.dbCommentReplyMsg=res.data.messageCommentReplySet
             // console.log("输出回复长度"+res.data.)
              console.log("输出评论长度"+res.data.messageCommentSet.length)
            });
          },
        GetOneMessage(){
          console.log("GetOneMessage")
          console.log("输出cooki的id="+this.$cookies.get("messageId").id)
          let urls = "http://127.0.0.1:8080/message/messageGetOne.json";
          let that=this;
          this.axios({
            method: 'get',
            url: urls,
            params:{
              id:this.$cookies.get("messageId").id,//message的id
            },
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
          }).then(function (res) {
            that.AllMsg.message=res.data;
            that.AllMsg.dbCommentMsg=res.data.messageCommentSet;

            // that.AllMsg.dbCommentReplyMsg=res.data.messageCommentReplySet
            // console.log("输出回复长度"+res.data.)
          });
        }
      },
      mounted(){

        if(this.$route.params.message==null){
          console.log("输出cooki的id000")
          this.GetOneMessage()
          /*+this.$cookies.get("messageId").id*/
        }
        if(this.$route.params.message!=null)
        {
          this.AllMsg.message=this.$route.params.message;
          console.log("输出cooki的id111")
          let messageId={id:this.$route.params.message.id}
          this.$cookies.set('messageId',messageId);
        }

        let that=this;
        setTimeout(() =>{
          that.GetOneMessageComment();
        },1000);
         // console.log("输出标题"+this.$route.params.message)
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
