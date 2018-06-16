<template>
  <div class="m-l-50 m-t-30 w-500 app_main_container">
    <el-form ref="form" :model="form" :rules="rules" label-width="110px">
      <el-form-item label="标题" prop="title">
        <el-input v-model.trim="form.title" class="h-40 w-200"></el-input>
      </el-form-item>
      <el-form-item label="绑定权限标识" prop="rule_name">
        <el-input v-model.trim="form.rule_name" class="h-40 fl w-200" :disabled="true"></el-input>
        <el-button class="fl m-l-30" @click="openRule()">查找</el-button>
      </el-form-item>
      <el-form-item label="菜单类型" prop="menu_type">
        <el-radio-group v-model="form.menu_type">
          <el-radio disabled label="1">普通三级菜单</el-radio>
          <el-radio disabled label="2">单页菜单</el-radio>
          <el-radio disabled label="3">外链</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上级菜单" prop="pid">
        <el-select disabled v-model="form.pid" placeholder="请选择活动区域" class="w-200">
          <el-option v-for="(item,index) in options" :key="index" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model.trim="form.url" class="h-40 w-200"></el-input>
      </el-form-item>
      <el-form-item label="模块" prop="module">
        <el-input v-model.trim="form.module" class="h-40 w-200"></el-input>
      </el-form-item>
      <el-form-item label="所属菜单">
        <el-input v-model.trim="form.menu" class="h-40 w-200"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sort" class="h-40 w-200"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="edit('form')" :loading="isLoading">提交</el-button>
        <el-button @click="goback()">返回</el-button>
      </el-form-item>
    </el-form>
    <!--<ruleList ref="ruleList"></ruleList>-->
    <el-dialog ref="dialog" class="dialog-slider" top="0" width="50%" append-to-body :visible.sync="centerDialogVisible" :before-close="handleClose" title="节点列表">
      <ruleList v-if="centerDialogVisible" ref="ruleList" @closeRule="dialogClose"></ruleList>
    </el-dialog>
  </div>
</template>

<script>
  import ruleList from './rule.vue'
  import fromMixin from '@/utils/form_com'
  import {menuSaveData,menuListRender,menuEditRender} from '@/api/menuList'
  
  export default {
    components: {
      ruleList
    },
    mixins: [fromMixin],
    props:[
      'editId'
    ],
    data() {
      return {
        loading: false,
        id: null,
        centerDialogVisible:false,
        isLoading:false,
        form: {
          title: '',
          rule_name: '',
          rule_id: null,
          pid: '',
          menu_type: '',
          url: '',
          module: '',
          menu: '',
          sort: ''
        },
        options: [{ id: 0, title: '无' }],
        rules: {
          title: [
            { required: true, message: '请输入菜单标题' }
          ],
          rule_name: [
            { required: true, message: '请绑定权限标识' }
          ],
          menu_type: [
            { required: true, message: '请选择菜单类型' }
          ],
          module: [
            { required: true, message: '请填写菜单模块' }
          ],
          pid: [
            { type: 'number', required: true, message: '请选择上级菜单' }
          ]
        }
      }
    },
    methods: {
      handleClose(){
        this.centerDialogVisible = false;
        this.$refs.dialog.close();
      },
      dialogClose(data){
        this.centerDialogVisible= false;
          //取回数据
        this.form.rule_name = data.rule_name;
        this.form.rule_id = data.rule_id;
      },
      edit(form) {
        this.$refs.form.validate((pass) => {
          if (pass) {
            this.isLoading = !this.isLoading;
            menuSaveData(this.id,this.form).then(res=>{
              _g.toastMsg('success','编辑成功')
              setTimeout(()=>{
                //this.goback();
                this.$emit('close');
                this.isLoading = !this.isLoading
              },1500)
            })
          }
        })
      },
      openRule() {
        this.centerDialogVisible = true;
        this.$refs.dialog.open()
      },
      goback() {
        router.go(-1)
      },
      getMenus() {
        menuListRender().then(res=>{
          let array = [];
          _(res.data).forEach(res=>{
            if (res.level != 3 && res.menu_type == 1) {
              array.push(res)
            }
          })
          this.options = this.options.concat(array)
        })
      }
    },
    created() {
      this.getMenus();
      this.id = this.editId;
      menuEditRender(this.id).then(res=>{
        res.data.menu_type = res.data.menu_type.toString();
        this.form = res.data;
      })
    },
  }
</script>
