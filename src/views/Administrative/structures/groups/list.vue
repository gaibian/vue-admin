<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="top_add_container" ref="topAdd">
      <router-link class="btn-link-large add-btn" to="add">
        <el-button icon="el-icon-plus" type="primary" class="add_btn">添加用户组</el-button>
      </router-link>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="selectItem">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        label="组名"
        prop="title">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="remark">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status"
        width="100">
        <template slot-scope="scope">
          <div>
            {{ scope.row.status | status }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <div>
  					<span>
  						  <el-button type="primary" @click="editClick(scope.row)" size="mini">编辑</el-button>
  					</span>
            <span>
  						<el-button
                size="mini"
                type="danger"
                @click="confirmDelete(scope.row)">
  						删除
  						</el-button>
  					</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog ref="dialog" top="0" width="70%" class="dialog-slider" :visible.sync="centerDialogVisible" :before-close="handleClose" title="用户组编辑">
      <groups-edit @close="dialogClose" v-if="centerDialogVisible"  :editId="editId"></groups-edit>
    </el-dialog>
    <div ref="btmGroup" style="height:70px;">
      <el-row class="pos_rel" style="height:70px;" type="flex" align="middle" justify="space-between">
        <btnGroup @change="refresh" :selectedData="multipleSelection" :type="'groups'"></btnGroup>
        <div class="block pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[10, 200, 300, 400]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="20">
          </el-pagination>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
  import btnGroup from '@/components/btnGroup/index.vue'
  import {groupsListDelete,groupsListRender} from '@/api/groupsList'
  import groupsEdit from './edit.vue'
  export default {
    name:'groupsList',
    components: {
      btnGroup,
      groupsEdit
    },
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        centerDialogVisible:false,
      }
    },
    methods: {
      init(){
        this.getgroups();
      },
      editClick(item){
        this.editId = item.id;
        this.centerDialogVisible = true;
        this.$refs.dialog.open();
      },
      dialogClose(){
        this.centerDialogVisible = false;
        this.init();
      },
      handleClose(){
        this.centerDialogVisible = false;
        this.$refs.dialog.close();
      },
      handleSizeChange(val) {
     
      },
      handleCurrentChange(page) {
        router.push({path:this.$route.path,query:{keywords:this.keywords,page:page}})
      },
      selectItem(val) {
        this.multipleSelection = val;
      },
      confirmDelete(item) {
        this.$confirm('确认删除该用户组?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading()
          groupsListDelete(item.id).then(res=>{
            _g.closeGlobalLoading()
            _g.toastMsg('success', '删除成功')
            setTimeout(() => {
              _g.shallowRefresh(this.$route.name)
            }, 1500)
          })
        }).catch(() => {

        })
      },
      getgroups() {
        groupsListRender().then(res=>{
          this.tableData = res.data
        })
      }
    },
    created() {
      this.init();
    },
    computed: {
      addShow() {
        return _g.getHasRule('groups-save')
      },
      editShow() {
        return _g.getHasRule('groups-update')
      },
      deleteShow() {
        return _g.getHasRule('groups-delete')
      }
    },
  }
</script>
<style lang="scss" scoped>
  .pos_rel{
    position: relative;
  }
</style>
