<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="top_add_parameter_container">
      <router-link :to="{name:'parameterAdd',params:{id:id}}">
        <el-button type="primary" class="add_btn" icon="el-icon-plus">添加参数项</el-button>
      </router-link>
    </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      @selection-change="selectItem"
      style="width:100%">
    <el-table-column
    type="selection"
    width="50">
    </el-table-column>
      <el-table-column
      prop="value" label="参数值">
      </el-table-column>
      <el-table-column
        prop="description" label="描述">
      </el-table-column>
      <el-table-column
        label="时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.add_time | timestampToTime}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div>
            {{ scope.row.status | status }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { parameterListRender } from '@/api/parameterList'
  export default {
    data(){
      return {
        tableData:[],
        loading:false,
        id:null,
      }
    },
    created(){
      this.id = this.$route.params.id;
      parameterListRender(this.id).then(res=>{
        console.log(res);
        this.tableData = res.data;
      })
    },
    methods:{
      selectItem(val){
      
      }
    }
  }
</script>
<style lang="scss" scoped>
.top_add_parameter_container{
  margin-bottom:20px;
}
</style>
