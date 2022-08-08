<template>
  <div>
    <!-- 已登录头部 -->

    <div class="my-container" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>信息按钮</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="nums">{{ userInfo.art_count }}</span>
          <span class="name">头条</span>
        </div>
        <div class="data-item">
          <span class="nums">{{ userInfo.follow_count }}</span>
          <span class="name">关注</span>
        </div>
        <div class="data-item">
          <span class="nums">{{ userInfo.fans_count }}</span>
          <span class="name">粉丝</span>
        </div>
        <div class="data-item">
          <span class="nums">{{ userInfo.like_count }}</span>
          <span class="name">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="my-container" v-else>
      <header
        @click="
          $router.push({
            name: 'login',
            query: {
              id: 123,
            },
          })
        "
      >
        <img class="my-header-mobile" src="~@/assets/mobile.png" />
        <span class="text">登录 / 注册</span>
      </header>
    </div>
    <!-- 导航组件 -->
    <van-grid class="gtid-nav" :column-num="2" clickable>
      <van-grid-item class="gtid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="gtid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 功能按键 -->
    <van-cell-group class="cell-group">
      <van-cell is-link>
        <span slot="title">消息通知</span>
      </van-cell>
      <van-cell is-link>
        <span slot="title">小智同学</span>
      </van-cell>
    </van-cell-group>
    <van-button
      class="deLogin-button"
      type="primary"
      v-if="user"
      block
      @click="onLogout"
    >
      退出登录
    </van-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfoApi } from "@/api";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },

  created() {
    this.user && this.loadUserInfo();
  },
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: "退出提示",
          message: "是否确定退出",
        })
        .then(() => {
          this.$store.commit("getUser", "");
        })
        .catch(() => {
          // on cancel
          console.log("取消执行这里");
        });
    },
    async loadUserInfo() {
      try {
        let { data } = await getUserInfoApi();
        this.userInfo = data.data;
      } catch (e) {
        this.$toast("获取数据惜败");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.my-container {
  position: relative;
  height: 180px;
  background: url("~@/assets/banner.png") no-repeat center;
  background-size: cover;
  header {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    .my-header-mobile {
      width: 66px;
      height: 66px;
      margin-bottom: 8px;
    }
    span.text {
      font-size: 14px;
      color: #fff;
    }
  }
  .base-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 115px;
    padding: 38px 16px 16px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 66px;
        height: 66px;
        border: 2px solid #fff;
      }
      .name {
        font-size: 15px;
        margin-left: 11px;
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
  }
  .data-stats {
    display: flex;
    justify-content: center;
    align-items: center;
    .data-item {
      height: 65px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .nums {
        font-size: 18px;
        margin-bottom: 7.5px;
      }
      .name {
        font-size: 11px;
      }
    }
  }
}
.gtid-nav {
  .gtid-item {
    .iconfont {
      font-size: 22.5px;
    }
    .icon-shoucang {
      color: #eb5253;
    }
    .icon-lishi {
      color: #ff9d1d;
    }
    .text {
      color: #000;
      margin-top: 4px;
      font-size: 14px;
    }
  }
}
.cell-group {
  margin-top: 5px;
}
.deLogin-button {
  margin-top: 5px;
  background: #fff;
  border: 0;
  color: #d86262;
}
</style>
