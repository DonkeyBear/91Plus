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
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#dark-mode-overlay {
  @include overlay;
  z-index: $z-dark-mode-overlay;
  backdrop-filter: invert(1) hue-rotate(145deg) saturate(0.75);
  pointer-events: none;
}
</style>
