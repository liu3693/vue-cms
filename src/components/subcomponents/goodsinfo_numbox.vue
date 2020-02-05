<template>
  <div class="numbox-container">
    <van-stepper v-model="value" @change="countChange" input-width="40px" button-size="32px"/>
  </div>
</template>

<script>
  export default {
    name: "goodsinfo_numbox",
    data(){
      return{
        value:1
      }
    },
    methods:{
      countChange(){
        this.$emit('getcount',parseInt(this.value))
      }
    }
  }
</script>

<style>
 .numbox-container input[type=number]{
   margin-bottom: 0;
 }
</style>