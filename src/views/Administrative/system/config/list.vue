<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="top_add_config_container" ref="topAdd">
      <router-link class="btn-link-large add-btn" to="add">
        <el-button icon="el-icon-plus" type="primary">添加参数</el-button>
      </router-link>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      v-loading="loading"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          <div>
            {{ scope.row.add_time | timestampToTime }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <div>
            <span>
              <el-button size="mini" @click="editClick(scope.row)" type="primary">编辑</el-button>
            </span>
            <span>
              <router-link :to="{ name: 'parameterList', params: { id: scope.row.id }}" class="btn-link">
                <el-button size="mini" type="primary">查看</el-button>
              </router-link>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog ref="dialog" top="0" width="400px" class="dialog-slider" :visible.sync="centerDialogVisible" :before-close="handleClose" title="参数编辑">
      <config-edit @close="dialogClose" v-if="centerDialogVisible"  :editId="editId"></config-edit>
    </el-dialog>
  </div>
</template>
<script>
  import {configListRender} from '@/api/configList'
  import configEdit from './edit.vue'
  export default {
    components:{
      configEdit
    },
    data(){
      return {
        tableData:[],
        loading:false,
        centerDialogVisible:false
      }
    },
    created(){
      this.init();
    },
    methods:{
      handleSelectionChange(val){

      },
      dialogClose(){
        this.init();
        this.centerDialogVisible = false;
      },
      handleClose(){
        this.centerDialogVisible = false;
        this.$refs.dialog.close();
      },
      editClick(item){
        this.editId = item.id;
        this.centerDialogVisible = true;
        this.$refs.dialog.open();
      },
      renderListData(){
        configListRender().then(res=>{
          this.tableData = res.data;
        })
      },
      init(){
        this.renderListData();
      }
    }
  }
</script>
<style lang="scss" scoped>
.top_add_config_container{
  margin-bottom:20px;
}
</style>
