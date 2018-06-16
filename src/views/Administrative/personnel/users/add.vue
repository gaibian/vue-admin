<template>
  <div class="m-l-50 m-t-30 w-800 app_main_container">
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="form.username" class="h-40 w-200" :maxlength=12></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="form.password" class="h-40 w-200"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model.trim="form.realname" class="h-40 w-200"></el-input>
      </el-form-item>
      <!--<el-form-item label="部门" prop="structure_id">-->
        <!--<el-select v-model="form.structure_id" placeholder="请选择部门" class="w-200">-->
          <!--<el-option v-for="(item,index) in orgsOptions" :key="index" :label="item.title" :value="item.id"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item label="上级" prop="pid">
        <el-select v-model="form.pid" placeholder="请选择上级">
          <el-option v-for="(item,index) in pidOptions" :key="index" :label="item.username" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机构" prop="organization_id">
        <el-select v-model="form.organization_id" placeholder="请选择机构">
          <el-option v-for="(item,index) in orgsOptions" :key="index" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="employee_number">
        <el-input v-model.trim="form.employee_number"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model.trim="form.remark" class="h-40 w-200"></el-input>
      </el-form-item>
      <el-form-item label="用户组" prop="groups">
        <el-checkbox-group v-model="selectedGroups">
          <el-checkbox v-for="(item,index) in groupOptions" :key="index" :label="item.title" class="form-checkbox"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add('form')" :loading="isLoading">提交</el-button>
        <el-button @click="goback()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import formMixin from '@/utils/form_com'
import {addUser,groupsData,usersList,structuresData} from '@/api/usersList'
import { mechanismListRender } from '@/api/mechanism'
  export default {
    name:'usersAdd',
    mixins: [formMixin],
    data(){
      return {
        isLoading: false,
        form: {
          username: '',
          password: '',
          realname: '',
          structure_id: null,
          remark: '',
          groups: [],
          pid:null,
          employee_number:'',
          organization_id:null,
        },
        pidOptions: [
          {
            username:'无',
            id:0
          }
        ],
        orgsOptions:[],
        groupOptions: [],
        selectedGroups: [],
        selectedIds: [],
        rules: {
          username: [
            { required: true, message: '请输入用户名' }
          ],
          password: [
            { required: true, message: '请输入用户密码' }
          ],
          realname: [
            { required: true, message: '请输入真实姓名' }
          ],
          pid:[
            { required: true, message: '请选择上级', trigger: 'change' }
          ],
          organization_id:[
            { required: true, message: '请选择上级', trigger: 'change' }
          ],
          employee_number: [
            { required: true, message: '请输入工号' }
          ],
//          structure_id: [
//            { required: true, message: '请选择用户部门' }
//          ]
        }
      }
    },
    methods:{
      selectCheckbox(){
        let temp = false
        _(this.groupOptions).forEach((res) => {
          if (this.selectedGroups.toString().indexOf(res.title) > -1) {
            this.selectedIds.push(res.id)
          }
        })
        if (this.selectedIds.length) {
          this.form.groups = _.cloneDeep(this.selectedIds)
          temp = true
        }
        this.selectedIds = []
        return temp
      },
      add(form){
        if(!this.selectCheckbox()){
          _g.toastMsg('warning','请选择用户组');
          return false;
        }
        //进行前端的验证
        this.$refs.form.validate(pass=>{
          if(pass){
            this.isLoading = !this.isLoading;
            console.log(this.form);
            addUser(this.form).then(res=>{
              _g.toastMsg('success','添加成功');
              _g.clearVuex('setUsers');
              setTimeout(()=>{
                  this.goback();
                  this.isLoading = !this.isLoading;
                },1500);
            })
          }
        })
      },
      getAllGroups() {
        groupsData().then(res=>{
          this.groupOptions = res.data;
        })
      },
      getUserList(){
        usersList().then(res=>{
          this.pidOptions = this.pidOptions.concat(res.data.list)
          console.log(this.pidOptions);
        })
      },
      getMechanismList(){
        mechanismListRender().then(res=>{
          this.orgsOptions = res.data;
        })
      }
    },
    created(){
      this.getUserList();
      this.getAllGroups();
      this.getMechanismList();
      //this.getAllOrgs();
    },
  }
</script>
<style lang="scss" scoped>
  .form-checkbox:first-child{
    margin-left: 15px;
  }
</style>
