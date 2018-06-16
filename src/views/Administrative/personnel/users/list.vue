<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="top_add_user_container" ref="topAdd">
        <router-link to="add">
          <el-button type="primary" class="add_btn" icon="el-icon-plus">
            添加代理人
          </el-button>
        </router-link>
        <el-input placeholder="请输入用户名" v-model="keywords" style="width:200px;margin-left:12px">
          <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
        </el-input>
    </div>
    <el-table
      class="users_list_table"
    :data="tableData"
      border
      :max-height="tableHeight"
      v-loading="loading"
    style="width:100%"
    @selection-change="selectItem">
      <el-table-column
      type="selection"
      fixed="left"
      width="50"
      ></el-table-column>
      <el-table-column
        label="用户名"
        prop="username"
        width="200">
      </el-table-column>
      <el-table-column label="工号" prop="employee_number"></el-table-column>
      <el-table-column label="上级">
        <template slot-scope="scope">
          <div>{{ scope.row.p_name | null }}</div>
        </template>
      </el-table-column>
      <el-table-column label="机构" prop="org_name"></el-table-column>
      <el-table-column
        label="备注"
        prop="remark"
        width="200">
      </el-table-column>
      <el-table-column
        label="状态"
        width="50">
        <template slot-scope="scope">
          <div>
            {{ scope.row.status | status }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="148">
        <template slot-scope="scope">
          <div>
            {{ scope.row.create_time | timestampToTime }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="226">
        <template slot-scope="scope">
          <div class="pos_rel">
            <span>
                <el-button type="primary" size="mini" @click="editClick(scope.row)">编辑</el-button>
            </span>
            <span>
              <router-link :to="{name:'relationUserList',params:{id:scope.row.id}}">
                <el-button size="mini" type="primary">查看关联</el-button>
              </router-link>
            </span>
            <span>
              <el-button size="mini" type="danger" @click="confirmDelete(scope.row)">删除</el-button>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    
    <el-dialog ref="dialog" top="0" width="400px" class="dialog-slider" :visible.sync="centerDialogVisible" :before-close="handleClose" title="账户编辑">
      <users-edit @close="dialogClose" v-if="centerDialogVisible"  :editId="editId"></users-edit>
    </el-dialog>
    <div ref="btmGroup" style="height:70px;">
      <el-row class="pos_rel" style="height:70px;" type="flex" align="middle" justify="space-between">
        <btnGroup @change="refresh" :selectedData="multipleSelection" :type="'users'"></btnGroup>
        <div class="block pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataCount">
          </el-pagination>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
  import btnGroup from '@/components/btnGroup/index.vue'
  import request from '@/utils/request'
  import resize from '@/utils/page-mixins'
  import { usersList,usersListDelete,pageData } from '@/api/usersList'
  import usersEdit from './edit.vue'
export default {
  name:'usersList',
  mixins:[resize],
  data(){
    return {
      tableData: [],
      dataCount: null,
      currentPage: null,
      keywords: '',
      multipleSelection: [],
      limit: 5,
      currentPage1: 1,
      loading:true,
      centerDialogVisible:false,
      tableHeight:null
    }
  },
  inject:['reload'],
  created(){
    this.init();
  },
  components:{
    btnGroup,
    usersEdit
  },
  methods:{
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
    handleSizeChange(val) {
      this.limit = val;
      this.getAllUsers();
    },
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      router.push({path:this.$route.path,query:{keywords:this.keywords,page:page}})
    },
    search(){
      router.push({ path: this.$route.path, query: { keywords: this.keywords, page: 1 }})
    },
    selectItem(val){
      this.multipleSelection = val;
    },
    confirmDelete(item) {
      this.$confirm('确认删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _g.openGlobalLoading();
        usersListDelete(item.id).then(res=>{
          _g.closeGlobalLoading()
          _g.toastMsg('success','删除成功');
          setTimeout(()=>{
            this.refresh()
          })
        })
      }).catch(() => {

      })
    },
    getAllUsers() {
      this.loading = true;
      const data = {
        params: {
          keywords: this.keywords,
          page: this.currentPage,
          limit: this.limit
        }
      };
      (async ()=>{
        let res = await usersList(data);
        this.tableData = res.data.list;
        this.dataCount = res.data.dataCount;
        this.loading = !this.loading;
      })()
    },
    getCurrentPage() {
      let data = this.$route.query
      if (data) {
        if (data.page) {
          this.currentPage = parseInt(data.page)
        } else {
          this.currentPage = 1
        }
      }
    },
    getKeywords() {
      let data = this.$route.query;
      if (data) {
        if (data.keywords) {
          this.keywords = data.keywords
        } else {
          this.keywords = ''
        }
      }
    },
    usersPageData(){
      let data = {
        params:{
          keywords:this.keywords,
          page:this.currentPage,
          limit:this.limit
        }
      };
      pageData(data).then(res=>{
        this.tableData = res.data.list;
        this.dataCount = res.data.dataCount;
      })
    },
    init() {
      this.getKeywords();
      this.getCurrentPage();
      this.getAllUsers();
      this.usersPageData();
    }
  },
  computed:{  //控制按钮的权限
    addShow() {
      return _g.getHasRule('users-save')
    },
    editShow() {
      return _g.getHasRule('users-update')
    },
    deleteShow() {
      return _g.getHasRule('users-delete')
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
  .top_add_user_container{
    margin-bottom:20px;
  }
  .pos_rel{
    position: relative;
  }
</style>
