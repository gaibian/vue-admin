<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="top_add_container" ref="topAdd">
      <router-link :to="{name:'relationUserAdd',params:{pid:id}}">
        <el-button type="primary" size="small" icon="el-icon-plus">
          关联添加
        </el-button>
      </router-link>
    </div>
    <el-table
      :data="tableData"
      :max-height="tableHeight"
      v-loading="loading"
      style="width:100%"
      border>
      <el-table-column label="名称" prop="name">
      </el-table-column>
      <el-table-column label="关联人" prop="follow_name"></el-table-column>
      <el-table-column label="添加时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.add_time | timestampToTime }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div ref="btmGroup" style="height:70px;">
      <el-row class="pos-rel" style="height:70px;" type="flex" align="middle" justify="space-between"></el-row>
    </div>
  </div>
</template>
<script>
  import { agentListRender } from '@/api/agent'
  import resize from '@/utils/page-mixins'
  export default {
    name:'relationUserList',
    mixins:[resize],
    data(){
      return {
        id:null,
        tableData:null,
        loading:true,
        tableHeight:null
      }
    },
    created(){
      this.id = Number(this.$route.params.id);
      this.init();
    },
    methods:{
      init(){
        this.loading = true;
        console.log(this.id);
        agentListRender(this.id).then(res=>{
          if(res !== 'error'){
            console.log(res);
            this.tableData = res.data;
            this.loading = !this.loading;
          }
        })
      }
    },
    watch: {
      '$route' (to, from) {
        this.init()
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
