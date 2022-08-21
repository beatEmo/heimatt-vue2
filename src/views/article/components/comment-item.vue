<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="commit.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ commit.aut_name }}</div>
      <van-button
        class="like-btn"
        :class="{ liked: commit.is_liking }"
        :icon="commit.is_liking ? 'good-job' : 'good-job-o'"
        :loading="commentloading"
        @click="onCommentike"
      >
        {{ commit.like_count || '赞' }}
      </van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ commit.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ commit.pubdate | relativeTime }}</span>
        <van-button
          class="reply-btn"
          round
          @click="changeReply({ flag: true, comment: commit })"
        >
          回复 {{ commit.reply_count }}
        </van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { mapMutations } from 'vuex'
import { addCommentLikeApi, deleteCollectionApi } from '@/api'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    commit: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      commentloading: false
    }
  },
  methods: {
    ...mapMutations(['changeReply']),
    async onCommentike() {
      this.commentloading = true
      console.log(this.commit)
      try {
        this.commit.is_liking
          ? await deleteCollectionApi(this.commit.com_id)
          : await addCommentLikeApi(this.commit.com_id)
        this.commit.is_liking
          ? this.commit.like_count--
          : this.commit.like_count++
        this.commit.is_liking = !this.commit.is_liking
      } catch (err) {
        this.$toast('操作失败请重试')
      }
      this.commentloading = false
    }
  }
}
</script>

<style scoped lang="scss">
.liked {
  color: #406599;
}
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 13px;
    }
  }
  .comment-content {
    font-size: 16px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 10px;
    color: #222;
    margin-right: 12px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 67px;
    height: 24px;
    line-height: 24px;
    font-size: 10px;
    color: #222;
  }
  .like-btn {
    height: 15px;
    padding: 0;
    border: none;
    font-size: 10px;
    line-height: 15px;
    margin-right: 3px;
    .van-icon {
      font-size: 15px;
    }
  }
}
</style>
