<template>
  <div class="channel-edit">
    <van-cell :border="false" center>
      <template #title>
        <span class="custom-title">我的频道</span>
      </template>
      <van-button
        class="custom-button"
        type="danger"
        size="mini"
        plain
        round
        @click="isEdit = !isEdit"
      >
        <span slot="default">{{ isEdit ? "完成" : "编辑" }}</span>
      </van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) of channel"
        :key="index"
      >
        <span
          class="text"
          :class="{ active: active === index }"
          slot="text"
          @click="onMyChannelClick(item, index)"
        >
          {{ item.name }}
        </span>
        <template slot="icon">
          <van-icon
            class="clear"
            name="close"
            v-show="isEdit && !fiexdChannel.includes(item.id)"
          />
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell :border="false">
      <template #title>
        <span class="custom-title">频道推荐</span>
      </template>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) of recommendChannels"
        :key="index"
        @click="addChannels(item)"
      >
        <van-icon name="plus" slot="icon" />
        <span slot="text">{{ item.name }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getChannelsApi, addUserChannelApi, removeUserChannelApi } from "@/api";
import { mapState } from "vuex";
import { getlocalStorage, setlocalStorage } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  props: {
    channel: {
      type: [Array, Object],
      required: true,
    },
    active: {
      required: true,
    },
  },
  created() {
    this.loadAllChannels();
  },
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      return this.allChannels.reduce((prev, cur) => {
        let flag = this.channel.some((item) => item.id === cur.id);
        if (!flag) {
          prev.push(cur);
        }
        return prev;
      }, []);
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fiexdChannel: [0],
    };
  },
  methods: {
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 编辑状态
        if (this.fiexdChannel.includes(channel)) {
          return;
        }
        this.channel.splice(index, 1);
        if (index <= this.active) {
          this.$emit("update-active", this.active - 1, true);
        }
        // 处理数据持久化
        this.deleteChannel(channel);
      } else {
        // 非编辑状态 执行频道切换
        this.$emit("update-active", index);
      }
    },
    async deleteChannel(channel) {
      try {
        if (this.user) {
          await removeUserChannelApi(channel.id);
        } else {
          // 未登录 信息存本地
          setlocalStorage("TOUTIAO_CHANNELS", this.channel);
        }
      } catch (e) {
        this.$toast("报错失败");
      }
    },
    async addChannels(item) {
      this.channel.push(item);
      if (this.user) {
        // 用户登录 同步频道编辑信息
        try {
          await addUserChannelApi({
            id: item.id,
            seq: this.channel.length,
          });
        } catch (e) {
          this.$toast("报错失败");
        }
      } else {
        // 未登录 信息存本地
        setlocalStorage("TOUTIAO_CHANNELS", this.channel);
      }
    },
    async loadAllChannels() {
      try {
        const { data } = await getChannelsApi();
        this.allChannels = data.data.channels;
      } catch (e) {
        this.$toast("数据获取失败");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.channel-edit {
  padding: 35px 0;
  .custom-title {
    font-size: 16px;
  }
  .custom-button {
    width: 52px;
    height: 23px;
    font-size: 14px;
    top: -5px;
  }
  .my-grid {
    ::v-deep(.grid-item) {
      max-width: 95px;
      min-width: 80px;
      height: 43px;
      .van-grid-item__content {
        background-color: #f4f5f6;
        color: #222222;
      }
    }
    .grid-item {
      font-size: 12px;
    }
    .clear {
      position: absolute;
      top: -20px;
      right: -47px;
      z-index: 2;
      font-size: 14px;
      // color:  ;
    }
    .active {
      color: red;
    }
  }
  .recommend-grid {
    ::v-deep(.grid-item) {
      max-width: 95px;
      min-width: 80px;
      height: 43px;
      .van-grid-item__content {
        flex-direction: unset;
        background-color: #f4f5f6;
        color: #222222;
      }
    }
    .grid-item {
      font-size: 12px;
      .text {
        margin-left: 3px;
      }
    }
  }
}
</style>
