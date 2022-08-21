<template>
  <van-picker
    title="标题"
    show-toolbar
    :columns="columns"
    :default-index="value"
    @confirm="onConfirm"
    @cancel="$emit('close')"
    @change="noPickerChange"
  />
</template>

<script>
import { updateUserName } from '@/api'
export default {
  name: 'UpdataSex',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['女', '男'],
      localGender: this.value
    }
  },
  methods: {
    noPickerChange(picker, value, index) {
      this.localGender = index
    },
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserName({
          gender: this.localGender
        })
        this.$emit('input', this.localGender)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (err) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
