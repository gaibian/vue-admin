<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="m-b-20 top_add_menu_container" ref="topAdd">
        <router-link class="btn-link-large add-btn" to="add">
          <el-button type="primary" icon="el-icon-plus">添加菜单</el-button>
        </router-link>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;"
      border
      :max-height="tableHeight"
      v-loading="loading"
      @selection-change="selectItem">
      <el-table-column
        type="selection"
        :context="_self"
        width="50">
      </el-table-column>
      <el-table-column
        prop="p_title"
        label="上级菜单"
        width="150">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        label="状态"
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
              <el-button type="primary" @click="clickEdit(scope.row)" size="mini">编辑</el-button>
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
    <el-dialog ref="dialog" top="0" width="520px" class="dialog-slider" lock-scroll :visible.sync="centerDialogVisible" :before-close="handleClose" title="菜单编辑">
      <menu-edit @close="dialogClose" v-if="centerDialogVisible"  :editId="editId"></menu-edit>
    </el-dialog>
    <div class="pos-rel p-t-20" ref="btmGroup" style="height:70px;" type="flex" align="middle">
      <el-row type="flex" align="middle" style="height:100%" justify="space-between">
        <btnGroup @change="refresh" :selectedData="multipleSelection" :type="'menus'"></btnGroup>
      </el-row>
    </div>
  </div>
</template>

<script>
  import btnGroup from '@/components/btnGroup/index.vue'
  import resize from '@/utils/page-mixins'
  import request from '@/utils/request'
  import {menuListRender,menuListDelete} from '@/api/menuList'
  import menuEdit from './edit.vue'
  export default {
    mixins: [resize],
    components: {
      btnGroup,
      menuEdit
    },
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        loading:true,
        centerDialogVisible:false,
        tableHeight:null
      }
    },
    methods: {
      init(){
        this.loading = true;
        request.get('admin/menus').then(res=>{
          this.tableData = res.data;
          this.loading = !this.loading;
        })
      },
      dialogClose(){
        this.init();
        this.centerDialogVisible = false;
      },
      handleClose(){
        this.centerDialogVisible = false;
        this.$refs.dialog.close();
      },
      clickEdit(item){
        this.editId = item.id;
        this.centerDialogVisible = true;
        this.$refs.dialog.open();
      },
      selectItem(val) {
        this.multipleSelection = val
      },
      confirmDelete(item) {
        this.$confirm('确认删除该菜单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading()
          menuListDelete(item.id).then(res=>{
            _g.closeGlobalLoading()
            _g.toastMsg('success', '删除成功')
            setTimeout(() => {
              this.refresh();
            }, 1500)
          })
        }).catch(() => {
    
        })
      }
    },
    created() {
      this.init();
    },
    computed: {
      addShow() {
        return _g.getHasRule('menus-save')
      },
      editShow() {
        return _g.getHasRule('menus-update')
      },
      deleteShow() {
        return _g.getHasRule('menus-delete')
      }
    },
  }
</script>
<style lang="scss" scoped>
  .top_add_menu_container{
    margin-bottom:20px;
  }
</style>
