<template>
  <div style="position: absolute;margin-top: 5%;width: 80%;margin-left: 18%;">
    <div id="UserBar" style="width:600px;height: 300px">

    </div>
    <div id="city" style="width: 600px;height: 300px">

    </div>
  </div>
</template>

<script>
import china from './../../../assets/china'
    export default {
        name: "statisticManager",
      data(){
          return{
            AllMsg:{
            userMsg:{
              Fanchart:{},
              Linechart:{},
              Barchart:{},
            },
            cityMsg:{
              Fanchart:{},
              Linechart:{},
              Barchart:{},
            },
            user_db_msg:[],
            city_db_msg:[]
            }

          }
      },
      methods:{
            setUserBar(){
              var myChart = this.echarts.init(document.getElementById('UserBar'));
              let option={
                title: {
                  text: '用户人数注册'
                },
                tooltip: {},
                xAxis: {
                  data: []
                },
                yAxis: {

                },
                series: [
                  {
                    name: '注册人数',
                    type: 'bar',//条形图
                    data: []
                  },
                  {
                    name: '注册人数',
                    type: 'line',//条形图
                    data: []
                  },

                ]
              }
              let sortData=[];
              for(let item in this.AllMsg.user_db_msg)
              {
                if(item==0){
                  sortData.push({
                    name:this.AllMsg.user_db_msg[item].dateCreated,
                    number:1
                  });
                }
                if(item!=0)
                {
                  let addFlag=true
                  for(let items=0; items<sortData.length;items++)
                  {
                    let flag=(sortData[items].name===this.AllMsg.user_db_msg[item].dateCreated);
                    if(flag)
                    {
                      sortData[items].number++;
                      addFlag=false
                    }
                    }
                  if(addFlag===true){
                    sortData.push({
                      name:this.AllMsg.user_db_msg[item].dateCreated,
                      number:1
                    });

                  }





                }
              }

              for (let item in sortData)
              {
                option.xAxis.data.push(sortData[item].name);
                option.series[0].data.push(sortData[item].number)
                option.series[1].data.push(sortData[item].number)
              }
              myChart.setOption(option);
            },

            setCity(){

              var cityChart = this.echarts.init(document.getElementById('city'));
              let option={
                title: {
                  text: '城市人数分布'
                },
                tooltip: {},
                xAxis: {
                  data: []
                },
                yAxis: {

                },
                series: [
                  {
                    name: '城市人数',
                    type: 'bar',//条形图
                    data: []
                  },
                  {
                    name: '库存',
                    type: 'line',//折现图
                    data: []
                  },
                ]
              }

              let sortData=[];
              for(let item in this.AllMsg.city_db_msg)
              {
                if(item==0){
                  sortData.push({
                    name:this.AllMsg.city_db_msg[item].city,
                    number:1
                  });
                        }
                if(item!=0)
                {
                  let addFlag=true
                  for(let items in sortData)
                  {
                    if(sortData[items].name===this.AllMsg.city_db_msg[item].city)
                    {
                      sortData[items].number++;
                      addFlag=false

                    }
                  }
                  if(addFlag===true)
                  {
                    sortData.push({
                      name:this.AllMsg.city_db_msg[item].city,
                      number:1
                    });
                  }

                }

              }
              for (let item in sortData)
              {
                option.xAxis.data.push(sortData[item].name);
                option.series[0].data.push(sortData[item].number)
                option.series[1].data.push(sortData[item].number)
              }
              cityChart.setOption(option);
            },
            setChina(){
            //  let randomData=this.randomData();

              var mydata = [
                {name: '北京',value: '100' },{name: '天津',value: this.randomData() },
                {name: '上海',value: this.randomData() },{name: '重庆',value: this.randomData() },
                {name: '河北',value: this.randomData() },{name: '河南',value: this.randomData() },
                {name: '云南',value: this.randomData() },{name: '辽宁',value: this.randomData() },
                {name: '黑龙江',value: this.randomData() },{name: '湖南',value: this.randomData() },
                {name: '安徽',value: this.randomData() },{name: '山东',value: this.randomData() },
                {name: '新疆',value: this.randomData() },{name: '江苏',value: this.randomData() },
                {name: '浙江',value: this.randomData() },{name: '江西',value: this.randomData() },
                {name: '湖北',value:this. randomData() },{name: '广西',value: this.randomData() },
                {name: '甘肃',value: this.randomData() },{name: '山西',value: this.randomData() },
                {name: '内蒙古',value: this.randomData() },{name: '陕西',value: this.randomData() },
                {name: '吉林',value: this.randomData() },{name: '福建',value: this.randomData() },
                {name: '贵州',value: this.randomData() },{name: '广东',value: this.randomData() },
                {name: '青海',value: this.randomData() },{name: '西藏',value: this.randomData() },
                {name: '四川',value: this.randomData() },{name: '宁夏',value: this.randomData() },
                {name: '海南',value: this.randomData() },{name: '台湾',value: this.randomData() },
                {name: '香港',value: this.randomData() },{name: '澳门',value: this.randomData() }
              ];
              var optionMap = {
                backgroundColor: '#FFFFFF',
                title: {
                  text: '全国地图大数据',
                  subtext: '',
                  x:'center'
                },
                tooltip : {
                  trigger: 'item'
                },

                //左侧小导航图标
                visualMap: {
                  show : true,
                  x: 'left',
                  y: 'center',
                  splitList: [
                    {start: 500, end:600},{start: 400, end: 500},
                    {start: 300, end: 400},{start: 200, end: 300},
                    {start: 100, end: 200},{start: 0, end: 100},
                  ],
                  color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#e6ac53', '#9fb5ea']
                },

                //配置属性
                series: [{
                  name: '数据',
                  type: 'map',
                  mapType: 'china',
                  roam: true,
                  label: {
                    normal: {
                      show: true  //省份名称
                    },
                    emphasis: {
                      show: false
                    }
                  },
                  data:mydata  //数据
                }]
              };
              var myChart = this.echarts.init(document.getElementById('china'));

              //使用制定的配置项和数据显示图表
              myChart.setOption(optionMap);

            },
            setChinaData(){

            },
        randomData() {
          return Math.round(Math.random()*500);
        },
        getuserMsg(){
              let url="http://127.0.0.1:8080/user/findAll.json";
              let that=this;
              this.axios({
                method:'get',
                url:url,
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                },
              }).then(function (res) {
                  that.AllMsg.user_db_msg=res.data;

                  setTimeout(()=>{
                    that.setUserBar();
                  },5000)

              })
            },
        getCityMsg(){
          let url="http://127.0.0.1:8080/locatin/findAll";
          let that=this;
          this.axios({
            method:'get',
            url:url,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
          }).then(function (res) {
            that.AllMsg.city_db_msg=res.data;
            setTimeout(()=>{
              that.setCity();
            },5000)
          })
        },

      },
      mounted(){

        //this.setChina()
        this.getuserMsg();
        this.getCityMsg()
      }
    }
</script>

<style scoped>

</style>
