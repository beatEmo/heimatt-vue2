<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="updataName"
    />
    <!-- /导航栏 -->
    <div style="padding: 10px">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserName } from '@/api'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  created() {
    this.message = this.value
  },
  methods: {
    async updataName() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (this.message === '') return this.$toast('请输入昵称')
        await updateUserName({
          name: this.message
        })
        this.$emit('input', this.message)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (err) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-popup {
  background: #f5f7f9;
}
</style>
