<template>
  <div class="block">
    <span class="demonstration">只可选择最后一级菜单的选项</span>
    <el-cascader
      placeholder="试试搜索：指南"
      :options="options"
      filterable
    ></el-cascader>
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
            },]
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

      }
    }
</script>

<style scoped>

</style>
