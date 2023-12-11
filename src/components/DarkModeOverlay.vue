<script setup>
const props = defineProps({
  active: Boolean
})
</script>

<template>
  <Transition name="fade">
    <div id="dark-mode-overlay" v-show="active"></div>
  </Transition>
</template>

<style scoped lang="scss">
@import '../styles/mixins.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#dark-mode-overlay {
  @include overlay;
  z-index: 1000;
  backdrop-filter: invert(1) hue-rotate(145deg) saturate(.75);
  pointer-events: none;
}
</style>