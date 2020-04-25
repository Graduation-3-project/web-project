<template>
  <div style="margin-top: 10%;">
         <h1 style="margin-left: 3%;margin-top: 10px">完善信息</h1>
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
</template>

<script>
  var publicIp=returnCitySN['cip']
    export default {
        name: "FinishInfo",
      data() {
          return{
            ip: '',
            numberValidateForm: {
              age: ''
            },
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
            }

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
            });
          }else {
            this.$alert("请选填完信息")
          }

          console.log("发送前城市输出"+this .finishedMsg.location.region)
          console.log("usercooki=="+this.$cookies.get('userID').id)

          console.log("输出年龄"+this.finishedMsg.userAge)
          console.log("输出性别"+this.finishedMsg.userGender)
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
            that.finishedMsg.location.country=res.data.data.country;
            that.finishedMsg.location.region=res.data.data.region;
            let region =res.data.data.region;
            let city=res.data.data.city;
            let country=res.data.data.country;
            console.log("国"+country)
            console.log("省"+region)
            console.log("市"+city)
          })
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
      },
      mounted(){
        //console.log("userIdcooki=="+this.$cookies.get('userId').id)

        this.getUserIP((ip) => {
          this.ip = ip;
        });
        this.getOutIp();
        //this.getLocaltionAddress();
      }
    }
</script>

<style scoped>

</style>
