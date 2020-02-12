<template>
  <div class="numbox-container">
    <van-stepper v-model="value" @change="countChange" :max="max" :input-width="width||60" :button-size="size||32"/>
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
    },
    props:['max','width','size']
  }
</script>

<style>
 .numbox-container input[type=number]{
   margin-bottom: 0;
 }
</style>