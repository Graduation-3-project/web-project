<template>
  <div>
    <div style="margin-top: 10px;margin-left: 90%">
      <p><img style="width: 50px;height:50px;cursor: pointer" :src="AllMsg.userMsg.userdb_msg.userProfileUrl"/></p>
      <h3>{{AllMsg.userMsg.userdb_msg.userScreenName}}</h3>
    </div>

<div>
    <div style="width: 300px;height: 560px;background:rgba(246,138,107,0.21);position: absolute">
      <div style="margin-top: 60px" v-for="(item,index) in AllMsg.Meuns">
        <p v-on:click="ChoseColunm(index)" style="font-size: 20px;font-style:italic;cursor: pointer">{{item.ColumnName}}</p>
      </div>
    </div>
  <div class="disPlayMsg">

    <div style="width: inherit;height: inherit;"  v-show="AllMsg.disPlay==0">
      <h1>信息完善页</h1>
     <label>输入网名</label> <el-input style="width: 30%;margin-top: 80px" placeholder="请输入网名" v-model="AllMsg.userMsg.modifyMsg.userScreenName"/>
      <div>
        <label style="position: absolute;top: 25%;left: 32%">上传图像</label>
        <el-upload
          ref="modifyUserMsg"
          class="elUploadClass"
          action="http://127.0.0.1:8080/message/save.json"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button v-on:click="saveModify()" type="primary" style="margin-left: 68%">确定</el-button>
      </div>
    </div>

    <div style="width: inherit;height: inherit;" v-show="AllMsg.disPlay==1">
      这是组件01
    </div>
    <div style="width: inherit;height: inherit;" v-show="AllMsg.disPlay==2">
      <h1>历史发表页</h1>
      <div style="position: absolute;top: 20%;left: 10%">
        <div class="historyMsg" v-for="item in AllMsg.userMsg.userdb_msg.messageList">
        <h3>{{item.messageTitle}}</h3>
          <p>{{item.messageContent}}</p>
        </div>
      </div>
    </div>
    <div style="width: inherit;height: inherit;" v-show="AllMsg.disPlay==3">
      <h1>动态发表页</h1>
      <div>
        <el-form>
          <el-form-item>
            <el-input style="width: 30%;" v-model="AllMsg.message.message_title"  placeholder="请输入标题" />
          </el-form-item>
          <el-form-item>
            <el-input
              style="width: 30%;;margin-top: 30px"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="AllMsg.message.message_content">
            </el-input>
          </el-form-item>
          <el-form-item >
            <h4 style="left: 270px;position: absolute;">最多发表四张图片</h4>
            <!--http://127.0.0.1:8080/message/Add.json-->
            <!--https://jsonplaceholder.typicode.com/posts/-->

            <el-upload
              ref="upload"
              style="margin-top: 60px"
              :limit=4
              action="http://127.0.0.1:8080/message/save.json"
              list-type="picture-card"
              :on-success="onSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <!-- :auto-upload=false-->
              <i class="el-icon-plus"></i>
            </el-upload>

            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button v-on:click="saveMessage" type="primary" style="margin-left: 66%">发表</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: "PersonSpace",
      data(){
        return{
          AllMsg:{
            Meuns:[
              {
                ColumnName:'修改信息',//侧栏名称
                DisPlayFlag:''//显示标志
              },
              {
                ColumnName:'信息交互',//侧栏名称
                DisPlayFlag:''//显示标志
              },
              {
                ColumnName:'历史发表',//侧栏名称
                DisPlayFlag:''//显示标志
              },
              {
                ColumnName:'发表动态',//侧栏名称
                DisPlayFlag:''//显示标志
              },],
            disPlay:0,
            userMsg:{
              modifyMsg:{
                userScreenName:'',//用户网名
                userProfile:''//用户图像
              },
              userdb_msg:'',
            },
            message:{
              message_title:'',
              message_content:'',
              picsList:[],
            },
            /*{
              picData:'',
            }*/
          },
          info:"卡上电脑课萨拉的时刻都将asaldjsalkdjlkjasldkjajdflkdfjsdl/kslkfja.sklfj.kj是积分撒旦立刻集散地立刻附件是的离开js/dlkfjds/lkfjdsl/sk来得及ask了解到拉萨扩大流口水卢卡斯名单里面上课了吗撒旦卢卡斯打开了laksdn.asknd.k纳斯卡拿到了绿卡四年。kasnd.asknd.ksnas.dnsl",
          imageUrl: '',
          dialogImageUrl: '',
          dialogVisible: false
        }
      },
      methods:{
        ChoseColunm(index){
            this.AllMsg.disPlay=index
        },
        handleAvatarSuccess(res, file) {
          console.log("输出图片编码函数")
          let that = this;
          var reader = new FileReader();
          reader.readAsDataURL(file.raw);
          reader.onload = function(e) {
           that.AllMsg.userMsg.modifyMsg.userProfile= this.result  // 这个就是base64编码
          }
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        saveMessage(){
          let urls = "http://127.0.0.1:8080/message/Add.json";
          let that=this;
          this.axios({
            method: 'post',
            url: urls,
            params:{
              messageTitle:that.AllMsg.message.message_title,
              messageContent:that.AllMsg.message.message_content,
              id:that.$cookies.get('userID').id,
             /* picsSet:that.AllMsg.message.picsList*/
            },
           /* data:that.AllMsg.message.picsList,*/
            data:that.AllMsg.message.picsList,
            /* picsSet:that.AllMsg.messagePics*/
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
          }).then(function (res) {
            that.$alert(res.data)
          });
          this.clearSavedMessage();
        },
        clearSavedMessage(){
          //发表完清空变量信息
          this.$refs.upload.clearFiles();
          this.AllMsg.message.picsList=[];
          this.AllMsg.message.message_content='';
          this.AllMsg.message.message_title='';
        },
        saveModify(){
           //保存修改
          let urls = "http://127.0.0.1:8080/user/modifyUserMsg.json";
          let that=this;
          this.axios({
            method: 'post',
            url: urls,
            params:{
              id:that.$cookies.get('userID').id,
              userProfileUrl:that.AllMsg.userMsg.modifyMsg.userProfile,
              userScreenName:that.AllMsg.userMsg.modifyMsg.userScreenName,
              /* picsSet:that.AllMsg.message.picsList*/
            },
            /* data:that.AllMsg.message.picsList,*/
            /* picsSet:that.AllMsg.messagePics*/
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
          }).then(function (res) {
            that.$alert(res.data)
          });



          this.clearModifyMsg();
        },
        clearModifyMsg(){
          this.$refs.modifyUserMsg.clearFiles();
        },

        onSuccess(response, file, fileList){

          console.log("输出图片编码函数")
          let that = this;
          var reader = new FileReader();
          reader.readAsDataURL(file.raw);
          reader.onload = function(e){
            this.result  // 这个就是base64编码
            that.AllMsg.message.picsList.push({
              picData:this.result
            }),
           // that.AllMsg.messagePic=this.result;
          console.log("输出图片编码"+this.result )
          }
          console.log("图片上传成功")
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
            that.AllMsg.userMsg.userdb_msg=res.data;
            console.log("输出用户明"+that.AllMsg.userMsg.userdb_msg.userScreenName)
          });
        }
      },
      mounted(){
        this.getUserInfo();
      }
    }
</script>

<style scoped>
.disPlayMsg{
  position: absolute;left: 21%;width: 1100px;height:1000px;
}
.elUploadClass{

  border-radius: 4px;
  border-left:2px solid #000;
  border-right:2px solid #000;
  border-top :2px solid #000;
  border-bottom:2px solid #000;width: 178px;height: 178px;margin-left: 45%;margin-top: 10%
}
.historyMsg{
  border-bottom:2px solid #000;
  border-top :2px solid #000;
  cursor: pointer;
}







.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
