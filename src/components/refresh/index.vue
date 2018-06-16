<template>
  <div></div>
</template>
<script>
  export default {
    created() {
      /*进行页面刷新的方法*/
      if (this.$route.query.name) {
        router.replace({ name: this.$route.query.name })
      } else {
        console.log('refresh fail')
      }
    }
  }
</script>
