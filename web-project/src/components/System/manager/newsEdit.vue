<template>
    <div style="position: absolute;width: 80%;margin-left: 19%;margin-top: 5%;">
      <div>
        <h3>编辑正文</h3>
        <!--useCustomImageHandler-->
        <vue-editor  id="editor"   @image-added="handleImageAdded" v-model="news_message.newsContent" >
        </vue-editor>
        <!--https://www.cnblogs.com/zblwyj/p/10494788.html-->
      </div>
      <div>
        <el-form>
          <el-form-item style="display: inline">
            <label>输入标题:</label><el-input v-model="news_message.newsTitle"/>
            <label>输入作者:</label><el-input v-model="news_message.newsAuthor"/>
          </el-form-item>
          <el-form-item>
            <label>上传封面:</label>
            <!--http://127.0.0.1:8080/newsPage/ads.json-->
            <el-upload
              :on-success="savePic"
              action="http://127.0.0.1:8080/message/save.json"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
      <!--<img :src="news_message.picsUrl"/>-->
      <el-button type="primary"  v-on:click="save">保存</el-button>
      <!--<el-button type="primary"  v-on:click="saveAsTxt">保存成txt</el-button>
      <el-button type="primary"  v-on:click="savePic">保存封面</el-button>-->
    </div>
</template>

<script>
  import { VueEditor } from "vue2-editor";
  components: {VueEditor }
      export default {
        name: "newsEdit",
      data(){
        return{
          news_message:{
            newsTitle:'',
            newsAuthor:'',
            //newsType:'',
            newsContent:'',
            picsUrl:'',
            //videosUrl:'',
            topFlag:'false',
            clickNumber:0,
          },
            dialogImageUrl: '',
            dialogVisible: false,
        }
      },
      methods:{
        handleImageAdded(file, Editor, cursorLocation,resetUploader){
          //上传图片操作
          //把获取到的图片url 插入到鼠标所在位置 回显图片
         /* console.log("输出图片"+this.contents);
          var formData = new FormData();
          formData.append("image", file);
          this.axios({
            url: "http://127.0.0.1:8080/newsmessage/getPic.json",
            method: "get",
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: formData
          }).then(res => {
              let url = res.data.url; // Get url from response
              Editor.insertEmbed(cursorLocation, "image", url);
              resetUploader();
            }).catch(err => {
              console.log(err);
            });*/
          //let url='./../../../assets/login.png'
         // Editor.insertEmbed(cursorLocation, 'image',url);
        },
        judgeMsg(){
          let flag=true;
          for (let item in this.news_message)
          {
            if(this.news_message[item]==='')
            {
              flag=false;
            }
          }
          console.log("输出判断"+flag)
       return flag;
        },
        save() {
          console.log("输出富文本编辑器图片编码"+this.news_message.newsContent)
          let that = this;
          let url = "http://127.0.0.1:8080/newsmessage/add.json";
          if(this.judgeMsg()){
            {
              this.axios({
                method: 'post',
                url: url,
                params: {
                  newsAuthor:that.news_message.newsAuthor,
                  content:that.news_message.newsContent,
                  picsUrl:that.news_message.picsUrl,
                  newsTitle:  that.news_message.newsTitle,
                  topFlag:that.news_message.topFlag,
                  clickNumber:that.news_message.clickNumber
                },
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
              }).then(function (res) {
                // that.$router.push({ name: 'Home',params:{loginFlag:false}});
                console.log("输出返回结果"+res.data)
              });
            }
          }else {
            this.$alert("请填写完信息")
          }
        },
        saveAsTxt(){

          let that = this;
          let url = "http://127.0.0.1:8080/newsmessage/saveAsTxt.json";
          {
            this.axios({
              method: 'post',
              url: url,
              params: {
                content: that.contents
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
            }).then(function (res) {
              // that.$router.push({ name: 'Home',params:{loginFlag:false}});
              console.log("输出返回结果"+res.data)
            });
          }
        },
        savePic(response, file, fileList){

          console.log("输出图片编码函数")
          let that = this;
          var reader = new FileReader();
          reader.readAsDataURL(file.raw);
          reader.onload = function(e){
            this.result  // 这个就是base64编码了
            that.news_message.picsUrl=this.result;
            console.log(this.result)
          }
        /*  let url='http://127.0.0.1:8080/newsmessage/postPic.json';
          {
            this.axios({
              method: 'post',
              url: url,
              params: {
                pic:that.news_message.picsUrl
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              /!*  withCredentials:true,*!///后端配置过跨域请求前端就不用使用这个
            }).then(function (res) {
              console.log("图片发送送成功")
              // that.$router.push({ name: 'Home',params:{loginFlag:false}});
            });
          }*/

        },
        handleRemove(file, fileList) {
          console.log("输出上传的封面"+file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          console.log("输出封面"+ file.url)
          this.dialogVisible = true;
        }
      }
    }
</script>

<style scoped>
.el-input{
  width: 25%;
}
</style>
