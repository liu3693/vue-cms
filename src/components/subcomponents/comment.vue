<template>
  <div class="cmt-container">
    <h4>发表评论</h4>
    <hr>
    <textarea name="" placeholder="请输入内容，最多120字符" id="" cols="30" rows="10" v-model="msg">
    </textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
        <div class="cmt-title">
          第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dataFormat}}
        </div>
        <div class="cmt-body">
          {{item.content}}
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import Qs from 'qs'

  export default {
    name: "comment",
    data() {
      return {
        pageIndex: 1,
        comments: [],
        msg: ''
      }
    },
    created() {
      this.getComments()
    },
    methods: {
      getComments() {
        this.axios.get('/api/getcomments/' + this.id + '?pageindex=' + this.pageIndex)
            .then(res => {
              // console.log(res.data)
              if (res.data.status === 0) {
                this.comments = this.comments.concat(res.data.message)
              } else {
                Toast('获取评论失败')
              }
            })
      },
      getMore() {
        this.pageIndex++;
        this.getComments()
      },
      postComment() {
        if (this.msg.trim().length === 0) {
          return Toast('评论不能为空')
        }

        // .trim 清楚字符串前后空格
        this.axios.post('/api/postcomment/' + this.$route.params.id, Qs.stringify({content: this.msg.trim()}))
            .then(res => {
              if (res.data.status === 0) {
                let cmt = {user_name: '匿名用户', add_time: Date.now(), content: this.msg.trim()};
                this.comments.unshift(cmt);
                this.msg = ''
              }
            })
      }
    },
    props: ['id']
  }
</script>

<style lang="scss" scoped>
  .cmt-container {
    textarea {
      font-size: 14px;
      height: 85px;
      margin: 0;
    }

    .cmt-list {
      margin: 5px 0;

      .cmt-item {
        font-size: 13px;

        .cmt-title {
          background-color: #cccccc;
          line-height: 35px;
        }

        .cmt-body {
          text-indent: 2em;
        }
      }
    }
  }
</style>