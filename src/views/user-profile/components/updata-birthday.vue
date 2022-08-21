<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onCommitBirthdate"
      @change="onchangeBirthdate"
    />
  </div>
</template>

<script>
export default {
  name: 'UpdataBirthday',
  props: {
    value: {
      type: [String, Date],
      required: true
    }
  },
  created() {
    this.$parent.$on('ccc', function (event) {
      console.log(this, event)
    })
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date('1990-11-20')
    }
  },
  methods: {
    fn() {
      this.$parent.$emit('ccc')
    },
    onchangeBirthdate(picker) {
      console.log(picker)
    },
    onCommitBirthdate(value) {}
  }
}
</script>

<style lang="scss" scoped></style>
