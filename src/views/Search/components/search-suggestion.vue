<template>
  <div class="search-suggestion">
    <van-cell
      v-show="suggestionList[0]"
      icon="search"
      v-for="(item, index) of suggestionList"
      :key="index"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionsApi } from "@/api";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  props: ["searchText"],
  watch: {
    searchText: {
      handler(val, oldVal) {
        // console.log(val);
        debounce(() => {
          this.loadSuggestions(val);
        }, 500);
        this.loadSuggestions(val);
      },
      immediate: true,
    },
  },
  data() {
    return {
      suggestionList: [],
    };
  },
  methods: {
    highlight(val) {
      if (!val) return;
      if (val.includes("<script")) return;
      const highlightStr = `<span class='active'>${this.searchText}</span> `;
      const reg = new RegExp(this.searchText, "gi");
      return val.replace(reg, highlightStr);
    },
    async loadSuggestions(q) {
      console.log(q);
      try {
        const { data } = await getSearchSuggestionsApi(q);
        this.suggestionList = data.data.options;
      } catch (e) {
        this.$toast("请求失败");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.van-cell__title {
  ::v-deep(span.active) {
    color: red;
  }
}
</style>
