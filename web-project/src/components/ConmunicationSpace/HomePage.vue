<template>
  <el-container>
    <el-header style="padding: 0;margin: 0">
        <div style="display: inline;padding: 0;margin: 0">
          <div class="manspace" v-on:click="GoNextPage('PersonSpace')">
            个人空间
          </div>
        </div>
    </el-header>
    <el-container>
      <el-aside width="20%">
        <h3>热讯推荐</h3>
      </el-aside>

      <el-main>
        <div style="background: red">
          <h3>信息浏览</h3>
        </div>



        <div class="message" v-for="item in 10" v-on:click="GoNextPage('MessageDisPlay')">
          <h1 style="cursor: pointer">上课的绿卡就是的拉萨扩大</h1>
          <p style="width: 600px;cursor: pointer">
          {{info}}
          </p>
          <div style="margin-bottom: 0;margin-left: 70%">
            <p><span style=" color: rgba(246,29,29,1);font-size: 25px;"><img id="good" v-on:click="good" class="goodpic" src="./../../assets/good.png"/>{{num}}</span><span><img id="bad" class="badpic" v-on:click="bad"  src="./../../assets/bad.png"/>10</span></p>
          </div>
        </div>


      </el-main>

      <el-aside width="30%" style="padding: 0" >
        <div style="margin-top: 0px">
          <h3>热讯推荐</h3>
        </div>
      </el-aside>

    </el-container>
    <el-footer>
    </el-footer>
  </el-container>
</template>

<script>
    export default {
        name: "HomePage",
      data(){
          return{
             info:'sad十九大拉开圣诞节了到喀什灯笼裤吉萨大绿卡就是领导看见看到撒娇空间的撒赖扩大就阿斯利康大家阿斯兰的空间als/kjdasl/kdjaskl/djlaks/jdlask/dja/slkjasl/kdj' +
               'salk/djlk/sajd/laskjd/lkasjdl/as收到了看 阿斯达克欧卡都抛开雷克萨零三零kaASdkaS:LDkas;ldksa/dlkasj/ldjasl/kdjas/lkdjasl/kdjaskldjas/ldkjas/lkdj kdjl/ksajla/k就'
          ,
            num:10
          }
      },
      mounted(){

      },
      methods:{
        bad(){

        },
        good(){
          let obj = document.getElementById("good");
          obj.style.cssText = ""
          this.num++;
          setTimeout({

          },1000)
         // obj.style.cssText = ""
        },
        GoNextPage(item){
          //this.$router.push({path:"MessageDisPlay",params:{info:item}})
          this.$router.push({path:"/"+item})
        }
      }
    }
</script>

<style scoped>
  .el-header, .el-footer {
    /*background-color: #B3C0D1;
    color: #333;*/
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  .el-main {
   /* background-color: #E9EEF3;*/
   /* color: #333;*/
    text-align: center;
  }
  .manspace{
    position: absolute;
    margin: 0;
    padding: 0;
    top: 1px;
    right: 10px;
    font-size: 25px;
    margin-right: 90px;
    cursor: pointer;
    display: inline
  }
  .message{
    width: 700px;
    height: 250px;
    border-radius: 4px;
    border-left:2px solid #000;
    border-right:2px solid #000;
    border-top :2px solid #000;
    border-bottom:2px solid #000;
  }
  .goodpic{
    width: 30px;height: 30px;cursor: pointer;
  }
  .badpic{
    width: 30px;height: 30px;transform: rotate(180deg);cursor: pointer
  }
</style>
