<template>
    <div style="width: 80%;margin-left: 19%;margin-top: 1%;">
      <div>
        <!
        --https://www.cnblogs.com/zblwyj/p/10494788.html-->
        <h3>文本编辑富文本编辑器</h3>
   <!--     <VueEditor useCustomImageHandler
                   @imageAdded="handleImageAdded"
                   v-model="content"/>-->
        <vue-editor  v-model="contents" ></vue-editor>
      </div>
      <div v-html="contents"></div>
      <el-button type="primary"  v-on:click="save">保存</el-button>
    </div>
</template>

<script>
      export default {
        name: "newsEdit",
      data(){
        return{
          contents: ""
        }
      },
      methods: {
        save() {
          let that = this;
          let url = "http://127.0.0.1:8080/newsmessage/add.json";
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
        savePic(){

        }

      },

    }
</script>

<style scoped>

</style>
