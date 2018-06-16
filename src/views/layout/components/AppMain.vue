<template>
  <div class="app-main" style="'height:' + autoMainHeight">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <keep-alive include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
  name: 'AppMain',
  props:[
    'autoMainHeight'
  ],
  data(){
    return {
      isRouterAlive:true
    }
  },
  created(){
    console.log(this.$router);
    //console.log(this.appMainHeight);
  },
  mounted(){
  
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(()=>{
        this.isRouterAlive = true;
      })
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
  },
}
</script>
<style>
  .app-main{
    width:100%;
    height:100%;
    overflow:hidden;
    display:flex;
    flex-direction: column;
  }
</style>
