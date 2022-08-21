<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span @click="confirm">完成</span>
    </div>
  </div>
</template>

<script>
import { updateUserAvatar } from '@/api'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdataPhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  methods: {
    confirm() {
      // console.log(this.cropper.getData())
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        let formData = new FormData()
        formData.append('photo', blob)
        try {
          const { data } = await updateUserAvatar(formData)
          this.$emit('update-photo', data.data.photo)
          this.$emit('close')
          this.$toast.success('更换成功')
        } catch (err) {
          this.$toast('更换头像失败')
        }
      })
    }
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      // autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false, // 关闭默认背景
      movable: true,
      crop(event) {
        // console.log(event.detail.x)
        // console.log(event.detail.y)
        // console.log(event.detail.width)
        // console.log(event.detail.height)
        // console.log(event.detail.rotate)
        // console.log(event.detail.scaleX)
        // console.log(event.detail.scaleY)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.update-photo {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    color: #fff;
    padding: 0 7px;
    box-sizing: border-box;
  }
  .img {
    max-width: 100%;
  }
}
</style>
