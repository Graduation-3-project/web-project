<template>
  <div style="position: absolute;margin-top: 10%;width: 80%;margin-left: 18%;">
   <div>
     <h1 style="text-align:center;position: absolute;top: 10px;left: 50%">通告编辑</h1>
   </div>

    <el-form style="margin-top: 13%" :model="notice" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
      <el-form-item label="通告名称">
        <el-input style="width: 50%" v-model="notice.noticeTitle"></el-input>
      </el-form-item>
      <el-form-item label="通告内容" >
        <el-input style="width: 50%" type="textarea" v-model="notice.noticeContent"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="NoticeAdd(notice)">提交</el-button>
        <el-button @click="resetForm('notice')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "noticeEdit",
      data(){
          return{
            notice: {
              noticeTitle: '',
              noticeContent: '',
              topFlag: "false",
            },
            rules:{}
          }
      },
      methods:{

          NoticeAdd() {
            console.log("输出同奥"+this.notice.noticeTitle)
             if(this.NoticeJudge()){
               let that=this;
               let url="http://127.0.0.1:8080/notice/Add.json"
               this.axios({
                 method:'post',
                 url:url,
                 data:that.notice,
                 headers: {
                   'Content-Type': 'application/json;charset=UTF-8'
                 }
               }).then(function (res) {
                 that.$alert(res.data);
                 that.notice.noticeTitle='';
                 that.notice.noticeContent=''
               })
             }else {
               this.$alert("请填写完信息")
             }



          },
        NoticeJudge(){
          let flag=true;
          for(let item in this.notice){
            if(this.notice[item]===''){
              flag=false
            }
          }
          return flag;
        },

        }



    }
</script>

<style scoped>

</style>
