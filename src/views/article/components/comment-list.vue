<template>
  <div class="article-comments">
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-show="list.length"
        v-for="(item, index) in list"
        :key="index + '1'"
        :commit="item"
      ></comment-item>
      <comment-item
        v-show="replyList.length"
        v-for="(item, index) in replyList"
        :key="index"
        :commit="item"
      ></comment-item>
      <!-- <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.content"
      /> -->
    </van-list>
  </div>
</template>

<script>
import { getCommentsApi } from '@/api'
import CommentItem from './comment-item.vue'
export default {
  name: 'ComponentList',
  components: {
    CommentItem
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    },
    list: {
      type: [Array],
      default: () => []
    },
    replyList: {
      type: [Array],
      default: () => []
    },
    type: {
      type: String,
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
    // source: {
    //   type: [String, Number, Object],
    //   required: true,
    // },
  },
  computed: {
    commitList() {
      return this.list
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      totalCount: 0
    }
  },
  created() {
    // if (this.type === "a") {
    this.onLoad()
    // }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getCommentsApi({
          type: this.type,
          source: this.articleId.toString(),
          offset: this.offset,
          limit: 10
        })
        const { results } = data.data
        this.list.push(...results)
        // this.list.push(...results);
        this.$emit('updata-totalCount', data.data)
        console.log(data.data)
        // this.totalCount = data.data.total_count;
        this.loading = false
        if (results.length > 0) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {}
    }
  }
}
</script>

<style lang="scss" scoped></style>
