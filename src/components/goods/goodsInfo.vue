<template>
    <div class="goodsinfo-container">
        <transition
                @before-enter="beforEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag"></div>
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
                        <numbox></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToCart()">加入购物车</mt-button>
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

                    <mt-button type="primary" size="large" @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" @click="goComment(id)">商品评论</mt-button>
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
                ballFlag: false // 控制小球隐藏和显示
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
                this.ballFlag = !this.ballFlag
            },
            beforEnter(el){
              el.style.transform = "translate(0,0)";
            },
            enter(el,done){
              el.offsetWidth;
              el.style.transform = "translate(93px,230px)";
              el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)"
              done()
            },
          afterEnter(el){
              this.ballFlag = !this.ballFlag
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