import VueRouter from "vue-router";

// 导入对应的路由组件
import homeContainer from "./components/tabbar/homeContainer.vue";
import memberContainer from "./components/tabbar/memberContainer.vue";
import cartContainer from "./components/tabbar/cartContainer.vue";
import searchContainer from "./components/tabbar/searchContainer.vue";
import newsList from "./components/news/newsList.vue";
import newsInfo from "./components/news/newsInfo.vue";
import photoList from "./components/photo/photoList.vue";
import photoInfo from "./components/photo/photoInfo.vue";
import goodsList from "./components/goods/goodsList.vue";
import goodsInfo from "./components/goods/goodsInfo.vue";
import goodsComment from "./components/goods/goodsComment.vue";
import goodsDesc from "./components/goods/goodsDesc.vue";

const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:homeContainer},
        {path:'/member',component:memberContainer},
        {path:'/cart',component:cartContainer},
        {path:'/search',component:searchContainer},
        {path:'/home/newsList',component:newsList},
        {path:'/home/newsInfo/:id',component:newsInfo},
        {path:'/home/photoList',component:photoList},
        {path:'/home/photoInfo/:id',component:photoInfo},
        {path:'/home/goodsList',component:goodsList},
        {path:'/home/goodsInfo/:id',component:goodsInfo,name:'goodsinfo'},
        {path:'/home/goodsDesc/:id',component:goodsDesc,name:'goodsdesc'},
        {path:'/home/goodsComment/:id',component:goodsComment,name:'goodscomment'}
    ],
    linkActiveClass:'mui-active'// 选中的router-link的样式
})

export default router