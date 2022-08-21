<template>
  <div style="margin: 5px">
    <ul>
      <li v-cloak v-for="(item, index) of allarcs" :key="index">
        {{ item.name }}
      </li>
    </ul>
    {{ allarcs }} - {{ curarc }}
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: channelsState, mapActions: channelsActions } =
  createNamespacedHelpers('channels')
export default {
  created() {
    this.getChannels()
  },
  computed: {
    ...channelsState({
      allarcs: (state) => state.allarcs,
      curarc: (state) => state.curarc
    })
  },
  methods: {
    ...channelsActions(['getChannels'])
  }
}
</script>

<style lang="scss" scoped>
li {
  // list-style: 'none';
  // padding: 5px;
  margin: 4px;
}
</style>
