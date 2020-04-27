<template>
  <div>
    <div style="margin-top: 10px;margin-left: 90%">
      <p><img style="width: 50px;height:50px;cursor: pointer" src="./../../assets/login.png"/></p>
      <h3>太阳花</h3>
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
          class="elUploadClass"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button type="primary" style="margin-left: 68%">确定</el-button>
      </div>
    </div>

    <div style="width: inherit;height: inherit;" v-show="AllMsg.disPlay==1">
      这是组件01
    </div>
    <div style="width: inherit;height: inherit;" v-show="AllMsg.disPlay==2">
      <h1>历史发表页</h1>
      <div style="position: absolute;top: 20%;left: 10%">
        <div class="historyMsg">
        <h3>撒可见度涉及到</h3>
          <p>{{info}}</p>
        </div>
      </div>

    </div>
    <div style="width: inherit;height: inherit;" v-show="AllMsg.disPlay==3">
      这是组件03
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
                ColumnName:'我的发表',//侧栏名称
                DisPlayFlag:''//显示标志
              },],
            disPlay:0,
            userMsg:{
              modifyMsg:{
                userScreenName:'',//用户网名
                userProfile:''//用户图像
              },
              userdb_msg:'',
            }

          },
          info:"卡上电脑课萨拉的时刻都将asaldjsalkdjlkjasldkjajdflkdfjsdl/kslkfja.sklfj.kj是积分撒旦立刻集散地立刻附件是的离开js/dlkfjds/lkfjdsl/sk来得及ask了解到拉萨扩大流口水卢卡斯名单里面上课了吗撒旦卢卡斯打开了laksdn.asknd.k纳斯卡拿到了绿卡四年。kasnd.asknd.ksnas.dnsl",
          imageUrl: ''

        }
      },
      methods:{
        ChoseColunm(index){
            this.AllMsg.disPlay=index
        },
        handleAvatarSuccess(res, file) {
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
        }
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
