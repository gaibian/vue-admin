<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
      <el-form-item label="车险返佣比例" prop="ratio">
        <el-input v-model.trim="form.ratio"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()" :loading="isLoading">提交</el-button>
        <el-button @click="closeEdit()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { editCommissionSave,getCommissionData } from '@/api/mechanism'
  export default {
    props:[
      'editId'
    ],
    name:'commissionEdit',
    data(){
      return {
        form: {
          ratio: '',
        },
        id:null,
        isLoading:false,
        rules: {
          ratio: [
            {required: true, message: '请输入车险返佣比例',trigger:'blur'}
          ],
        }
      }
    },
    created(){
      this.id = this.editId;
      getCommissionData(this.id).then(res=>{
        this.form.name = res.data.name;
        this.form.ratio = res.data.car_insure_rate;
      })
    },
    methods:{
      submit(){
        this.$refs.form.validate(pass=>{
          if(pass){
            let data = {
              organization_id:this.id,
              car_insure_rate:this.form.ratio
            };
            editCommissionSave(data).then(res=>{
              this.isLoading = !this.isLoading;
              this.$emit('close');
            })
          }
        })
      },
      closeEdit(){
        this.$emit('close');
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
