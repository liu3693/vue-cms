<template>
  <div class="goodsdesc-container">
    <h3>{{info.title}}</h3>
    <p v-html="info.content"></p>
  </div>
</template>

<script>
  export default {
    name: "goodsDesc",
    data(){
      return{
        info:{}
      }
    },
    created() {
      this.getGoodsDesc()
    },
    methods:{
      getGoodsDesc(){
        this.axios.get('/api/goods/getdesc/' + this.$route.params.id).then(res=>{
          if (res.data.status===0){
            this.info = res.data.message[0]
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .goodsdesc-container{
    padding: 4px;
    h3{
      font-size: 16px;
      color: #226aff;
      text-align: center;
      margin: 15px 0;
    }
    p img{
       width: 100%;
     }
  }

</style>