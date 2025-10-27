<script setup>
const props = defineProps({
  active: Boolean,
})
</script>

<template>
  <Transition name="fade">
    <div v-show="props.active" id="dark-mode-overlay" />
  </Transition>
</template>

<style scoped lang="scss">
@use '@/styles/variables.scss';
@use '@/styles/mixins.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#dark-mode-overlay {
  @include mixins.overlay;
  z-index: variables.$z-dark-mode-overlay;
  backdrop-filter: invert(1) hue-rotate(145deg) saturate(0.75);
  pointer-events: none;
}
</style>
