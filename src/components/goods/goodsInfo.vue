<template>
  <div class="goodsinfo-container">
    <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!--轮播图-->
    <div class="card">
      <swiper :swipeList="list" :isFull="false"></swiper>
    </div>
    <!--商品购买-->
    <div class="card">
      <van-panel :title="goodsinfo.title">
        <div class="goodsinfo-detail">
          <p>
            市场价：
            <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;<span class="new-price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <van-button type="primary" size="small">立即购买</van-button>
            <van-button type="danger" size="small" @click="addToCart">加入购物车</van-button>
          </p>
        </div>
      </van-panel>
    </div>
    <!--商品参数-->
    <div class="card">
      <van-panel title="商品参数">
        <div class="goodsinfo-detail">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}</p>
          <p>上架事件：{{goodsinfo.add_time}}</p>

          <van-button type="primary" size="large" @click="goDesc(id)">图文介绍</van-button>
          <van-button type="danger" size="large" @click="goComment(id)">商品评论</van-button>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
  import swiper from "../subcomponents/swiper.vue";
  import goodsinfo_numbox from "../subcomponents/goodsinfo_numbox.vue";

  export default {
    name: "goodsInfo",
    data() {
      return {
        id: this.$route.params.id,
        list: [],
        value: 1,
        goodsinfo: {},
        ballFlag: false, // 控制小球隐藏和显示
        selectedCount:1  // 用户选中的商品数量
      }
    },
    created() {
      this.getThumImg();
      this.getGoodsInfo()
    },
    methods: {
      getThumImg() {
        this.axios.get('/api/getthumimages/' + this.id).then(res => {
          if (res.data.status === 0) {
            for (let i = 0; i < res.data.message.length; i++) {
              this.list.push({'img': res.data.message[i].src})
            }
          }
        })
      },
      getGoodsInfo() {
        this.axios.get('/api/goods/getinfo/' + this.id).then(res => {
          if (res.data.status === 0) {
            this.goodsinfo = res.data.message[0]
          }
        })
      },
      goDesc(id) {
        this.$router.push({name: 'goodsdesc', params: {id}})
      },
      goComment(id) {
        this.$router.push({name: 'goodscomment', params: {id}})
      },
      addToCart() {
        this.ballFlag = !this.ballFlag;
        let goods_info= {id:this.id,count:this.selectedCount,price:this.goodsinfo.sell_price,selected:true}
        this.$store.commit('addToCart', goods_info)
      },
      beforeEnter(el) {
        el.style.transform = "translate(0,0)";
      },
      enter(el, done) {
        el.offsetWidth;

        // 购物车小球动画：
        // 位移距离 = 用购物车结束位置 xy坐标 减去 小球初始位置 xy坐标
        // 获取距离页面边距的距离  DOM.getBoundingClientRect()

        // 获取小球在页面中的位置:
        // $refs对象 持有注册过 ref 特性 的所有 DOM 元素和组件实例，无法获得组件内部元素
        // DOM 可以获得页面任意元素
        const ballPosition = this.$refs.ball.getBoundingClientRect();
        const badgePosition = document.getElementById('badge').getBoundingClientRect();

        const xDist = badgePosition.left - ballPosition.left;
        const yDist = badgePosition.top - ballPosition.top;

        el.style.transform = `translate(${xDist}px,${yDist}px)`;
        el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
        done()
      },
      afterEnter(el) {
        this.ballFlag = !this.ballFlag
      },
      getSelectedCount(count) {
        this.selectedCount = count;
      }
    },

    components: {
      swiper,
      numbox: goodsinfo_numbox
    }
  }
</script>

<style lang="scss" scoped>
  .goodsinfo-container {
    background-color: #ddd;
    padding: 5px 8px;

    .card {
      margin-bottom: 8px;
      box-shadow: 0 0 8px #aaa;

      .goodsinfo-detail {
        padding: 8px 14px;
      }

      .new-price {
        color: red;

      }
    }

    .ball {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: red;
      z-index: 99;
      position: absolute;
      top: 390px;
      left: 146px;

    }
  }


</style>