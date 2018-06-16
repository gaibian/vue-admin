<template>
  <div class="app_main_container w-500">
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
      <el-form-item label="参数值" prop="value">
        <el-input v-model.trim="form.value"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model.trim="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { parameterSave } from '@/api/parameterList'
  export default {
    data(){
      return {
        form:{
          value:'',
          description:''
        },
        id:null,
        rules: {
          value: [
            {
              require: true, message: '请输入参数值'
            }
          ],
          description:[
            {
              require: true, message: '请输入描述内容'
            }
          ]
        }
      }
    },
    created(){
      this.id = this.$route.params.id;
    },
    methods:{
      add(){
        this.$refs.form.validate(pass=>{
          if(pass){
            this.isLoading = !this.isLoading;
            let data = {
              parameter_id:this.id,
              value:this.form.value,
              description:this.form.description
            };
            parameterSave(data).then(res=>{
              _g.toastMsg('success','提交成功');
              console.log(res);
              setTimeout(()=>{
                this.goback();
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
