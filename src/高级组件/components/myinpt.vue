<template>
  <div>
    <input type="text" :value="value" @blur="fn" />
  </div>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    fn(e) {
      this.$emit("input", e.target.value);
      this.$parent.$emit("checkname");
    },
  },
};
</script>

<style lang="scss" scoped></style>
