<template>
  <div class="block">
    <span class="demonstration">只可选择最后一级菜单的选项</span>
    <el-cascader
      placeholder="试试搜索：指南"
      :options="options"
      filterable
    ></el-cascader>
    
    <p>
      {{ip}}
    </p>
  </div>
</template>

<script>
    export default {
        name: "FinishInfo",
      data() {
          return{
            options: [
              {
              value: 'zhinan',
              label: '指南',
              children: [
                {
                value: 'shejiyuanze',
                label: '设计原则'
                },
               {
                value: 'daohang',
                label: '导航',
              }]
            },
              {
              value: 'zujian',
              label: '组件',
              children: [
                 {
                value: 'form',
                label: 'Form'
                 },
                ]
            },],
            ip: ''
          };
      },
      methods:{
        handleItemChange(val) {
          console.log('active item:', val);
          setTimeout(_ => {
            if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length)
            {
              this.options2[0].cities = [{label: '南京'}];
            } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length)
            {
              this.options2[1].cities = [{label: '杭州'}];
            }

          }, 300);
        },
        getUserIP(onNewIP) {


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
        }
      },
      mounted(){
        this.getUserIP((ip) => {
          this.ip = ip;
        });
      }
    }
</script>

<style scoped>

</style>
