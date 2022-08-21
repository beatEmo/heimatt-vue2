<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <my-follow
            :isfollow="article.is_followed"
            :userId="article.aut_id"
            @update-follow="article.is_followed = $event"
          />
          <!-- <van-button
            class="follow-btn"
            v-if="article.is_followed"
            round
            size="small"
            @click="onoFollow"
          >
            已关注
          </van-button>
          <van-button
            class="follow-btn"
            v-else
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onoFollow"
          >
            关注
          </van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content">
          这是文章内容
        </div>
        <van-divider>正文结束</van-divider>
        <!-- 评论 strat-->
        <component-list
          id="ddd"
          :list="list"
          :articleId="article.art_id"
          @updata-totalCount="totalCount = $event.total_count"
        ></component-list>
        <!-- 评论 end -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
          >
            写评论
          </van-button>
          <van-icon
            name="comment-o"
            :badge="totalCount"
            color="#777"
            tag="a"
            href="#ddd"
          />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <collect-article
            v-model="article.is_collected"
            :articleId="article.art_id"
          />
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <like-article
            v-model="article.attitude"
            :article="article"
            :articleId="article.art_id"
          ></like-article>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="isErrorShow === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleInfo">
          点击重试
        </van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- /底部区域 -->
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
        :target="article.art_id"
        @updata-success="onAddComment"
      ></comment-post>
    </van-popup>

    <!-- 回复 -->
    <van-popup
      :value="isReplyBounced"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <comment-reply
        v-if="isReplyBounced"
        :comment="replyComment"
        :list="list"
      ></comment-reply>
      <!-- <comment-post
        :target="article.art_id"
        @updata-success="onAddComment"
      ></comment-post> -->
    </van-popup>
  </div>
</template>

<script>
import CommentReply from './components/comment-reply.vue'
import { mapState, mapMutations } from 'vuex'
import CommentPost from './components/comment-post.vue'
import LikeArticle from '@/components/like-article'
import ComponentList from './components/comment-list.vue'
import MyFollow from '@/components/my-follow'
import CollectArticle from '@/components/collect-article'
import { getArticleByIdApi } from '@/api'
export default {
  name: 'ArticleIndex',
  components: {
    MyFollow,
    CollectArticle,
    ComponentList,
    LikeArticle,
    CommentPost,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    ...mapState(['isReplyBounced', 'replyComment'])
  },
  provide() {
    return {
      articleId: this.articleId
    }
  },
  data() {
    return {
      article: {},
      loading: true,
      isErrorShow: false,
      totalCount: 0,
      isPostShow: false,
      list: []
    }
  },
  watch: {},
  created() {
    this.loadArticleInfo()
  },
  mounted() {},
  methods: {
    ...mapMutations(['changeReply']),
    onAddComment(data) {
      this.isPostShow = false
      this.list.unshift(data.new_obj)
    },
    // async onoFollow() {
    //   try {
    //     this.article.is_followed
    //       ? await deleteFollowApi(this.article.aut_id)
    //       : await addFollowApi(this.article.aut_id);
    //     this.article.is_followed = !this.article.is_followed;
    //   } catch (err) {
    //     let message = "关注失败请重试";
    //     if (err?.reponse.status === 400) {
    //       message = "自己不能自关";
    //     }
    //     this.$toast(message);
    //   }
    // },
    async loadArticleInfo() {
      this.loading = true
      try {
        const { data } = await getArticleByIdApi(this.articleId)
        console.log(data)
        this.article = data.data

        this.$nextTick(() => {})
      } catch (e) {
        if (e?.response?.status == 404) {
          this.isErrorShow = 404
        }
        this.$toast('请求数据失败')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
@import './markdown.css';
.article-container {
  ::v-deep(.van-nav-bar__content) {
    background-color: rgb(50, 150, 250);
    .van-nav-bar__left {
      .van-icon-arrow-left {
        color: #fff;
      }
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px 16px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 11px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 80px;
        height: 29px;
      }
    }

    .article-content {
      padding: 27px 16px;
      ::v-deep(p) {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 100px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 61px;
      color: #b4b4b4;
    }
    .text {
      font-size: 15px;
      color: #666666;
      margin: 16px 0 23px;
    }
    .retry-btn {
      width: 140px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #c3c3c3;
      font-size: 15px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 8px;
        background-color: #e22829;
      }
    }
  }
}
</style>
