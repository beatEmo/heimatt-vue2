<template>
  <div class="home-container">
    <!-- 导航 -->
    <van-nav-bar class="page-nav-bar" :border="false" fixed>
      <van-button
        class="search-button"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        :to="{ name: 'search' }"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- 导航 -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab
        v-for="(item, index) of channels"
        :key="index"
        :title="item.name"
      >
        <!-- 文章列表 -->
        <article-list :channel="item"></article-list>
        <!-- 文章列表 -->
      </van-tab>
      <div class="hamburger-icon" slot="nav-right" @click="showChannelEdit">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 导航 -->

    <!-- 编辑导航弹出层 -->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :channel="channels"
        :active="active"
        @update-active="onUpdateActive"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsApi } from "@/api";
import { getlocalStorage } from "@/utils/storage";
import { mapState } from "vuex";
import articleList from "./components/article-list.vue";
import ChannelEdit from "./components/channel-edit.vue";
export default {
  components: {
    articleList,
    ChannelEdit,
  },
  data() {
    return {
      active: 0,
      channels: [],
      show: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.loadChannels();
  },
  methods: {
    onUpdateActive(index, isActive = false) {
      this.active = index;
      this.show = isActive;
    },
    showChannelEdit() {
      this.show = true;
    },
    async loadChannels() {
      try {
        if (this.user) {
          // 用户已登录 请求用户数据
        }
        const { data } = await getUserChannelsApi();
        this.channels = data.data.channels;
      } catch (err) {
        this.$toast("请求失败嘞");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  padding-top: 46px;
  // overflow: hidden;
  .page-nav-bar {
    height: 44px;
    ::v-deep(.van-nav-bar__content) {
      border: 0;
      background-color: #3296fa;
    }
    ::v-deep(.van-nav-bar__title) {
      max-width: unset;
      .search-button {
        width: 278px;
        border: none;
        font-size: 14px;
        background-color: #5babfb;
        .van-icon {
          font-size: 16px;
          color: #fff;
        }
      }
    }
  }
  ::v-deep(.van-tabs__wrap) {
    padding-right: 34px;
  }
  .hamburger-icon {
    position: fixed;
    right: 0;
    width: 34px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    font-size: 20px;
    background-color: #fff;
    opacity: 0.9;
  }
  ::v-deep(.van-tab) {
    min-width: 100px;
    height: 40px;
    box-sizing: border-box;
    border-right: 1px solid #edeff3;
    .van-tab__text {
      font-size: 13px;
      color: #777777;
    }
  }
  ::v-deep(.van-tab--active .van-tab__text) {
    color: #333 !important;
  }
  ::v-deep(.van-tabs__line) {
    width: 15px !important;
    height: 3px;
    background: rgba(50, 150, 250, 1);
    border-radius: 3px;
    bottom: 4px;
  }
  ::v-deep(.van-tabs__nav--line) {
    padding: 0;
  }
}
::v-deep(.van-tabs__nav--complete) {
  padding-right: 34px;
}
</style>
