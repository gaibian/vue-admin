<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="top_add_container" ref="topAdd">
      <router-link to="add">
        <el-button type="primary" size="small" class="add_btn" icon="el-icon-plus">添加机构</el-button>
      </router-link>
    </div>
    <tree-table @selectVal="getSelectVal" :data="tableData" :evalFunc="func" :evalArgs="args" :expandAll="expandAll" :max-height="tableHeight" border>
      <el-table-column label="上级机构">
        <template slot-scope="scope">
          <span>{{ scope.row.p_title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="层级" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地区">
        <template slot-scope="scope">
          <span>{{ scope.row.area_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.status | status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间">
        <template slot-scope="scope">
          <span>{{ scope.row.add_time | timestampToTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="pos_rel">
            <span>
              <el-button icon="el-icon-edit" type="primary" size="mini" @click="editClick(scope.row)">编辑</el-button>
            </span>
            <span>
              <el-button type="danger" size="mini" @click="confirmDelete(scope.row)">删除</el-button>
            </span>
          </div>
        </template>
      </el-table-column>
    </tree-table>
    <el-dialog ref="dialog" top="0" width="800px" class="dialog-slider" :visible.sync="centerDialogVisible" :before-close="handleClose" title="机构列表编辑">
      <company-edit @close="dialogClose" v-if="centerDialogVisible"  :editId="editId"></company-edit>
    </el-dialog>
    <div ref="btmGroup" style="height:70px">
      <el-row class="pos_rel" style="height:70px" type="flex" align="middle" justify="space-between">
        <btnGroup @change="refresh" :selectedData="multipleSelection" :type="'organization'"></btnGroup>
      </el-row>
    </div>
  </div>
</template>

<script>
  import btnGroup from '@/components/btnGroup/index'
  import { mechanismListRender,deleteMechanismData } from '@/api/mechanism'
  import resize from '@/utils/page-mixins'
  import companyEdit from './edit.vue'
  import treeTable from '@/components/TreeTable'
  import treeToArray from './customEval'
  let id=1000;
export default {
  name:'companyList',
  mixins:[resize],
  components:{
    btnGroup,
    companyEdit,
    treeTable
  },
  data(){
    return {
      func: treeToArray,
      expandAll: false,
      args: [null, null, 'timeLine'],
      tableData:[],
      loading:true,
      multipleSelection: [],
      centerDialogVisible:false,
      tableHeight:null,
      data5:null,
    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      //渲染数据
      this.loading = true;
      mechanismListRender().then(res=>{
        this.tableData = res.data;
        this.data5 = res.data;
        this.loading = !this.loading;
        console.log(this.tableData);
      })
    },
    getSelectVal(val){
      this.multipleSelection = val;
    },
    append(data){
    
    },
    remove(node,data){
    
    },
    renderContent(h,{node,data,store}){
    
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
    selectItem(val){
      this.multipleSelection = val;
    },
    confirmDelete(item){
      this.$confirm('确认删除该公司?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        deleteMechanismData(item.id).then(res=>{
          _g.toastMsg('success','删除成功');
          setTimeout(()=>{
            this.refresh();
          })
        })
      })
    }
  },
  watch:{
    '$route' (to,from){
      this.init();
    }
  }
}
</script>
<style lang="scss" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
