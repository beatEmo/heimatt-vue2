<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      :disabled="!message.length"
      @click="onAddComment"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addCommentApi } from '@/api'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: { type: [String, Number, Object], required: true }
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async onAddComment() {
      try {
        const { data } = await addCommentApi({
          target: this.target.toString(),
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : this.articleId
        })
        this.message = ''
        console.log(data)
        this.$emit('updata-success', data.data)
        // this;
      } catch (err) {
        this.$toast('评论失败')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.comment-post {
  display: flex;
  align-items: center;
  padding: 16px 0 16px 16px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 50px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
