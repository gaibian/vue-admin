<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="top_add_container" ref="topAdd">
    </div>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      :max-height="tableHeight"
      style="width:100%">
      <el-table-column label="机构名称" prop="name"></el-table-column>
      <el-table-column label="车险返佣" prop="car_insure_rate"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div>{{ scope.row.status | status }}</div>
        </template>
      </el-table-column>
      <el-table-column label="添加时间">
        <template slot-scope="scope">
          <div>{{ scope.row.add_time | timestampToTime }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
       
            <el-button type="primary" size="mini" @click="editClick(scope.row)">设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog ref="dialog" top="0" width="400px" class="dialog-slider" :visible.sync="centerDialogVisible" :before-close="handleClose" title="机构佣金设置">
      <commission-edit @close="dialogClose" v-if="centerDialogVisible"  :editId="editId"></commission-edit>
    </el-dialog>
    <div ref="btmGroup" style="height:70px;">
      <el-row class="pos_rel" style="height:70px" type="flex" align="middle" justify="space-between">
      </el-row>
    </div>
  </div>
</template>
<script>
  import btnGroup from '@/components/btnGroup/index'
  import { commissionListRender } from '@/api/mechanism'
  import resize from '@/utils/page-mixins'
  import commissionEdit from './edit.vue'
  export default {
    name:'mechanismList',
    mixins:[resize],
    components:{
      btnGroup,
      commissionEdit
    },
    data(){
      return {
        tableData:[],
        loading:false,
        tableHeight:null,
        centerDialogVisible:false,
      }
    },
    created(){
      this.init();
    },
    methods:{
      init(){
        commissionListRender().then(res=>{
          this.tableData = res.data.list;
        })
      },
      dialogClose(){
        this.centerDialogVisible = false;
        this.init();
      },
      editClick(item){
        this.editId = item.id;
        this.centerDialogVisible = true;
        this.$refs.dialog.open();
      },
      handleClose(){
        this.centerDialogVisible = false;
        this.$refs.dialog.close();
      },
    }
  }
</script>
<style lang="scss" scoped>

</style>
