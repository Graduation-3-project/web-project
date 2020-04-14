<template>
    <div style="width: 80%;margin-left: 19%;margin-top: 1%;">
      <div>
        <!--https://www.cnblogs.com/zblwyj/p/10494788.html-->
        <h3>文本编辑富文本编辑器</h3>
        <vue-editor v-model="content"></vue-editor>
      </div>

      <div v-html="content"></div>
    </div>


</template>
<script>
    export default {
        name: "newsEdit",
      data(){
          return{
            content: "<h1>这是什么</h1>"
          }
      }
    }
</script>

<style scoped>

</style>
