// 入口文件
import Vue from 'vue'
// 根组件
import app from './App.vue'

// mint-ui
import {Header, Button} from 'mint-ui'
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);

// mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// vant
import { Tab, Tabs ,Lazyload ,List ,Swipe, SwipeItem, Panel, Stepper} from 'vant';
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Lazyload);
Vue.use(List);
Vue.use(SwipeItem);
Vue.use(Swipe);
Vue.use(Panel);
Vue.use(Stepper);

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
// 过滤器
Vue.filter('dataFormat', function (datastr, pattern = 'YYYY-MM-DD hh:mm:ss') {
  return moment(datastr).format(pattern)
})
const vm = new Vue({
  el: '#app',
  render: createElement => createElement(app),
  router
})
