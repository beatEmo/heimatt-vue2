<template>
  <div ref="articleBox">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-duration="1500"
      :success-text="refreshSuccessText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item.id" :title="item.title" /> -->
        <article-item
          v-for="item in list"
          :key="item.id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from "@/components/ArticleItem.vue";
import { getAticleApi } from "@/api";
export default {
  name: "articleList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  created() {},
  mounted() {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isRefreshLoading: false,
      refreshSuccessText: "",
    };
  },
  methods: {
    enter() {
      alet(1);
    },
    async onLoad() {
      try {
        let { data } = await getAticleApi({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 0,
        });
        let { results } = data.data;
        // 将新数据添加到展示的列表  直接赋值的化新内容覆盖老内容
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          // 表示还有数据 就更新下次获取的事件戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 没数据时 将finished设置为true
          this.finished = true;
        }
      } catch (e) {
        console.log(e);
        this.loading = false; // 关闭 loading 效果
        this.error = true; // 开启错误提示
      }
    },
    async onRefresh() {
      try {
        const { data } = await getAticleApi({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now(), // 下拉刷新每次都应该获取最新数据
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        const { results } = data.data;
        // 将最新得到数据 加到展示列表前部
        this.list.unshift(...results);
        this.isRefreshLoading = false;
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
      } catch (e) {
        console.log(e);
        this.isRefreshLoading = false; // 关闭下拉刷新的 loading 状态
        this.$toast("刷新失败");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.myCell-enter-from, .myCell-leave-to) {
  opacity: 0;
}
::v-deep(.myCell-enter-to, .myCell-leave-from) {
  opacity: 1;
}
::v-deep(.myCell-enter-active, .myCell-leave-active) {
  transition: all 6s ease;
}
</style>
