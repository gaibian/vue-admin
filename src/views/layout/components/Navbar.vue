<template>
  <el-menu class="navbar" mode="horizontal">
    <el-row type="flex" align="middle" justify="space-between" style="height:50px;">
      <el-col style="height:100%">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <breadcrumb></breadcrumb>
      </el-col>
      <el-col style="height:100%">
        <el-row type="flex" justify="end" align="middle" style="height:50px;">
            <news-admin class="right-menu-item" :newsCount="12"></news-admin>
            <el-dropdown class="avatar-container right-menu-item" trigger="click">
              <div class="avatar-wrapper flex-box">
                <div class="admin-header-img">
                  <img class="user-avatar" :src="adminImg">
                </div>
                <div class="admin-name">{{name}}<i class="el-icon-arrow-down"></i></div>
              </div>
              <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <el-dropdown-item divided>
                  <span @click="logout" style="display:block;">LogOut</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import newsAdmin from '@/components/newsAdmin'
import adminHeaderImg from '@/assets/images/admin_logo.jpg'
import { loginOut } from '@/api/login'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    newsAdmin
  },
  data(){
    return {
      adminImg:adminHeaderImg
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  created(){

  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      //退出登入 删除浏览器上的数据
      this.$confirm('确认退出吗?','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消'
      }).then(()=>{
        _g.openGlobalLoading();
        let data = {
          authkey: Lockr.get('authKey'),
          sessionId: Lockr.get('sessionId')
        };
        loginOut(data).then(res=>{
          _g.closeGlobalLoading();
          Lockr.rm('menus');
          Lockr.rm('authKey');
          Lockr.rm('rememberKey');
          Lockr.rm('authList');
          Lockr.rm('userInfo');
          Lockr.rm('sessionId');
          _g.toastMsg('success', '退出成功');
          setTimeout(()=>{
            this.$router.push({path:'/login'})
          },2000);
        })
      });
//      this.$store.dispatch('LogOut').then(() => {
//        //location.reload() // 为了重新实例化vue-router对象 避免bug 强制刷新页面
//      })
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    display: inline-block;
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      height:36px;
      align-items:center;
      .admin-header-img{
        width:36px;
        height:36px;
        border-radius:50%;
        overflow:hidden;
      }
      .admin-name{
        margin-left:6px;
      }
      .user-avatar {
        width:100%;
        height:100%;
        border-radius: 10px;
      }
      .el-icon-arrow-down {
        font-size: 14px;
        color:#999;
        margin-left:4px;
      }
    }
  }
  .item {
    position: absolute;
    right:60px;
    margin-top: 10px;
    margin-right: 40px;
    line-height:normal;
    .xx_icon{
      font-size:22px;
    }
  }
}
.right-menu-item{
  margin-right:30px;
}
</style>

