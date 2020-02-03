<template>
  <div class="container">
    <van-stepper v-model="value" input-width="40px" button-size="32px"/>
  </div>
</template>

<script>
  export default {
    name: "goodsinfo_numbox",
    data(){
      return{
        value:1
      }
    }
  }
</script>

<style scoped>

</style>