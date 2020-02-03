<template>
  <div>
    <!--轮播图-->
    <div class="swipe-container">
      <swiper :swipeList="swipeList" :isFull="true"></swiper>
    </div>
    <!--九宫格-->

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../img/menu1.png">
          <div>新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photoList">
          <img src="../../img/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodsList">
          <img src="../../img/menu3.png">
          <div class="mui-media-body">商品详情</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="../../img/menu4.png">
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="../../img/menu5.png">
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="../../img/menu6.png" alt="error">
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import swiper from '../subcomponents/swiper.vue'

  export default {
    name: "homeContainer",
    data: function () {
      return {
        auto: 4000,
        speed: 300,
        swipeList: []
      }
    },
    created() {
      this.getSwipe()
    },
    methods: {
      getSwipe() {
        /*for (let i = 0; i < 2; i++) {
            this.swipeList.push({
                key: i,
                url: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture'
            })*/
        this.axios.get('/api/getlunbo').then(res => {
          // console.log(res)
          if (res.data.status === 0) {
            this.swipeList = res.data.message
          } else {
            Toast('轮播图获取失败')
          }
        })
      }
    },
    components:{
      swiper
    }
  }
</script>

<style scoped>
  .swipe-container {
    height: 200px;
  }


  .mui-grid-view.mui-grid-9 .mui-media img {
    width: 60px;
    height: 60px;
  }

</style>