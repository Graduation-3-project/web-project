 <template>
    <div style="position: absolute;width: 80%;margin-left: 19%;margin-top: 5%;" >
      <div>
        <!--<el-form>
          <el-form-item>
         <label>视频地址</label><el-input type="file" name="file" v-model="Msg.videoUrl" />
            <el-button type="primary" v-on:click="saveVideo">保存视频</el-button>
          </el-form-item>
          <el-form-item>
            <label>广告信息</label><el-input />
          </el-form-item>
        </el-form>-->
        <!--https://blog.csdn.net/qq_30282133/article/details/88683023-->
        <!--https://blog.csdn.net/qq_40979624/article/details/105293900-->
        <!-- <input ref="video" type="file" name="file" id="file"/>-->
        <!-- <el-button style="float: right" type="primary" v-on:click="saveVideo">保存视频</el-button>
-->
        <div style="width:inherit;height: 50%;padding-bottom: 10px">
          <div style="float: left;">
            <h1>图片轮播上传</h1>
            <el-upload
              :limit=4
              :on-success="Picsuccess"
              action="http://127.0.0.1:8080/newsPage/pics.json"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <div style="clear: both; border-bottom:2px solid rgba(143,66,246,0.15);">

        </div>
          <div style="margin-left: 10px;margin-top: 100px">
            <h1 style="position: absolute;left: 10px;top:250px">上传首页视频</h1>
          <el-upload
            :limit=1
            style="border-radius: 4px;
           border-left:2px solid #000;
           border-right:2px solid #000;
           border-top :2px solid #000;
           border-bottom:2px solid #000;
           height: 200px"
            action="http://127.0.0.1:8080/newsVideo/Add.json"
            :on-success="Videosuccess"
            class="upload-demo" ref="video" type="file" name="file" id="files">
            <!--<i class="el-icon-plus avatar-uploader-icon"></i>-->
            <i class="el-icon-plus"></i>
          </el-upload>
          </div>
          <div style=" border-bottom:2px solid rgba(143,66,246,0.15);margin-top: 10px"></div>

          <div style="margin-left: 10px;margin-top: 100px">
            <h1 style="position: absolute;top: 550px">通知内容</h1>
            <el-input placeholder="请输入通知内容" style="width: 20%;position:absolute; left: 10px" v-model="Msg.specialNotice"/>
          </div>
            </div>
        <div>
          <el-button style="float: right" type="primary" v-on:click="saveVideo">保存</el-button>
        </div>
      </div>
    </div >
</template>
<script>
    export default {
        name: "newsFirstPageManager",
        data(){
          return{
            Msg:{
              specialNotice:'',//特殊通知，
              videoUrl:'',//首页视频地址
            },
            dialogImageUrl: '',
            dialogVisible: false
          }
        },
      methods:{
        saveVideo(){
          /*https://blog.csdn.net/qq_30282133/article/details/88683023*/
          let formData=new FormData();
          formData.append('file',this.$refs.video.files[0])
          this.axios.post('http://127.0.0.1:8080/newsPage/ads.json',formData,{
            'Content-Type':'multipart/form-data'
          }).then(res=>{
            console.log("返回信息"+res.data)
          })
          console.log("视频信息"+this.Msg.videoUrl)
        },
        Picsuccess(response){
          this.$alert(response)
        },
        Videosuccess(response){
          this.$alert(response)
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        }
      }
    }
</script>

<style scoped>
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
  .border_frame{
    border-radius: 4px;
    border-left:2px solid #000;
    border-right:2px solid #000;
    border-top :2px solid #000;
    border-bottom:2px solid #000;
  }
</style>
