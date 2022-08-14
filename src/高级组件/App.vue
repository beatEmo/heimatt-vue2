<template>
  <div>
    <myform :v-model="user" :rules="rules">
      <mylabel label="用户">
        <myinpt v-model="user.name"></myinpt>
      </mylabel>
    </myform>
  </div>
</template>

<script>
import myinpt from "./components/myinpt.vue";
import myform from "./components/myform.vue";
import mylabel from "./components/mylabel.vue";

export default {
  components: {
    myinpt,
    myform,
    mylabel,
  },

  data() {
    return {
      user: {
        name: "www",
      },
      rules: {
        user: [
          {
            required: true,
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
