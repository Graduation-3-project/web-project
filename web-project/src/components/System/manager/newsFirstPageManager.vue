 <template>
    <div style="width: 80%;margin-left: 19%;margin-top: 1%;" >
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
      <div>
        <el-form id="form-patient-add"
              action="http://127.0.0.1:8080/newsPage/videoUrl.json"
              enctype="multipart/form-data" method="post">
          <div>
            <input ref="video" type="file" name="file" id="file"/>
          </div>
          <button type="submit">
            提交
          </button>
        </el-form>
        <el-button type="primary" v-on:click="saveVideo">保存视频</el-button>
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
            }
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
        }
      }
    }
</script>

<style scoped>

</style>
