<template>
  <div>
    <!-- 顶部搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- 搜索历史 -->
    <search-history
      v-else
      :search-history="searchHistory"
      @clear-search-history="searchHistory = []"
      @search="onSearch"
    ></search-history>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { setlocalStorage, getlocalStorage } from '@/utils/storage'
export default {
  name: 'search',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  watch: {
    searchHistory: {
      handler(newVal) {
        setlocalStorage('searchHistory', newVal)
      },
      deep: true
    }
  },
  data() {
    return {
      searchText: '',
      isResultShow: false,
      searchHistory: getlocalStorage('searchHistory') ?? []
    }
  },
  methods: {
    onSearch(value) {
      if (!!value) {
        // 搜索框中有内容 才可进行搜索操作
        this.isResultShow = true

        const index = this.searchHistory.indexOf(value)
        if (index !== -1) {
          this.searchHistory.splice(index, 1)
        }
        this.searchHistory.unshift(value)

        this.searchText = value
      }
    },
    onCancel() {
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-search--show-action {
  .van-search__action {
    color: #fff;
  }
}
</style>
