import { debounce } from '@/utils'
export default {
  install(Vue){
    Vue.mixin({
      methods:{
        refresh(){
          if(!this.init){
            console.warn("你这个页面貌似没有init方法");
            return false;
          }
          this.init();
        },
        goback() {
          router.go(-1)
        }
      },
    })
  }
}
