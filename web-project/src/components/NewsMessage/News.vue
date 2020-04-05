<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>

        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>




    <divs style="width:500px;height:180px; border-bottom:2px solid silver;" >
      <div style="float: left;cursor: pointer">
        <img  style="width: 200px;height: 120px;margin-top: 30px;" src="./../../assets/timg.png"/>
      </div>
      <div style="float:left;width: 300px;height:100px;margin-top: 30px">
          <h3 style="clear: both;cursor: pointer">当今皇上反抗军的房间哦加里的顺利地考上了哦发的</h3>
      </div>
    </divs>





  </el-container>
</template>

<script>
    export default {
        name: "News"
    }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
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
</style>
