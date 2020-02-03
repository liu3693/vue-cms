<template>
  <div>
    <div class="photoinfo-container">
      <h3 class="title">{{this.photoInfo.title}}</h3>
      <p class="subtitle">
        <span>发表时间：{{this.photoInfo.add_time|dataFormat}}</span>
        <span>点击：{{this.photoInfo.click}}</span>
      </p>
    </div>
    <hr>
    <!--缩略图-->
    <div>
      <img v-for="(item,index) in list" :key="index" :src="item.src" height="100" alt="" @click="preview(index)">
    </div>
    <!--内容-->
    <div class="photoinfo-content" v-html="this.photoInfo.content"></div>
    <!--评论子组件-->
    <cmt-box :id="this.id"></cmt-box>
  </div>
</template>

<script>
  import comment from "../subcomponents/comment.vue";
  import {ImagePreview} from 'vant'

  export default {
    name: "photoInfo",
    data() {
      return {
        id: this.$route.params.id,
        photoInfo: {},
        list: [] // 缩略图
      }
    },
    created() {
      this.getPhotoInfo();
      this.getThumImages();
    },
    methods: {
      getPhotoInfo() {
        this.axios.get('/api/getimageInfo/' + this.id).then(res => {
          if (res.data.status === 0) {
            this.photoInfo = res.data.message[0]
          }
        })
      },
      getThumImages() {
        this.axios.get('/api/getthumimages/' + this.id).then(res => {
          if (res.data.status === 0) {
            this.list = res.data.message
          }
        })
      },
      preview(index) {
        let list = [];
        this.list.forEach(each=>{
          list.push(each.src)
        });
        ImagePreview({
          images:list,
          startPosition:index
        })
      }
    },
    components: {
      'cmt-box': comment
    },
  }
</script>

<style lang="scss" scoped>
  .photoinfo-container {
    padding: 0 4px;

    .subtitle {
      display: flex;
      justify-content: space-between;
    }

    .title {
      font-size: 16px;
      text-align: center;
      margin: 10px 0;
      color: red;
    }
  }

  .photoinfo-content {
    font-size: 13px;
    line-height: 30px;
  }
</style>