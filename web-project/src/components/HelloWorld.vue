<template>
<div>
  <div>
  {{msg}}
  </div>


<div>
  <el-button v-on:click="add">自加</el-button>
  <el-button v-on:click="add10">加10</el-button>
  <el-button v-on:click="actions">action</el-button>
  {{count}}
</div>



</div>
</template>

<script>
  import store from './../store'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    add(){
      this.$store.commit("increment")
    },
    add10(){
      this.$store.commit("add10")
    },
    actions(){
      this.$store.dispatch('add10')
    }

  },
  computed:{
    count(){
      return this.$store.state.count
  }
  },
  mounted(){

    console.log("这是vuex的状态管理默认值"+store.state.number)
    this.$store.commit('numadd')

    console.log("调用后的值"+store.state.number)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
