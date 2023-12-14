<script setup>
const props = defineProps({
  icon: String,
  color: {
    type: String,
    default: '#fffe'
  },
  active: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <span class="material-symbols-rounded" :active="active">
    {{ icon }}
  </span>
</template>

<style scoped lang="scss">
.material-symbols-rounded {
  cursor: pointer;
  user-select: none;
  color: v-bind(color);
  font-size: 1.5rem;
  padding: .25rem .75rem;
  transition: text-shadow .3s;

  &[active="true"] {
    text-shadow: 0 0 1rem rgba(50, 80, 200, 1);
  }
}
</style>