<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swipeList" :key="item.id">
        <img :src="item.img" alt="图片失效了" :class="{full:isFull}">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  export default {
    name: "swiper",
    props: ['swipeList', 'isFull']
  }
</script>

<style lang="scss" scoped>
  .my-swipe {
    height: 200px;
    text-align: center;
    background-color: #fff;

    img {
      height: 100%;
    }
  }

  .full {
    width: 100%;
  }
</style>