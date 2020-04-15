<template>
  <!-- <el-table
     :data="tableData"
     border
     style="width: 100%">

     <el-table-column
       fixed
       prop="date"
       label="日期"
       width="150">
     </el-table-column>
     <el-table-column
       prop="name"
       label="姓名"
       width="120">
     </el-table-column>
     <el-table-column
       prop="province"
       label="省份"
       width="120">
     </el-table-column>
     <el-table-column
       prop="city"
       label="市区"
       width="120">
     </el-table-column>
     <el-table-column
       prop="address"
       label="地址"
       width="300">
     </el-table-column>
     <el-table-column
       prop="zip"
       label="邮编"
       width="120">
     </el-table-column>
     <el-table-column
       fixed="right"
       label="操作"
       width="100">
       <template slot-scope="scope">
         <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
         <el-button type="text" size="small">编辑</el-button>
       </template>
     </el-table-column>
   </el-table>-->
    <div style="margin-top: 1%;width: 80%;margin-left: 18%;">
      <div style=" border-top :6px solid #000;;width: 100%;height: 1%;background: silver">

      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="date"
          label="日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.index, tableData)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-html="content.newsContent">
      {{content.newsContent}}
      </div>
    </div>
</template>

<script>
    export default {
        name: "newsManager",
      data(){
          return{
            tableData: [
              {
              date: '2016-05-03',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }
            , {
              date: '2016-05-02',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, {
              date: '2016-05-04',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, {
              date: '2016-05-01',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            },{
              date: '2016-05-01',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            },{
              date: '2016-05-01',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            },{
              date: '2016-05-01',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            },{
              date: '2016-05-01',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            },],
            content:''
          }
      },
      methods:{
        handleClick(row) {
          console.log(row);
        },
        deleteRow(index, rows) {
          rows.splice(index, 1);
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
                     that.content=res.data[2];
              });
            }
          }
      },
      mounted(){
          console.log("newsManager");
        this.getNewsMessage();
      },
    }
</script>

<style scoped>

</style>
