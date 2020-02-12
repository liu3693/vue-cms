// 入口文件
import Vue from 'vue'
// 根组件
import app from './App.vue'

// mint-ui
import {Header} from 'mint-ui'

Vue.component(Header.name, Header);

// mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// vant
import {Tab, Tabs, Lazyload, List, Swipe, SwipeItem, Panel, Stepper, Switch, Card, Col, Row, Button, SubmitBar, NavBar} from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Lazyload);
Vue.use(List);
Vue.use(SwipeItem);
Vue.use(Swipe);
Vue.use(Panel);
Vue.use(Stepper);
Vue.use(Switch);
Vue.use(Card);
Vue.use(Col);
Vue.use(Row);
Vue.use(Button);
Vue.use(SubmitBar);
Vue.use(NavBar);

// vuex
import Vuex from 'vuex'

Vue.use(Vuex);

let cart = JSON.parse(localStorage.getItem('cart') || '[]')
const store = new Vuex.Store({
  // state 相当于组件中的 data；mutations 相当于组件中的methods；

  state: { // state 中的数据只能通过，this.$store.state.*** 获取
    cart: cart // id:商品id，count:商品数量，price:商品数量，selected:是否选中
  },
  mutations: { // 如果要操作 state 值，只能通过调用 mutations 提供的方法。this.$store.commit('方法名')。不推荐直接操作state中的数据
    addToCart(state, goodsinfo) { // 第一个参数固定为state
      let flag = false;
      // 如果商品已经添加 则数量+1
      state.cart.some(item => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true
        }
      });
      // 循环一遍，如果没有添加到购物车，则添加
      if (flag === false) {
        state.cart.push(goodsinfo)
      }
      // 添加到localstorage
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateGoodsInfo(state, goodsinfo) {
      // 结算页面修改购物车商品数量值
      state.cart.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true
        }
      });

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeFromCart(state, id) {
      state.cart.some((item, i) => {
        if (item.id == id) {
          state.cart.splice(i, 1);
          return true
        }
      });
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateGoodsSelected(state,info){
      state.cart.some(item=>{
        if (item.id == info.id){
          item.selected = info.selected
        }
      });
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  getters: { // getters 只负责对外提供数据，不负责修改数据；可以认为是 store 的计算属性
    getAllCount(state) {
      let c = 0;
      state.cart.forEach(item => {
        c += item.count
      });
      return c
    },
    getGoodsCount(state) {// 得到购物车中的商品 id 对应的购买数量
      let o = {};
      state.cart.forEach(item => {
        o[item.id] = item.count
      });
      return o
    },
    getGoodsSelected(state){
      let o = {};
      state.cart.forEach(item=>{
        o[item.id] = item.selected
      });
      return o
    },
    getGoodsAmount(state){
      let o = {amount:0};
      state.cart.forEach(item=>{
        if (item.selected){
          o.amount += item.price * item.count
        }
      });
      return o
    }
  }
});

// 路由
import vueRouter from 'vue-router'

Vue.use(vueRouter)
import router from './router'

// axios
import axios from 'axios'
import vueAxios from 'vue-axios'

Vue.use(vueAxios, axios)
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';//配置根路径

// 导入moment.js时间插件
import moment from 'moment'
import goodsInfo from "./components/goods/goodsInfo.vue";
// 过滤器
Vue.filter('dataFormat', function (datastr, pattern = 'YYYY-MM-DD hh:mm:ss') {
  return moment(datastr).format(pattern)
})

const vm = new Vue({
  el: '#app',
  render: createElement => createElement(app),
  router,
  store
})
