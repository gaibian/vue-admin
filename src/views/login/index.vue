<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="password"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          Sign in
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: admin</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import  Subscribe  from '@/utils/Subscribe'
import http from '@/utils/http'
import Layout from '@/views/layout/Layout'
import request from '@/utils/request'
import { constantRouterMap } from '@/router'
export default {
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message:'请输入正确的用户名'/*validator: validateUsername*/ }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      menusList:null
    }
  },
  created(){
    this.handleMenus();
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleMenus(){
    },
    handleLogin() {
      //登录进行前端表单验证
      this.$refs.loginForm.validate(valid => {
        if (valid) { //通过前端验证
          this.loading = true
          let data = {};
          data.username = this.loginForm.username;
          data.password = this.loginForm.password;
//          this.$store.dispatch('Login', this.loginForm).then(() => {
//            this.loading = false
//            this.$router.push({ path: '/' })
//            Subscribe.emit('talk','这是传给router的数据');
//          }).catch(() => {
//            this.loading = false
//          })
          //测试axios的拦截
          axios.post('http://js.upingou.com/admin/base/login',data).then(res=>{
            console.log(res);
            _(res.data.data.menusList).forEach((value,key)=>{
              if(key == 0){
                value.selected = true;
              }else{
                value.selected = false;
              }
            });
            //把数据存入浏览器的localStorage
            Lockr.set('menus', res.data.data.menusList);        // 菜单数据
            Lockr.set('authKey', res.data.data.authKey);           // 权限认证
            Lockr.set('rememberKey', res.data.data.rememberKey);      // 记住密码的加密字符串
            Lockr.set('authList', res.data.data.authList);            // 权限节点列表
            Lockr.set('userInfo', res.data.data.userInfo);            // 用户信息
            Lockr.set('sessionId', res.data.data.sessionId);          // 用户sessionid
            window.axios.defaults.headers.authKey = Lockr.get('authKey');
            this.$store.dispatch('setAuthKey',res.data.data.authKey).then(()=>{
              this.loading = !this.loading;
              let routerUrl = '/home';
              setTimeout(()=>{
                let path = this.$route.path;
                if(routerUrl !== path){
                  router.replace(routerUrl);
                }else{
                  _g.shallowRefresh(this.$route.name)
                }
              })
              let newRouterMenu = [];
              let newChildRouterMenu = [];
              //这里 获取 router树
              let routerMenu = constantRouterMap;

              //这里 获取 登录后的权限数据
              let menusList = res.data.data.menusList[0].child;
              //加载静态路由
              for(let i of routerMenu){
                if(i.type === 'common'){
                  newRouterMenu.push(i);
                }
              }
              for(let value of menusList){
                let name = value.name;
                for(let k of routerMenu){
                  if(name === k.name){
                    //加载动态路由 往下匹配子路由path
                    newChildRouterMenu.push(k);
                  }
                }
              }
              //过滤自路由
              let newChildArr = [];
              for(let i=0;i<menusList.length;i++){
                let childRouter = menusList[i].child;
                let newArr = [];
                for(let k=0;k<childRouter.length;k++){
                  let url = childRouter[k].url.replace('/home/','');
                  let newChildArr = newChildRouterMenu[i].children;
                  for(let m =0; m<newChildArr.length;m++){
                    if(url === newChildArr[m].path){
                      newArr.push(newChildArr[m]);
                    }
                  }
                }
                newChildArr.push(newArr);
              }
              for(let i=0;i<newChildRouterMenu.length;i++){
                newChildRouterMenu[i].children = [];
                newChildRouterMenu[i].children = newChildArr[i];
              }
              //这里过滤
              this.$store.dispatch('setMenus',newRouterMenu.concat(newChildRouterMenu));//这里放过滤后的数据
            })
            this.$store.dispatch('setInfo',res.data.data.userInfo);
          });
        } else {
          console.log('error submit!! 前端验证失败');
          return false
        }
      })
    }
  },
  computed:{
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
  },
  mixins: [http]
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
