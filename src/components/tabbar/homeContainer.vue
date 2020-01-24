<template>
  <div>
    <!--轮播图-->
    <div class="swipe-container">
      <mt-swipe :auto="auto">
        <mt-swipe-item v-for="item in swipeList" :key="item.key">
          <img :src="item.url" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--九宫格-->

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../img/menu1.png">
        <div>新闻资讯</div>
      </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../img/menu2.png">
        <div class="mui-media-body">图片分享</div>
      </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../img/menu3.png">
        <div class="mui-media-body">留言反馈</div>
      </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../img/menu4.png">
        <div class="mui-media-body">视频专区</div>
      </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../img/menu5.png">
        <div class="mui-media-body">联系我们</div>
      </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../img/menu6.png" alt="error">
        <div class="mui-media-body">留言反馈</div>
      </a></li>
    </ul>

  </div>
</template>

<script>
    import {Toast} from 'mint-ui'

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
                for (let i = 0; i < 2; i++) {
                    this.swipeList.push({
                        key: i,
                        url: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture'
                    })
                }
            }
        }
    }
</script>

<style scoped>
  .swipe-container {
    height: 200px;
  }

  .swipe-container img {
    width: 100%;
    height: 100%;
  }

  .mui-grid-view.mui-grid-9 .mui-media img{
    width: 60px;
    height: 60px;
  }

</style>