<script setup>
const modelValue = defineModel()
</script>

<template>
  <Transition name="slide-and-fade">
    <div v-show="modelValue" class="plus91-popup">
      <slot />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';

@include transition-slide-and-fade;

.plus91-popup {
  @include popup;

  $padding-x: 1rem;
  padding-left: $padding-x;
  padding-right: $padding-x;
}
</style>
