<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <!-- <input type="file" hidden ref="file @change="onFileChange" /> -->

    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
        @click="$refs.file.click()"
      />
    </van-cell>
    <input type="file" hidden ref="file" @change="onFileChange" />
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isShowUpdateName = true"
    />
    <van-cell
      title="性别"
      :value="sex"
      is-link
      @click="isShowUpdateSex = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isShowUpdateYear = true"
    />

    <!-- 编辑头像 -->
    <van-popup
      v-model="isShowUpdatePhoto"
      position="bottom"
      style="height: 100%"
    >
      <updata-photo
        v-if="isShowUpdatePhoto"
        :img="img"
        @close="close"
        @update-photo="user.photo = $event"
      ></updata-photo>
    </van-popup>

    <!-- 修改昵称 -->
    <van-popup
      v-model="isShowUpdateName"
      style="height: 100%"
      position="bottom"
    >
      <updata-name
        v-if="isShowUpdateName"
        v-model="user.name"
        @close="close"
      ></updata-name>
    </van-popup>

    <!-- 性别 -->
    <van-popup v-model="isShowUpdateSex" position="bottom">
      <updata-sex
        v-if="isShowUpdateSex"
        v-model="user.gender"
        @close="close"
      ></updata-sex>
    </van-popup>

    <!-- 出生年月 -->
    <van-popup v-model="isShowUpdateYear" position="bottom">
      <updata-birthday
        v-if="isShowUpdateYear"
        v-model="user.birthday"
        @close="close"
      ></updata-birthday>
    </van-popup>
  </div>
</template>

<script>
import UpdataPhoto from './components/updata-phtot.vue'
import UpdataBirthday from './components/updata-birthday.vue'
import UpdataSex from './components/updata-sex.vue'
import UpdataName from './components/updata-name.vue'
import { getUserProfile } from '@/api'
export default {
  name: 'UserProfile',
  components: {
    UpdataName,
    UpdataSex,
    UpdataBirthday,
    UpdataPhoto
  },
  data() {
    return {
      user: [],
      isShowUpdateName: false,
      isShowUpdateSex: false,
      isShowUpdateYear: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
      img: '',
      isShowUpdatePhoto: false
    }
  },
  computed: {
    sex() {
      const userSex = {
        0: '女',
        1: '男'
      }
      return userSex[this.user.gender]
    }
  },
  created() {
    this.loadProfile()
  },
  methods: {
    onFileChange() {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      console.log(this.img)
      this.isShowUpdatePhoto = true
      // 若选同名文件 下次就不会触发change事件 要把文件列表清空
      this.$refs.file.value = ''
    },
    close() {
      this.isShowUpdateName = false
      this.isShowUpdateSex = false
      this.isShowUpdatePhoto = false
    },
    async loadProfile() {
      try {
        const res = await getUserProfile()
        console.log(res)
        this.user = res.data.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-profile {
  .avatar {
    width: 30px;
    height: 30px;
  }
}
</style>
