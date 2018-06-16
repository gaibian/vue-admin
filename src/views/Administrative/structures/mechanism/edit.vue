<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="公司名称" prop="name">
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
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { mechanismListRender,getMechanismData,addMechanismData,editMechanismSave,areaListRender } from '@/api/mechanism'
export default {
  name:'companyEdit',
  props:[
    'editId'
  ],
  data(){
    return {
      id:null,
      ruleForm:{
        name:'',
        super:[],
        area:'',
      },
      options:[
        {
          label:'顶级机构',
          id:0,
          children:[],
        }
      ],
      props: {
        value: 'id'
      },
      areaList:[],
      superCompany:null,
      rules:{
        name:[
          {required:true,message:'请输入机构名称',trigger:'blur'}
        ],
        super:[
          {required:true,message:'请选择上级机构',trigger:'change'}
        ],
        area:[
          {required:true,message:'请选择地区',trigger:'change'}
        ]
      }
    }
  },
  created(){
    this.id = this.editId;
    (async ()=>{
      let res = await mechanismListRender();
      this.options[0].children = res.data;
      let res1 = await getMechanismData(this.id);
      this.ruleForm.name = res1.data.name;
      this.ruleForm.super = res1.data.pids.reverse()
      console.log(this.ruleForm);
      this.ruleForm.area = res1.data.area_id;
    })()
    areaListRender(0).then(res=>{
      this.areaList = res.data.list;
    });
  },
  methods:{
    submitForm(){
      this.$refs.ruleForm.validate(pass=>{
        if(pass){
          let data = {
            name:this.ruleForm.name,
            pid:Number(this.ruleForm.super),
            area_id:Number(this.ruleForm.area)
          };
          editMechanismSave(this.id,data).then(res=>{
            console.log(res);
            this.$emit('close');
          });
        }
      })
    },
    handleSelectChange(){
    
    }
  },
}
</script>
<style lang="scss" scoped>

</style>
