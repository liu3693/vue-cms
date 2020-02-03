<template>
  <div class="goods-list">
    <!--在网页中有两种跳转方式：-->
    <!--方式1 使用a标签，标签跳转-->
    <!--方式2 使用 window.location.href 的形式，编程式导航-->
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt="">
      <h1>{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="new">{{item.sell_price}}</span>
          <span class="old">{{item.market_price}}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

<!--    加载更多-->
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
  export default {
    name: "goodList",
    data() {
      return {
        pageIndex: 1,
        goodsList: []
      }
    },
    created() {
      this.getGoodsList()
    },
    methods: {
      getGoodsList() {
        // 获取商品列表
        this.axios.get('api/getgoods?pageindex' + this.pageIndex).then(res => {
          if (res.data.status === 0) {
            this.goodsList = this.goodsList.concat(res.data.message);
          }
        })
      },
      getMore(){
        this.pageIndex++;
        this.getGoodsList()
      },
      goDetail(id){
        // this.$route 是路由参数对象，所有路由中的参数，params，query 都属于它
        // this.$router 是路由导航对象，用它实现路由前进 后退 跳转

        // 编程式导航四种方式：
        // 1. this.$router.push("/home/goodsInfo/:id")

        // 2. 传递命名的路由，在router.js中命名
        this.$router.push({name:'goodsinfo',params:{id}})

        // 3，4 详细参考 vue-router 中的编程式导航
      }
    }
  }
</script>

<style lang="scss" scoped>
  .goods-list {
    padding: 10px 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .goods-item {
      width: 49%;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #ccc;
      margin: 4px 0;
      padding: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 293px;

      img {
        width: 100%;
      }

      h1 {
        font-size: 14px;
      }

      .info {
        background-color: #ddd;

        p {
          margin: 0;
          padding: 5px;
        }

        .price {
          .new {
            color: red;
            font-weight: bold;
            font-size: 16px;
          }

          .old {
            text-decoration: line-through;
            font-size: 12px;
            margin-left: 10px;
          }
        }

        .sell {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }
      }
    }
  }

</style>