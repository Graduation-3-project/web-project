<template>
  <!--<div id="app">
  <img src="./assets/logo.png">

  </div>-->
 <div id="app">
    <router-view />
 </div>

</template>

<script>
export default {
  name: 'App',
  mounted(){

    //this.$router.push({path:'/Home'})
    //this.$router.push(path:)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
 /* margin-top: 60px;*/
}
</style>
