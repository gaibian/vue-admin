<template>
  <div class="">
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="form.username" class="h-40 w-200" :maxlength=12 :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model.trim="password" class="h-40 w-200"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model.trim="form.realname" class="h-40 w-200"></el-input>
      </el-form-item>
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
      <el-form-item label="备注">
        <el-input v-model.trim="form.remark" class="h-40 w-200"></el-input>
      </el-form-item>
      <!--<el-form-item label="用户组">-->
        <!--<el-checkbox-group v-model="selectedGroups">-->
          <!--<el-checkbox v-for="(item,index) in groupOptions" :key="index" :label="item.else" class="form-checkbox"></el-checkbox>-->
        <!--</el-checkbox-group>-->
      <!--</el-form-item>-->
      <el-form-item label="用户组" prop="groups">
        <el-select v-model="form.groups" multiple>
          <el-option v-for="(item,index) in groupOptions" :key="index" :label="item.else" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add()" :loading="isLoading">提交</el-button>
        <el-button @click="closeEdit()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import fomrMixin from '@/utils/form_com'
  import {usersEditData,structuresData,groupsData,getCompleteData,usersList} from '@/api/usersList'
  import { mechanismListRender } from '@/api/mechanism'
  
  export default {
    name:'usersEdit',
    mixins: [fomrMixin],
    props:[
      'editId'
    ],
    data() {
      return {
        isLoading: false,
        id: null,
        form: {
          username: '',
          realname: '',
          structure_id: null,
          remark: '',
          groups: [],  //用户组传递的值
          organization_id:null,
          pid:null,
          groupId:null,
        },
        pidOptions: [
          {
            username:'无',
            id:0
          }
        ],
        password: '',
        orgsOptions: [],
        groupOptions: [],
        selectedGroups: [],
        selectedIds: [],
        rules: {
          username: [
            { required: true, message: '请输入用户名' }
          ],
          realname: [
            { required: true, message: '请输入真实姓名' }
          ],
          structure_id: [
            { required: true, message: '请选择用户所属组织架构' }
          ],
          pid:[
            { required: true, message: '请选择上级', trigger: 'change' }
          ],
          organization_id:[
            { required: true, message: '请选择上级', trigger: 'change' }
          ],
          groups:[
            {
              required: true, message: '请选择用户组', trigger: 'change'
            }
          ],
        }
      }
    },
    methods: {
//      selectCheckbox() {
//        let temp = false
//        _(this.groupOptions).forEach((res) => {
//          if (this.selectedGroups.toString().indexOf(res.else) > -1) {
//            this.selectedIds.push(res.id)
//          }
//        })
//        if (this.selectedIds.length) {
//          this.form.groups = _.cloneDeep(this.selectedIds)
//          temp = true
//        }
//        this.selectedIds = []
//        return temp
//      },
      add() {
//        if (!this.selectCheckbox()) {
//          _g.toastMsg('warning', '请选择用户组')
//          return
//        }
        //console.log(this.form.groups);
        this.$refs.form.validate((pass) => {
          if (pass) {
            this.isLoading = !this.isLoading
            if (this.password) {
              this.form.password = this.password
            }
            usersEditData(this.id,this.form).then(res=>{
              if(res !== 'error'){
                _g.toastMsg('success', '添加成功')
                _g.clearVuex('setUsers')
                setTimeout(() => {
                  this.$emit('close');
                  //this.goback()
                }, 1500)
              }
            })
          }
        })
      },
      closeEdit(){
        this.$emit('close');
      },
      getAllGroups() {
        return new Promise((resolve, reject) => {
          let data = store.state.userGroups
          if (data && data.length) {
            resolve(data)
          } else {
            groupsData().then(res=>{
              resolve(res.data);
            })
          }
        })
      },
      getMechanismList(){
        mechanismListRender().then(res=>{
          this.orgsOptions = res.data;
        })
      },
      getUserList(){
        usersList().then(res=>{
          this.pidOptions = this.pidOptions.concat(res.data.list)
        })
      },
//      getAllOrgs() {
////        this.apiGet('admin/structures').then((res) => {
////          this.handelResponse(res, (data) => {
////            this.orgsOptions = data
////          })
////        })
//        structuresData().then(res=>{
//          this.orgsOptions = res.data
//        })
//      },
      async getCompleteData() {
        //this.getAllOrgs()
        this.getMechanismList();
        this.getUserList();
        this.groupOptions = await this.getAllGroups()
        getCompleteData(this.id).then(res=>{
          this.form.username = res.data.username
          this.form.realname = res.data.realname
          this.form.structure_id = res.data.structure_id
          this.form.pid = res.data.pid
          this.form.organization_id = res.data.organization_id
          this.form.remark = res.data.remark
          //this.form.groupId = res.data.groups[0].id
          _(res.data.groups).forEach((res1) => {
            _(this.groupOptions).forEach((res2) => {
              if (res1.title == res2.else) {
                this.form.groups.push(res1.id)
              }
            })
          })
        })
      }
    },
    created() {
      this.id = this.editId;
      this.getCompleteData();
    },
  }
</script>
<style lang="scss" scoped>
  .form-checkbox:first-child{
    margin-left: 15px;
  }
</style>
