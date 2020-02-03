<template>
  <div>
    <!--    顶部滑动条   -->
    <van-tabs v-model="active" swipeable @click="getPhoteListByCateId">
      <!-- vant标签页组件在tabs上绑定事件，规定传入的第1个参数是tab中的name标识符，第2个参数是title标题-->
      <van-tab v-for="item in cates" :title="item.title" :name="item.id" :key="item.id">
        <!--内容-->
        <div class="list-container">
          <ul>
            <router-link tag="li" v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id">
              <!--tag指定 router-link 标签渲染成li标签-->
              <img v-lazy="item.img_url" alt="">
              <div class="info">
                <h1 class="info-title">{{item.title}}</h1>
                <div class="info-body">{{item.zhaiyao}}</div>
              </div>

            </router-link>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>

</template>

<script>
  export default {
    name: "photoList",
    data() {
      return {
        active: 0,
        cates: [], //滑动条目录
        list: [] //图片列表
      }
    },
    created() {
      this.getAllCategory();
      this.getPhoteListByCateId(0) //请求所有图片数据
    },
    methods: {
      getAllCategory() {
        this.axios.get('/api/getimgcategory').then(res => {
          if (res.data.status === 0) {
            res.data.message.unshift({title: '全部', id: 0});
            this.cates = res.data.message
          }
        })
      },
      getPhoteListByCateId(name) {
        console.log(name)
        this.axios.get('/api/getimages/' + name).then(res => {
          if (res.data.status === 0) {
            // console.log(res.data)
            this.list = res.data.message
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .slide-wrapper {
  }

  .list-container {
    text-align: center;
    margin: 10px;

    li {
      background-color: #ccc;
      padding: 2px;
      margin: 5px;
      box-shadow: 0 0 4px #999;
      position: relative;

      img {
        width: 100%;
        vertical-align: middle;
      }

      .info {
        color: white;
        text-align: left;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        max-height: 84px;

        .info-title {
          font-size: 14px;
        }

        .info-body {
          font-size: 13px;
        }
      }
    }
  }
</style>