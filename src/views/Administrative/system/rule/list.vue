<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="top_add_rule_container" ref="topAdd">
      <router-link class="btn-link-large add-btn" to="add">
        <el-button icon="el-icon-plus" type="primary">添加节点</el-button>
      </router-link>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      v-loading="loading"
      :max-height="tableHeight"
      @selection-change="selectItem">
      <el-table-column
        type="selection"
        :context="_self"
        width="50">
      </el-table-column>
      <el-table-column
        prop="p_title"
        label="节点结构"
        width="150">
      </el-table-column>
      <el-table-column
        prop="title"
        label="显示名">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="200">
      </el-table-column>
      <el-table-column
        label="状态"
        width="100">
        <template slot-scope="scope">
          <div>
            {{ scope.row.status | status}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <div>
            <span>
              <router-link :to="{ name: 'ruleEdit', params: { id: scope.row.id }}" class="btn-link edit-btn">
              <el-button size="small" type="primary">编辑</el-button>
              </router-link>
            </span>
            <span>
              <el-button
                size="small"
                type="danger"
                @click="confirmDelete(scope.row)">
              删除
              </el-button>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div ref="btmGroup" style="height:70px;" >
      <el-row class="pos_rel" style="height:70px;" type="flex" align="middle" justify="space-between">
        <btnGroup @change="refresh" :selectedData="multipleSelection" :type="'rules'"></btnGroup>
      </el-row>
    </div>
  </div>
</template>

<script>
  import btnGroup from '@/components/btnGroup/index.vue'
  import resize from '@/utils/page-mixins'
  import {ruleListDelete,ruleListRender} from '@/api/ruleList'
  export default {
    name:'ruleList',
    mixins:[resize],
    components: {
      btnGroup
    },
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        loading:true,
        tableHeight:null
      }
    },
    methods: {
      init(){
        ruleListRender().then(res=>{
          this.tableData = res.data;
          this.loading = !this.loading;
        })
      },
      selectItem(val) {
        this.multipleSelection = val
      },
      confirmDelete(item) {
        this.$confirm('确认删除该权限?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading()
          ruleListDelete(item.id).then(res=>{
            _g.closeGlobalLoading()
            _g.toastMsg('success', '删除成功')
            this.loading = !this.loading
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
        return _g.getHasRule('rules-save')
      },
      editShow() {
        return _g.getHasRule('rules-update')
      },
      deleteShow() {
        return _g.getHasRule('rules-delete')
      }
    },
    watch:{
      '$route'(to,from){
        this.init();
      }
    },
  }
</script>
<style lang="scss" scoped>
  .top_add_rule_container{
    margin-bottom:20px;
  }
  .pos_rel{
    position: relative;
  }
</style>
