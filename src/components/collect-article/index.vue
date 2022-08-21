<template>
  <van-icon
    color="#777"
    :name="value ? 'star' : 'star-o'"
    :class="{ collected: value }"
    @click="onCollect"
  />
</template>

<script>
import { addCollectionApi, deleteCollectionApi } from '@/api'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async onCollect() {
      try {
        this.value
          ? await deleteCollectionApi(this.articleId)
          : await addCollectionApi(this.articleId)
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article-bottom {
  .collected {
    color: #ffa500 !important;
  }
}
</style>
