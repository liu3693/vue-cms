<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsInfo/'+ item.id ">
          <img class="mui-media-object mui-pull-left"
               :src="item.img_url">
          <div class="mui-media-body">
            <h5>{{item.title}}</h5>
            <p class='mui-ellipsis'>
              <span>发表时间：{{item.add_time|dataFormat}}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    import {Toast} from "mint-ui"

    export default {
        name: "newsList",
        data() {
            return {
                newsList: []
            }
        },
        created() {
            this.getNewsList()
            console.log(this.newsList)
        },
        methods: {
            getNewsList() {
                this.axios.get('/api/getnewslist').then((res) => {
                    //console.log(res)
                    if (res.data.status === 0) {
                        this.newsList = res.data.message
                    } else {
                        Toast('获取列表失败')
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  .mui-table-view {
    li {
      h5 {
        font-weight: bold;
        color: black;
      }

      .mui-ellipsis {
        font-size: 12px;
        color: cornflowerblue;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>