<template>
  <div class="login-container">
    <!-- 导航组件 -->
    <van-nav-bar title="登录/注册" fixed left-arrow>
      <template #left>
        <i class="nav-icon iconfont icon-youjiantou"></i>
      </template>
    </van-nav-bar>
    <!-- 导航组件 -->

    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        ref="loginMobile"
        center
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        autocomplete="off"
        :rules="userFormRules.mobile"
      >
        <template #left-icon>
          <i class="input-icon iconfont icon-shouji"> </i>
        </template>
      </van-field>
      <van-field
        center
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        autocomplete="off"
        :rules="userFormRules.code"
      >
        <template #left-icon>
          <i class="input-icon iconfont icon-yanzhengma"> </i>
        </template>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
            :time="5 * 1000"
            format="ss 秒"
          />
          <van-button
            v-else
            :disabled="isSend"
            round
            size="small"
            type="info"
            native-type="button"
            @click="onSendSms"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="input-button">
        <van-button :disabled="isLogin" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userLogin, getSmsCodeApi } from "@/api";
export default {
  name: "LoginPage",
  data() {
    return {
      isLogin: false,
      isSend: false,
      user: {
        mobile: "13911111111",
        code: "246810",
      },
      isCountDownShow: false,
      userFormRules: {
        mobile: [
          { required: true, message: "手机号不能为空" },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
            trigger: "onChange",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
    };
  },
  methods: {
    async onSendSms() {
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (e) {
        return this.$toast("校验失败");
      }
      this.isCountDownShow = true;
      try {
        await getSmsCodeApi(this.user.mobile);
      } catch (e) {
        this.isCountDownShow = false;
        if (e.response.status === 429) {
          this.$toast("发送太平凡了");
        } else {
          this.$toast("发送惜败了");
        }
      }
    },
    async onSubmit() {
      const user = this.user;
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const { data } = await userLogin(user);
        this.$store.commit("getUser", data.data);
        this.$toast.success("登录成功");
      } catch (e) {
        if (e.response.status === 400) {
          this.$toast.fail("用户名或验证码错误");
        } else {
          console.log("登录失败", e);
          this.$toast.fail(`登录失败${e.message}`);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  padding-top: 50px;
  .nav-icon {
    color: #fff;
    font-size: 16px;
  }
  .input-icon {
    color: #666;
  }
  .input-button {
    margin: 16px;
  }
}
::v-deep(.van-nav-bar__content) {
  background-color: #3296fa;
}
::v-deep(.van-nav-bar__title) {
  color: #fff;
  font-size: 16px;
}
</style>
