<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'whitesmoke',
  },
  size: {
    type: String,
    default: '1rem',
  },
  stroke: {
    type: String,
    default: '0',
  },
  active: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <i :class="`bi bi-${props.icon}`" :active="props.active" />
</template>

<style scoped lang="scss">
.bi {
  color: v-bind(color);
  font-size: v-bind(size);
  -webkit-text-stroke: v-bind(stroke) v-bind(color);
  line-height: 0;

  &::before {
    transition: text-shadow 0.2s;
  }

  &[active='true']::before {
    text-shadow: 0 0 0.5rem color-mix(in srgb, var(--theme-color) 50%, white);
  }
}
</style>
