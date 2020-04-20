<template>
  <div style="position: absolute;margin-top: 5%;width: 80%;margin-left: 18%;">

    <el-table
      :data="Msg.userList"
      style="width: 100%"
      max-height="800px">
      <el-table-column
        fixed
        prop="dateCreated"
        label="注册日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="userGender"
        label="性别"
        width="120">
      </el-table-column>
      <el-table-column
        prop="userAge"
        label="年龄"
        width="120">
      </el-table-column>
      <el-table-column
        prop="userType"
        label="用户类型"
        width="300">
      </el-table-column>
      <el-table-column
        prop="userTel"
        label="账号/电话"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, Msg.userList)"
            type="text"
            size="small">
            移除
          </el-button>
          <el-button
            @click.native.prevent="checkRow(scope.$index, Msg.userList)"
            type="text"
            size="small">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog
        title="用户信息"
        :visible.sync="usercheck.centerDialogVisible"
        width="30%"
        center>
        <span slot="footer" class="dialog-footer">
           <label>{{usercheck.data}}</label>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
        name: "userManager.vue",
      data(){
          return{
            Msg:{
              userList:[]
            },
            usercheck:{
              centerDialogVisible: false,
              data:''
            },
          }
      },
      methods:{
        deleteRow(index, rows) {
          this.userDelete(rows[index]);
          rows.splice(index, 1);
        },
          userGetAll(){
            let url="http://127.0.0.1:8080/user/findAll.json"
            let that=this;
            this.axios({
              method:'get',
              url:url,
              headers:{
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then( function(res) {
              that.Msg.userList=res.data;
            })
          },
          userDelete(item){
             let url="http://127.0.0.1:8080/user/delete.json"
             let that=this;
             this.axios({
               url:url,
               method:'post',
               params:{
                 id:item.id
               },
               headers:{
                 'Content-Type': 'application/json;charset=UTF-8'
               }
             }).then( function(res) {
                 that.$alert(res.data);
             })
           },
          checkRow(index,rows){
            this.usercheck.centerDialogVisible=true;
            this.usercheck.data=rows[index]

          }
    },
      mounted(){
      this.userGetAll();
      }
    }
</script>

<style scoped>

</style>
