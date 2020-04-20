<template>
  <div style="position: absolute;margin-top: 5%;width: 80%;margin-left: 18%;">
    <el-table
      :data="Msg.noticeList"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="dateCreated"
        label="日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="120">
      </el-table-column>
      <el-table-column
        prop="noticeTitle"
        label="标题"
        width="120">
      </el-table-column>
      <el-table-column
        prop="topFlag"
        label="置顶"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="topNotice(scope.$index,Msg.noticeList)" type="text" size="small">置顶</el-button>
          <el-button @click="DeleteNotice(scope.$index,Msg.noticeList)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
 </div>
</template>

<script>
    export default {
        name: "noticeManager",
      data(){
        return{
          Msg:{
            noticeList:[]
          }
        }
      },
      methods:{
        handleClick(row) {
          console.log(row);
        },
        getAllNotice(){
          let that=this;
          let url="http://127.0.0.1:8080/notice/findAll.json"
          this.axios({
            method:'get',
            url:url,
            headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
          }).then(function (res) {
            that.Msg.noticeList=res.data;
          })

        },
        DeleteNotice(index,rows) {

            let that=this;
            let url="http://127.0.0.1:8080/notice/Delete.json"
            this.axios({
              method:'post',
              url:url,
              params:{
                id:rows[index].id
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then(function (res) {
                  that.$alert(res.data)
            })
          rows.splice(index, 1);
          },
        topNotice(index,rows) {
          let that=this;
          let url="http://127.0.0.1:8080/notice/makeTop.json"
          this.axios({
            method:'post',
            url:url,
            params:{
              id:rows[index].id
            },
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then(function (res) {
            that.$alert(res.data)
          })
        }

      },
      mounted(){
          this.getAllNotice();
      }
    }
</script>

<style scoped>

</style>
