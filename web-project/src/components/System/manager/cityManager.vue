<template>
  <div style="position: absolute;margin-top: 5%;width: 80%;margin-left: 18%;">
    <el-table
      :data="AllMsg.disPlayMsg"
      border
      style="width: 100%">
      <el-table-column
        prop="city"
        label="城市"
        width="120">
      </el-table-column>
      <el-table-column
        prop="region"
        label="省份"
        width="120">
      </el-table-column>
      <el-table-column
        prop="number"
        label="人数"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" v-on:click="userCheck(scope.row)" size="small">查看用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog title="城市用户信息" :visible.sync="AllMsg.disPlayFlags.userCheck">
      <el-table :data="AllMsg.userCheckMsg">
        <el-table-column property="id" label="id" width="150"></el-table-column>
        <el-table-column property="userTel" label="电话" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
                   <el-button type="text" v-on:click="userMessageCheck(scope.row)" size="small">查看动态</el-button>
        </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    </div>

    <div>
      <el-dialog title="查看用户动态" :visible.sync="AllMsg.disPlayFlags.userMessageCheck">
        <el-table :data="AllMsg.userMessageCheckMsg">
          <el-table-column property="id" label="id" width="150"></el-table-column>
          <el-table-column property="messageTitle" label="标题" width="200"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" v-on:click="deleteMessage(scope.row,scope.$index)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
        name: "cityManager",
        data(){
          return{
            AllMsg:{
              userMsg:{
                user_db_msg:[],
              },
              disPlayMsg:[],
              disPlayFlags:{
                userCheck:false,
                userMessageCheck:false
              },
              userMessageCheckMsg:[],
              userCheckMsg:[]
            },
          }
        },
      methods:{
           handleClick(row) {
          console.log(row);
        },
           deleteMessage(item,index){
             let url="http://127.0.0.1:8080/message/Delete.json";
             let that=this;
             this.axios({
               method:'post',
               url:url,
               params:{
                 id:item.id
               },
               headers: {
                 'Content-Type': 'application/json;charset=UTF-8'
               },
             }).then(function (res) {
               that.$alert(res.data);
             })

             this.AllMsg.userMessageCheckMsg.splice(index, 1);
          },
           userMessageCheck(item){
             this.AllMsg.disPlayFlags.userMessageCheck=true
             this.AllMsg.userMessageCheckMsg=item.message;
           },
           userCheck(item){
             console.log("输出信息"+item)
             this.AllMsg.disPlayFlags.userCheck=true;
             this.AllMsg.userCheckMsg=item.users;
           },
           getAllUserMsg(){
            let url="http://127.0.0.1:8080/user/findAll.json";
            let that=this;
            this.axios({
              method:'get',
              url:url,
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
            }).then(function (res) {
              that.AllMsg.userMsg.user_db_msg=res.data;

              setTimeout(()=>{
                that.sortData()
              },5000)

            })
          },
           sortData(){
            for(let item in this.AllMsg.userMsg.user_db_msg)
            {
              if(item==0){
                let obj={
                  users:[{

                    id:this.AllMsg.userMsg.user_db_msg[item].id,
                    userTel:this.AllMsg.userMsg.user_db_msg[item].userTel,
                    message:this.AllMsg.userMsg.user_db_msg[item].messageList,
                  }],
                  city: this.AllMsg.userMsg.user_db_msg[item].location.city,
                  region: this.AllMsg.userMsg.user_db_msg[item].location.region,
                  number:1,
                };
                this.AllMsg.disPlayMsg.push(obj);

              }
              if(item!=0){

                let addFlag=true
                for(let items in this.AllMsg.disPlayMsg)
                {
                  if(this.AllMsg.disPlayMsg[items].city===this.AllMsg.userMsg.user_db_msg[item].location.city)
                  {
                    this.AllMsg.disPlayMsg[items].number++;
                    this.AllMsg.disPlayMsg[items].users.push({
                      id:this.AllMsg.userMsg.user_db_msg[item].id,
                      userTel:this.AllMsg.userMsg.user_db_msg[item].userTel,
                      message:this.AllMsg.userMsg.user_db_msg[item].messageList,
                    });
                    addFlag=false
                  }
                }
                if(addFlag){
                  let obj={
                    users:[{

                      id:this.AllMsg.userMsg.user_db_msg[item].id,
                      userTel:this.AllMsg.userMsg.user_db_msg[item].userTel,
                      message:this.AllMsg.userMsg.user_db_msg[item].messageList,
                    }],
                    city: this.AllMsg.userMsg.user_db_msg[item].location.city,
                    region: this.AllMsg.userMsg.user_db_msg[item].location.region,
                    number:1,
                  };
                  this.AllMsg.disPlayMsg.push(obj);
                }

              }

            }
          }
        },
      mounted(){
            this.getAllUserMsg();
      }

    }
</script>

<style scoped>

</style>
