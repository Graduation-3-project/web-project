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
              <source src="./../../assets/YouTube.mp4"  type="video/mp4">
            </video>
          </div><!--background: blue-->


          <div style="float: right;;width: 50%">
            <div class="block">
              <el-carousel style="width: 100%;height: auto">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3>{{ item }}sdkslkd</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
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


    <divs style="width:500px;height:180px; border-bottom:2px solid silver;margin-left: 14.6%" >
      <div style="float: left;cursor: pointer">
        <img  style="width: 200px;height: 120px;margin-top: 30px;" src="./../../assets/timg.png"/>
      </div>
      <div style="float:left;width: 300px;height:100px;margin-top: 30px">
          <h3 style="clear: both;cursor: pointer">当今皇上反抗军的房间哦加里的顺利地考上了哦发的</h3>
      </div>
    </divs>



    <div class="border_frame" style="width: 421px;height:max-content;clear: both;margin-left: 60%">
      <li style="font-size: 20px;cursor: pointer;float: inherit;;margin-top: 10px" v-for="item in 10">
        <span>dandsalkkdksaldsas</span>
      </li>
    </div>

  </el-container>
</template>

<script>
    export default {
        name: "News"
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
  divs:hover{
    background: silver;
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
</style>
