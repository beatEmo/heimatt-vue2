<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>
<script>
import { getSearchResultsApi } from "@/api";
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      console.log(this.searchText);
      try {
        const { data } = await getSearchResultsApi({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText,
        });
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        if (data?.data?.results.length === 0) {
          this.finished = true;
        } else {
          this.page++;
        }
      } catch (e) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
