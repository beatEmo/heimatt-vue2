<template>
  <van-icon
    :color="value === 1 ? 'red' : ''"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onLinke"
  />
</template>

<script>
import { deleteLikeApi, addLikeApi } from '@/api'
export default {
  name: 'LikeArticel',
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    article: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number, Boolean],
      required: true
    }
  },
  methods: {
    async onLinke() {
      // 两个作用：1、交互提示 2、防止网络慢用户连续不断的点击按钮请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        // 如果已经点赞，则取消点赞
        if (this.article.attitude === 1) {
          await deleteLikeApi(this.articleId)
          this.article.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          // 否则添加点赞
          await addLikeApi(this.articleId)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
