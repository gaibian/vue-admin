<template>
  <div class="app_main_container">
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="关联列表" prop="follow_user_id">
        <el-select v-model="form.follow_user_id" placeholder="请选择关联账号">
          <el-option v-for="(item,index) in relationList" :label="item.username" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handelSubmit" :loading="isLoading">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { usersList,addFollowSave } from '@/api/usersList'
  export default {
    data(){
      return {
        form:{
          name:'',
          main_user_id:null,
          follow_user_id:null,
        },
        relationList:[],
        pid:null,
        isLoading:false,
        rules:{
          name:[
            {
              required:true,message:'请填写名称'
            }
          ]
        }
      }
    },
    created(){
      this.form.main_user_id = Number(this.$route.params.pid);
      this.init();
    },
    methods:{
      init(){
        this.getRelationData();
      },
      handelSubmit(){
        this.$refs.form.validate(pass=>{
          if(pass){
            addFollowSave(this.form).then(res=>{
              if(res !== 'error'){
                _g.toastMsg('success','添加成功');
                setTimeout(()=>{
                  this.goback();
                  this.isLoading = !this.isLoading;
                },1500)
              }
            })
          }
        })
      },
      getRelationData(){
        usersList().then(res=>{
          if(res !== 'error'){
            this.relationList = res.data.list;
          }
        })
      }
    }
  }
</script>
<style>

</style>
