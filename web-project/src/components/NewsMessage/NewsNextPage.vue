<template>
    <div>
      <h1 v-html="gotMsg.newsTitle"></h1>
    <div v-html="gotMsg.newsContent"></div>

      <p style="margin-left: 80%">{{gotMsg.dateCreated}}</p>
      <p style="margin-left: 80%">{{gotMsg.newsAuthor}}</p>
    </div>
</template>

<script>
    export default {
        name: "NewsNextPage",
      data(){
          return{
            gotMsg:''
          }
      },
      methods:{
        addClickNumber(item){

          let urls = "http://127.0.0.1:8080/newsmessage/AddClickNumber.json";

            this.axios({
              method: 'post',
              url: urls,
              params:{
                id:item.id
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
            }).then(function (res) {
            });

        }

      },
    mounted(){
      this.gotMsg=this.$route.params.items
      this.addClickNumber(this.gotMsg);
    }
    }
</script>

<style scoped>

</style>
