<template>
  <div>
    <!-- <ul>
      <li v-for="(item, index) in arr" :key="index">{{ item }}</li>
      <button @click="fn">+1</button>
    </ul> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    }
  },
  methods: {
    fn() {
      this.arr.push(100)
    }
  }
}
</script>

<style lang="scss" scoped></style>
