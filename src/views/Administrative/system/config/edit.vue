<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model.trim="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add('form')" :loading="isLoading">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {editConfig,saveConfig} from '@/api/configList'
export default {
  props:[
    'editId'
  ],
  data(){
    return {
      form:{
        name:'',
        description:'',
      },
      id:null,
      rules:{
        name:[
          {require:true,message:'请输入名称'}
        ]
      },
      isLoading:false
    }
  },
  created(){
    this.id = this.editId;
    console.log(editConfig);
    editConfig(this.id).then(res=>{
      console.log(res);
      this.form.name = res.data.name;
      this.form.description = res.data.description;
    })
  },
  methods:{
    add(){
      this.$refs.form.validate(pass=>{
        if(pass){
          this.isLoading = !this.isLoading;
          saveConfig(this.id,this.form).then(res=>{
            _g.toastMsg('success','提交成功');
            setTimeout(()=>{
              this.$emit('close');
            },1500)
            
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
