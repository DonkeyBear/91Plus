<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'whitesmoke'
  },
  size: {
    type: String,
    default: '1rem'
  },
  stroke: {
    type: String,
    default: '0'
  },
  active: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <i :class="`bi bi-${icon}`" :active="active"></i>
</template>

<style scoped lang="scss">
.bi {
  color: v-bind(color);
  font-size: v-bind(size);
  -webkit-text-stroke: v-bind(stroke) v-bind(color);
  
  &::before {
    transition: text-shadow .2s;
  }

  &[active="true"]::before {
    text-shadow: 0 0 .5rem rgb(75, 156, 169);
  }
}
</style>