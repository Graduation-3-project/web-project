<template>
  <el-container>
    <el-header>
      <!--3个值 scroll-循环滚动 slide-只滚动一次 alternate-来回滚动  默认循环滚动-->
      <marquee  loop="2">
        <p style="font-size: 25px;margin-top: 10px">
        我只滚动一次
        </p>
      </marquee>
      <!--https://www.jianshu.com/p/6dcec8a9ea60-->
    </el-header>
    <el-container>
      <el-aside width="200px" style="background: white"></el-aside>
      <el-container>
        <el-main style="padding-bottom: 0">



          <!--background: red-->
          <div style="float: right;width: 50%">
            <video style="height: auto;width: 100%" autoplay controls>
              <!--<source src="./../../assets/YouTube.mp4"  type="video/mp4">-->
              <source src="http://127.0.0.1:8080/videos/video"  type="video/mp4">
            </video>
          </div><!--background: blue-->

          <div style="float: right;;width: 50%;">
            <el-carousel style="width: 100%;height:311px">
                <el-carousel-item style="height: 310px" v-for="item in Msg.news_message" v-if="item.topFlag==='true'"  :key="item" >
                  <img style="width: inherit;height: inherit" :src="item.picsUrl"/>
                </el-carousel-item>
              </el-carousel>
          </div>
        </el-main>
        <div style="width: inherit;" class="border_frame">
        </div>
        <el-footer style="display: inline">
          <h2 style="text-align:left ;color: black;margin-top: 10px;">要点新闻</h2>
          <h2 style="float: right;color: black;margin-right: 6%">热文推荐</h2>
        </el-footer>
      </el-container>
    </el-container>
    <div id="div1" v-for="(item,index) in Msg.news_message" >
    <div v-on:click="goNextPage(index,item)" style="width:500px;height:180px; border-bottom:2px solid silver;margin-left: 14.6%;cursor: pointer" >
      <div style="float: left;">
        <img  style="width: 200px;height: 120px;margin-top: 30px;" :src="item.picsUrl"/>
      </div>
      <div style="float:left;width: 300px;height:100px;margin-top: 30px">
          <h3 style="clear: both;">{{item.newsTitle}}</h3>
      </div>
    </div>
    </div>
    <div class="border_frame" style="position:absolute;top:75%;width: 421px;height:max-content;clear: both;margin-left: 66%">
      <li style="font-size: 20px;cursor: pointer;float: inherit;;margin-top: 10px" v-for="item in Msg.news_message" v-show="item.topFlag=='true'">
        <span>{{item.newsTitle}}</span>
      </li>
    </div>

  </el-container>
</template>

<script>

    export default {
        name: "News",
      data(){
        return{
          Msg:{
            news_message:'',
            news:''
          }
        }
      },
      methods:{
          goNextPage(index,item){
           console.log("输出index"+index)
            this.$router.push({ name: 'NewsNextPage',params:{items:item}});
          },
        getNewsMessage() {
          let that = this;
          let url = "http://127.0.0.1:8080/newsmessage/findAll.json";
          {
            this.axios({
              method: 'get',
              url: url,
              params: {
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              /*  withCredentials:true,*///后端配置过跨域请求前端就不用使用这个
            }).then(function (res) {
              // that.$router.push({ name: 'Home',params:{loginFlag:false}});
              console.log("输出长度"+res.data.length)
                        that.Msg.news_message=res.data
            });
          }
        }
      },
      mounted(){
this.getNewsMessage();
      }
    }
</script>

<style scoped>
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  img {
    transition:transform 0.5s;
  }
  img:hover {
    transform:scale(1.2);
  }
  span:hover{
    color:#f62016
  }
  .border_frame{
    border-radius: 4px;
    border-left:2px solid #000;
    border-right:2px solid #000;
    border-top :2px solid #000;
    border-bottom:2px solid #000;
  }
  #div1  div:hover{
    background: silver;
    /*给指定的id为div的添加hover*/
  }
</style>
