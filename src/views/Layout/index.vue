<template>
  <div class="layout-container">
    <router-view class="layout-view"></router-view>
    <!-- 底部导航 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item :to="{ name: 'Home' }">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item :to="{ name: 'Qa' }">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item :to="{ name: 'Video' }">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item :to="{ name: 'My' }">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="text">{{ user ? "我的" : "未登录" }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // active: parseInt(localStorage.getItem("LAYOUT_ACTIVE")) || "Home",
      // active: this.$route.name,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    active(newVal, oldVal) {
      if (newVal === oldVal) return;
      localStorage.setItem("LAYOUT_ACTIVE", newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: 50px;
  background-color: #f6f7f9;
  .layout-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
  }
  .layout-tabbar {
    i.iconfont {
      font-size: 20px;
    }
    span.text {
      font-size: 10px;
    }
  }
}
</style>
