<template>
  <div>


  <div v-if="db_User_Msg.userFinishMsgFlag==='false'" style="margin-top: 10%;">
    <h1 style=";margin-top: 10px">完善信息</h1>
    <el-form style="width: 340px;margin-left: 35%" :model="finishedMsg" ref="finishedMsg" label-width="100px" class="demo-ruleForm">
       <!-- label="年龄"-->
       <el-form-item
         prop="userAge"
         :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]">
         <el-input placeholder="输入年龄" style="width: 240px;" type="age" v-model.number="finishedMsg.userAge" auto-complete="off"></el-input>
         </el-form-item>
         <el-form-item>
         <el-select style="width: 240px;" v-model="finishedMsg.userGender" placeholder="请选择">
         <el-option
           v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
         </el-select>
     </el-form-item>

       <el-form-item>
         <el-button style="width: 240px" type="primary" @click="saveFinishedMsg('finishedMsg')">提交</el-button>
       </el-form-item>
<el-form-item>
  {{finishedMsg.userCity}}
</el-form-item>
     </el-form>
  </div>

  <div v-if="db_User_Msg.userFinishMsgFlag==='true'" >
    <h1 style=";margin-top: 10px">个人信息</h1>
    <el-form style="float: left;margin-left: 10%;margin-top: 6%">
      <el-form-item style="width: 500px;height: max-content;background: rgba(246,40,209,0.15)">
        <h3>注册日期：{{db_User_Msg.dateCreated}}</h3>
        <h3>用户性别：{{db_User_Msg.userGender}}</h3>
        <h3>用户年龄：{{db_User_Msg.userAge}}</h3>
        <h3>用户账号：{{db_User_Msg.userTel}}</h3>
        <h3>所在国家：{{db_User_Msg.location.country}}</h3>
        <h3>所在省份：{{db_User_Msg.location.region}}</h3>
        <h3>所在城市：{{db_User_Msg.location.city}}</h3>
      </el-form-item>
    </el-form>
    <el-form   style="float: right;margin-top: 6%;;margin-right: 10%;">
      <el-form-item style="width: 500px;height: 410px;background: rgba(246,40,209,0.15)">
        <h3>修改密码</h3>
        <el-input type="password"  v-model="passWord_mode.oldPassWord" placeholder="请输入原来密码" style="width: 50%"/>
        <el-input type="password"  v-model="passWord_mode.newPassWord" placeholder="请设置新密码" style="width: 50%;margin-top: 6%"/>
        <el-input type="password" placeholder="再输入新密码" v-model="passWord_mode.tertainPassWord" style="width: 50%;margin-top: 6%"/>
        <br/>
        <el-button v-on:click="modifyPassWord()" style="margin-top: 12%" type="primary">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
  var publicIp=returnCitySN['cip']
    export default {
        name: "FinishInfo",
      data() {
          return{
            ip: '',
            options: [
              {
              value: '男',
              label: '男'
            },
              {
              value: '女',
              label: '女'
            }],
            finishedMsg:{
              userGender:'',
              userAge:'',
              location:{
                region:'陕西',
                city:'西安',
                country:'中国'
              },
            },
            db_User_Msg:'',
            passWord_mode:{
              oldPassWord:'',
              tertainPassWord:'',
              newPassWord:'',
              dbPassWord:''
            },
          };
      },
      methods:{
        getUserIP(onNewIP) {
          /*获取内网ip*/
          let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
          let pc = new MyPeerConnection({
            iceServers: []
          });
          let noop = () => {
          };
          let localIPs = {};
          let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
          let iterateIP = (ip) => {
            if (!localIPs[ip]) onNewIP(ip);
            localIPs[ip] = true;
          };
          pc.createDataChannel('');
          pc.createOffer().then((sdp) => {
            sdp.sdp.split('\n').forEach(function (line) {
              if (line.indexOf('candidate') < 0) return;
              line.match(ipRegex).forEach(iterateIP);
            });
            pc.setLocalDescription(sdp, noop, noop);
          }).catch((reason) => {
          });
          pc.onicecandidate = (ice) => {
            if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
            ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
          };
        },
        getOutIp(){
          console.log("公网ip"+publicIp);
        },
        saveFinishedMsg(){

          if(this.finishedMsg.userAge!=''&&this.finishedMsg.userGender!=''){

            let url="http://127.0.0.1:8080/user/finishedMsg.json";
            let that=this;
            this.axios({
              method: 'post',
              url: url,
              params:{
                id:that.$cookies.get('userID').id,
                userGender:that.finishedMsg.userGender,
                userAge:that.finishedMsg.userAge
              },
              data: that.finishedMsg.location,
              headers:{
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then(function (res) {
              that.$alert(res.data);
              that.getUserMsg()

            });
          }else {
            this.$alert("请选填完信息")
          }

          console.log("发送前城市输出"+this .finishedMsg.location.region)
          console.log("usercooki=="+this.$cookies.get('userID').id)
          console.log("输出年龄"+this.finishedMsg.userAge)
          console.log("输出性别"+this.finishedMsg.userGender)
        },
        getUserMsg(){
          let url="http://127.0.0.1:8080/user/findOneUser.json";
          let that=this;
          this.axios({
            method: 'get',
            url: url,
            params:{
              id:that.$cookies.get('userID').id,
            },headers:{
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then(function (res) {
            that.db_User_Msg=res.data;
            that.passWord_mode.dbPassWord=res.data.userPassword
            console.log("输出信息完成标志"+  that.db_User_Msg.userFinishMsgFlag)
          });
          },
        modifyPassWordOldJudeg(){
          if(this.passWord_mode.oldPassWord===this.passWord_mode.dbPassWord){
            return 1;
          }else {
            this.$alert("原始密码错误");
            this.passWord_mode.oldPassWord=''
            return 0;
          }
        },
        modifyPassWordNewPassWordTertainJudeg(){

          if(this.passWord_mode.newPassWord===this.passWord_mode.tertainPassWord){
            return 1;
          }else {
            this.$alert("确认密码错误重新输入");
            this.passWord_mode.tertainPassWord=''
            return 0;
          }
        },
        modifyPassWord(){
         if(this.modifyPassWordNewPassWordTertainJudeg()&&this.modifyPassWordOldJudeg())
         {
           let url='http://127.0.0.1:8080/user/passwordUpdate.json';
           let that=this;
           this.axios({
             url:url,
             method:"post",
             params:{
               userPassword:that.passWord_mode.newPassWord,
               id:that.$cookies.get('userID').id,
             },
             headers:{
               'Content-Type': 'application/json;charset=UTF-8'
             }
           }).then(function (res) {
             that.$alert(res.data);
             that.passWord_mode.newPassWord='';
             that.passWord_mode.tertainPassWord='';
             that.passWord_mode.oldPassWord=''
           })
         }
           },
        getLocaltionAddress(){
          let url="http://127.0.0.1:8080/ip/location.json";
          let that=this;
          this.axios({
            method: 'get',
            url: url,
            params:{
              ip:publicIp.toString()
            },headers:{
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then(function (res) {
            /*
            * { "ip": "111.19.96.163",
             * "long_ip": "1863540899",
             * "isp": "移动",
             * "area": "西北",
              * "region_id": "610000",
               * "region": "陕西",
                * "city_id": "610100",
                 * "city": "西安",
                 * "country_id": "CN",
                  * "country": "中国" }*/
            that.finishedMsg.location.city=res.data.data.city;
            console.log("市"+res.data.data.city)
            that.finishedMsg.location.country=res.data.data.country;
            that.finishedMsg.location.region=res.data.data.region;
            //let region =res.data.data.region;
            //let city=res.data.data.city;
            //let country=res.data.data.country;
            //console.log("国"+country)
            //console.log("省"+region)
            //console.log("市"+city)
          })
        },
      },
      mounted(){
        //console.log("userIdcooki=="+this.$cookies.get('userId').id)

        this.getUserMsg();
        this.getUserIP((ip) => {
          this.ip = ip;
        });
        this.getOutIp();
        if(this.db_User_Msg.userFinishMsgFlag=="false"){
         // this.getLocaltionAddress();
        }


      }
    }
</script>

<style scoped>

</style>
