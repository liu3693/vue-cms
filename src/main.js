// 入口文件
import Vue from 'vue'
// 根组件
import app from './App.vue'
// mint-ui
import {Header} from 'mint-ui'
Vue.component(Header.name,Header)
// mui样式
import './lib/mui/css/mui.min.css'

const vm = new Vue({
    el:'#app',
    render: createElement =>createElement(app)
})
