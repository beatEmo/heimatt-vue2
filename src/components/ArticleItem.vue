<template>
  <div class="article-item">
    <van-cell size="large">
      <div class="title" slot="title">{{ article.title }}</div>
      <div class="cover-wrap" slot="label">
        <div class="cover-item" v-if="article.cover.type === 3">
          <van-image
            class="cover-image"
            v-for="(img, index) of article.cover.images"
            :key="index"
            :src="img"
            fit="cover"
          />
        </div>
        <div class="label-info-wrap">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
      <van-image
        v-if="article.cover.type === 1"
        slot="default"
        :src="article.cover.images[0]"
        fit="cover"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    padding-left: 12px;
    .right-cover {
      width: 116px;
      height: 73px;
    }
  }
  .label-info-wrap {
    span {
      font-size: 11px;
      color: #b4b4b4;
      margin-right: 12px;
    }
  }
  .cover-item {
    display: flex;
    padding: 15px 0;
    .cover-image {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
    }
  }
}
</style>
