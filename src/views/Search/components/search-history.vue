<template>
  <div class="search-history">
    <van-cell title="搜索历史" cneter>
      <div v-if="isDeleteShow && searchHistory.length > 0">
        <span @click="$emit('clear-search-history')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) of searchHistory"
      :key="index"
      @click="onHistoryItem(item, index)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
    <!-- <van-cell :title="'aa'">
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
    <van-cell :title="'aa'">
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell> -->
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onHistoryItem(item, index) {
      if (this.isDeleteShow) {
        // 删除操作
        this.searchHistory.splice(index, 1)
      } else {
        // 点击搜证
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
