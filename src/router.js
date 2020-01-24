import VueRouter from "vue-router";

// 导入对应的路由组件
import homeContainer from "./components/tabbar/homeContainer.vue";
import memberContainer from "./components/tabbar/memberContainer.vue";
import cartContainer from "./components/tabbar/cartContainer.vue";
import searchContainer from "./components/tabbar/searchContainer.vue";

const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:homeContainer},
        {path:'/member',component:memberContainer},
        {path:'/cart',component:cartContainer},
        {path:'/search',component:searchContainer}
    ],
    linkActiveClass:'mui-active'
})

export default router