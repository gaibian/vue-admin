<template>
  <div class="app_main_container w-500">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="机构名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="上级机构" prop="super">
        <el-cascader :options="options" v-model="ruleForm.super"  @change="handleSelectChange" placeholder="请选择上级机构" :props="props"></el-cascader>
      </el-form-item>
      <el-form-item label="请选择地区" prop="area">
        <el-select v-model="ruleForm.area" placeholder="请选择地区">
          <el-option v-for="(item,index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { mechanismListRender,addMechanismData,areaListRender } from '@/api/mechanism'
export default {
  name:'companyAdd',
  data(){
    return {
      ruleForm:{
        name:'',
        area:'',
        super:[],
      },
      options:[
        {
          label:'顶级机构',
          id:0
        }
      ],
      props: {
        value: 'id'
      },
      areaList:[],
      rules:{
        name:[
          {required:true,message:'请输入机构名称',trigger:'blur'}
        ],
        areaList:[
          {required:true,message:'请选择地区',trigger:'change'}
        ],
        superOrignList:[
          {required:true,message:'请选择上级机构',trigger:'change'}
        ]
      }
    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      mechanismListRender().then(res=>{
        this.options = this.options.concat(res.data);
        console.log(this.options);
      });
      areaListRender(0).then(res=>{
        console.log(res);
        this.areaList = res.data.list;
      })
    },
    handleSelectChange(val){

    },
    submitForm(res){
      this.$refs.ruleForm.validate(pass=>{
        if(pass){
          this.isLoading = !this.isLoading;
          let data = {
            name:this.ruleForm.name,
            pid:Number(this.ruleForm.super.pop()),
            area_id:Number(this.ruleForm.area)
          };
          addMechanismData(data).then(res=>{
            setTimeout(()=>{
              this.goback();
              this.isLoading = !this.isLoading;
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
