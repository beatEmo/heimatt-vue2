<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <template #left>
        <van-icon name="cross" @click="changeReply({ flag: false })" />
      </template>
    </van-nav-bar>
    <!-- 当前评论项 -->
    <comment-item :commit="comment"></comment-item>
    <!-- 评论及回复列表 -->
    <van-cell title="全部回复" />
    <component-list type="c" :articleId="comment.com_id" :list="commentList">
    </component-list>

    <van-button
      class="comment-btn"
      type="primary"
      size="large"
      @click="isPostShow = true"
    >
      写评论
    </van-button>

    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
        :target="comment.com_id"
        @updata-success="onAddComment"
      ></comment-post>
    </van-popup>
  </div>
</template>

<script>
import CommentPost from './comment-post.vue'
import ComponentList from './comment-list.vue'
import { mapMutations } from 'vuex'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    ComponentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    list: {
      type: [Array],
      default: () => []
    }
  },
  data() {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  methods: {
    ...mapMutations(['changeReply']),
    onAddComment(data) {
      this.isPostShow = false
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-reply {
  ::v-deep(.van-nav-bar__content) {
    background-color: #fff !important;
    .van-nav-bar__title {
      color: #000 !important;
    }
    .van-icon-cross {
      color: #000;
    }
    ::v-deep(.van-nav-bar) {
      position: fixed !important;
      top: 0;
      left: 0;
    }
  }

  .comment-btn {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
