// 入口文件
import Vue from 'vue'
// 根组件
import app from './App.vue'
// mint-ui
import {Header,Swipe,SwipeItem} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
// 路由
import vueRouter from 'vue-router'
Vue.use(vueRouter)
import router from './router'
// axios
import axios from 'axios'
import vueAxios from 'vue-axios'
Vue.use(vueAxios,axios)

const vm = new Vue({
    el:'#app',
    render: createElement =>createElement(app),
    router
})
