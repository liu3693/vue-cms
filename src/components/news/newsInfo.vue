<template>
  <div class="newsinfo-container">
    <h3 class="title">{{newsInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{newsInfo.add_time|dataFormat}}</span>
      <span>点击：{{newsInfo.click}}</span>
    </p>
    <hr>
    <div class="content"><p v-html="newsInfo.content"></p></div>
    <comment :id="this.id"></comment>
  </div>
</template>

<script>
  import comment from "../subcomponents/comment.vue";

  export default {
    name: "newsInfo",
    data() {
      return {
        id: this.$route.params.id, // 从url中传过来的参数：
        // 1.使用 : 传参，通过this.$route.params得到；2.使用 ? 传参，通过this.$route.query得到
        newsInfo: {}
      }
    },
    created() {
      this.getNewsInfo()
    },
    methods: {
      getNewsInfo() {
        this.axios.get('/api/getnew/' + this.id).then(res => {
          //console.log(res.data.message)
          if (res.data.status === 0) {
            this.newsInfo = res.data.message[0]
          }
        })
      }
    },
    components: {
      comment
    }

  }
</script>

<style lang="scss" scoped>
  .newsinfo-container {
    padding: 0 4px;

    .title {
      font-size: 16px;
      text-align: center;
      margin: 10px 0;
      color: red;
    }

    .subtitle {
      font-size: 13px;
      color: deepskyblue;
      display: flex;
      justify-content: space-between;
    }

    .content {
    }
  }
</style>