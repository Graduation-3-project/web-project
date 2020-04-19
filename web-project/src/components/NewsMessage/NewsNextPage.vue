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
    mounted(){
      this.gotMsg=this.$route.params.items
    }
    }
</script>

<style scoped>

</style>
