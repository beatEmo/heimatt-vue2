<template>
  <div class="layout-container">
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar class="layout-tabbar" v-model="active" route>
      <van-tabbar-item
        :class="{ 'van-tabbar-item--active': active === 0 }"
        to="/"
      >
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/Qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/Video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/My">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout-container {
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
