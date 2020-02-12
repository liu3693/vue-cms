<template>
  <div class="cart-container">
    <!--列表区-->
    <div class="goods-list">
      <van-row class="goods-item" type="flex" align="center" v-for="(item, i) in goodsList" :key="item.id">
        <van-col span="4">
          <van-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"/>
        </van-col>
        <van-col span="20">
          <van-card currency="￥" :price="item.sell_price" :thumb="item.thumb_path">
            <div slot="title" class="item-header">
              <h5>{{item.title}}</h5>
              <van-button size="mini" plain round type="danger" @click="remove(item.id, i)">删除</van-button>
            </div>
            <div slot="num">
              <numbox :size="14" :width="48" :max="50" :goodsid="item.id"
                      :initcount="$store.getters.getGoodsCount[item.id]"></numbox>
            </div>
          </van-card>
        </van-col>
      </van-row>

    </div>

    <!--结算区-->
    <div class="submit-bar">
      <van-submit-bar
              :price="this.$store.getters.getGoodsAmount.amount*100"
              button-text="提交订单"
      />
    </div>
  </div>
</template>

<script>
  import cart_numbox from "../subcomponents/cart_numbox.vue";

  export default {
    name: "cartContainer",
    data() {
      return {
        goodsList: []
      }
    },
    created() {
      this.getGoodsList()
    },
    methods: {
      getGoodsList() {
        // 获取store 中的所有商品id
        let idArr = [];
        this.$store.state.cart.forEach(item => idArr.push(item.id));
        // 如果购物车中没有商品
        if (idArr.length <= 0) {
          return
        }
        // 获取购物车商品列表
        this.axios.get('/api/goods/getshopcarlist/' + idArr.join(',')).then(res => {
          if (res.data.status === 0) {
            this.goodsList = res.data.message;
          }
        })
      },
      remove(id, index) {
        // 删除，需要把商品从 store 和组件中的 goodsList 中删除
        this.goodsList.splice(index,1);
        this.$store.commit('removeFromCart', id)
      },
      selectedChanged(id,val){
        this.$store.commit('updateGoodsSelected',{id:id,selected:val})
      }
    },
    components: {
      numbox: cart_numbox
    }
  }
</script>

<style lang="scss">
  .cart-container {
    .goods-list {
      padding: 0 8px;

      .goods-item {
        background-color: #fafafa;
        margin-bottom: 4px;

        input[type=number] {
          margin-bottom: 0;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .van-submit-bar{
      position: relative;
    }
  }
</style>