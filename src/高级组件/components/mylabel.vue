<template>
  <div>
    <span>{{ label ? label : "标题" }}</span>
    <slot></slot>
    <p v-if="errormsg" style="color: red">{{ errormsg }}</p>
  </div>
</template>

<script>
export default {
  props: ["label"],
  data() {
    return {
      errormsg: "ssscaf",
    };
  },
  created() {
    this.$on("checkname", () => {});
  },
};
</script>

<style lang="scss" scoped></style>
