<template>
  <van-button
    class="follow-btn"
    v-if="isfollow"
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
  </van-button>
</template>

<script>
import { addFollowApi, deleteFollowApi } from '@/api'
export default {
  name: 'MyFollow',
  props: {
    isfollow: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async onoFollow() {
      try {
        this.isfollow
          ? await deleteFollowApi(this.userId)
          : await addFollowApi(this.userId)
        // this.article.is_followed = !this.article.is_followed;
        this.$emit('update-follow', !this.isfollow)
      } catch (err) {
        let message = '关注失败请重试'
        if (err?.reponse.status === 400) {
          message = '自己不能自关'
        }
        this.$toast(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
