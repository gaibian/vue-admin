<template>
  <div class="btn_group_container">
    <el-button :loading="enableLoading" size="small" @click="changeAttrInBtnGroup(1)">启用</el-button>
    <el-button :loading="disableLoading" size="small" @click="changeAttrInBtnGroup(0)">禁用</el-button>
    <el-button :loading="deleteLoading" size="small" @click="deleteDatasInBtnGroup()">删除</el-button>
  </div>
</template>
<script>
  import http from '@/utils/http'
  export default {
    props:[
      'selectedData',
      'type'
    ],
    data(){
      return {
        enableLoading: false,
        disableLoading: false,
        deleteLoading: false
      }
    },
    created(){

    },
    methods:{
      getUrl(){
        return 'admin/' + this.type
      },
      getSelectedIds(){
        let array = [];
        _(this.selectedData).forEach(res=>{
          array.push(res.id);
        });
        return array;
      },
      changeAttrInBtnGroup(cate){
        if(!this.selectedData.length){
          _g.toastMsg('warning','请勾选数据');
          return false;
        }
        let word = '';
        if(cate === 1){
          word = '启用';
          this.enableLoading = !this.enableLoading;
        }else{
          this.disableLoading = !this.disableLoading
          word = '禁用';
        }
        let url = this.getUrl() + '/enables';
        let data = {
          ids : this.getSelectedIds(),
          status : cate
        };
        this.apiPost(url,data).then(res=>{
          this.handelResponse(res,data=>{
            _g.toastMsg('success',`${word}成功`);
            setTimeout(()=>{
              this.$emit("change");
              if(cate === 1){
                this.enableLoading = !this.enableLoading
              }else{
                this.disableLoading = !this.disableLoading
              }
            },1500);
          },()=>{
            console.log('返回数据失败');
            if(cate === 1){
              this.enableLoading = !this.enableLoading
            }else{
              this.disableLoading = !this.disableLoading
            }
          })
        })
        
      },
      deleteDatasInBtnGroup(){  //删除数据按钮
        if(!this.selectedData.length){
          _g.toastMsg('warning','请选勾选数据');
          return false;
        }
        this.deleteLoading = !this.deleteLoading;
        let url = this.getUrl() + '/deletes';
        let data = {
          ids:this.getSelectedIds()
        }
        this.apiPost(url,data).then(res=>{
          this.handelResponse(res,data=>{
            setTimeout(()=>{
              _g.shallowRefresh(this.$route.name)
            },1500)
          },()=>{
            this.deleteLoading = !this.deleteLoading;
          })
        })
      }
    },
    mixins:[http]
  }
</script>
<style>
.btn_group_container{
}
</style>
