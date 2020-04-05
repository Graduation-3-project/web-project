<template>
  <el-container>
    <el-header style="padding: 0;margin: 0">
        <div style="display: inline;padding: 0;margin: 0">
        <el-select
        v-model="value9"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
        </el-select>
          <div class="manspace">
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


      </el-main>

      <el-aside width="30%" style="padding: 0" >
        <div style="margin-top: 0px">
          <h3>热讯推荐</h3>
        </div>
      </el-aside>

    </el-container>
    <el-footer>


     <!-- <div>
        <el-button v-popover:popover1>hover 激活</el-button>
        <el-button v-popover:popover2>click 激活</el-button>



        <el-popover
          ref="popover1"
          placement="top-start"
          title="标题"
          width="200"
          trigger="hover"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        </el-popover>


        <el-popover
          placement="right"
          title="标题"
          width="200"
          trigger="focus"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
          <el-button slot="reference">focus 激活</el-button>

        </el-popover>






        <el-popover
          ref="popover2"
          placement="bottom"
          title="标题"
          width="200"
          trigger="click"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        </el-popover>



      </div>-->

    </el-footer>
  </el-container>
</template>

<script>
    export default {
        name: "HomePage",
      data(){
          return{
            options4: [],
            value9: [],
            list: [],
            loading: false,
            states: [
              "Georgia", "Hawaii", "Idaho", "Illinois",
              "Indiana", "Iowa", "Kansas", "Kentucky",
              "Louisiana", "Maine", "Maryland",
              "Massachusetts", "Michigan", "Minnesota",
              "Mississippi", "Missouri", "Montana",
              ]
          }
      },
      mounted(){
        this.list = this.states.map(item => {
          return { value: item, label: item };
        });
      },
      methods:{

        remoteMethod(query) {
          if (query !== '') {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.options4 = this.list.filter(item => {
                return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.options4 = [];
          }
        },
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
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
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
</style>
