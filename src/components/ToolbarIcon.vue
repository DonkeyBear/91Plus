<script setup>
const props = defineProps({
  icon: String,
  color: {
    type: String,
    default: '#fffe'
  }
});
</script>

<template>
  <span class="material-symbols-rounded">
    {{ icon }}
  </span>
</template>

<style scoped lang="scss">
.material-symbols-rounded {
  cursor: pointer;
  user-select: none;
  color: v-bind(color);
  font-size: 1.25rem;
  padding: 0 .75rem;
}
</style>