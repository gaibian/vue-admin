import { debounce } from '@/utils'

export default {
  mounted() {
    let valHandle = ()=>{
      let _height = this.$refs.mainContainer.offsetHeight - 30;
      //let _parentHeight = this.$parent.$el.clientHeight;
      let _addHeight = this.$refs.topAdd.offsetHeight + 20;
      let _btmHeight = this.$refs.btmGroup.offsetHeight;
      let _heightVal = _height - (_addHeight + _btmHeight);
      // if(_height < _heightVal + _addHeight + _btmHeight){
      //   return this.tableHeight = _heightVal;
      //   //不设置高度值
      // }else{
      //   return this.tableHeight = null;
      // }
      this.tableHeight = _heightVal;
    };
    valHandle();
    this.__resizeMainHanlder = debounce(() => {
      // let _height = this.$refs.mainContainer.offsetHeight;
      // let _addHeight = this.$refs.topAdd.offsetHeight;
      // let _btmHeight = this.$refs.btmGroup.offsetHeight;
      // this.tableHeight = _height - (_addHeight + _btmHeight);
      valHandle();
    }, 100);
    window.addEventListener('resize', this.__resizeMainHanlder)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeMainHanlder)
  }
}
