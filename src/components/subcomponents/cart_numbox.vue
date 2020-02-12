<template>
  <div class="numbox-container">
    <van-stepper v-model="value" @change="countChange" :max="max" :input-width="width||60" :button-size="size||32"/>
  </div>
</template>

<script>
  export default {
    name: "goodsinfo_numbox",
    data() {
      return {
        value: this.initcount
      }
    },
    methods: {
      countChange() {
        this.$store.commit('updateGoodsInfo', {id: this.goodsid, count: this.value})
      }
    },
    props: ['max', 'width', 'size', 'initcount', 'goodsid']
  }
</script>

<style>
  .numbox-container input[type=number] {
    margin-bottom: 0;
  }
</style>