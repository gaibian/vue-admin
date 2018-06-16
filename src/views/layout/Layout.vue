<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar ref="navBar"></navbar>
      <tags-view ref="tagsView"></tags-view>
      <div :style="appMainHeight">
        <app-main ref="appMain" :autoMainHeight="appMainHeight"></app-main>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import TagsView from './components/TagsView.vue'
import { constantRouterMap } from '@/router'
export default {
  name: 'layout',
  data(){
    return {
      fullHeight:document.documentElement.clientHeight,
      appMainHeight:0
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    autoHeight(){
      return `height:${this.appMainHeight}px`
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.handleResize);
  },
  mounted(){

  },
  created(){
    let height = 50 + 34;
    this.appMainHeight = `height:${this.fullHeight - height}px`;
    window.addEventListener('resize',this.handleResize)
    //刷新的时候重新获取用户信息存到vuex
    let userInfo = Lockr.get('userInfo');
    this.$store.dispatch('setInfo',userInfo);
    
    let newRouterMenu = [];
    let newChildRouterMenu = [];
    //这里 获取 router树
    let routerMenu = constantRouterMap;
    let menusList = Lockr.get('menus')[0].child;
    for(let i of constantRouterMap){
      if(i.type === 'common'){
        newRouterMenu.push(i);
      }
    }
    for(let value of menusList){
      let name = value.name;
      for(let k of constantRouterMap){
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
  
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    handleResize(event){
      this.fullHeight = document.documentElement.clientHeight;
      let height = 50 + 34;
      this.appMainHeight = `height:${this.fullHeight - height}px`;
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .main-container{
  
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
