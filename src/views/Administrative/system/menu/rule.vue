<template>
 <div>
   <div class="pos-rel h-60">
     <el-input placeholder="请输入内容" v-model="keyword" class="search-btn w-300">
       <el-button slot="append" icon="search" @click="searchMsg()"></el-button>
     </el-input>
   </div>
   <div>
     <el-table
       :data="tableData"
       stripe
       style="width: 100%">
       <el-table-column
         prop="type"
         label="类型"
         width="100">
       </el-table-column>
       <el-table-column
         prop="title"
         label="规则名称">
       </el-table-column>
       <el-table-column
         prop="name"
         label="规则标识"
         width="180">
       </el-table-column>
       <el-table-column
         label="操作"
         width="100">
         <template slot-scope="scope">
           <div>
             <el-button size="small" @click="selectRule(scope.row)">选择</el-button>
           </div>
         </template>
       </el-table-column>
     </el-table>
   </div>
 </div>
</template>
<script>
  import { menuRuleRender } from '@/api/menuList'
  export default {
    props:[
      'flag'
    ],
    data() {
      return {
        keyword: '',
        tableData: [],
        newFlag:false,
      }
    },
    methods: {
      selectRule(item) {
        let data = {
          rule_name : item.title,
          rule_id : item.id,
        };
        this.$emit("closeRule",data);
      },
      getRules() {
        menuRuleRender().then(res=>{
          this.tableDataShow = _(res.data).forEach((ret) => {
            ret.showInput = false
          })
          this.tableData = this.tableDataShow
        })
      }
    },
    created() {
      let data = store.state.rules
      if (data && data.length) {
        this.tableDataShow = _(data).forEach((res) => {
          res.showInput = false
        })
        this.tableData = this.tableDataShow
      } else {
        this.getRules()
      }
    },
  }
</script>
<style lang="scss" scoped>
  .search-btn {
    position: absolute;
    top: 0px;
    right: 0px;
  }
</style>
