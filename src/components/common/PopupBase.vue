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
@use '@/styles/mixins.scss';
@use '@/styles/transitions.scss';

@include transitions.slide-and-fade;

.plus91-popup {
  @include mixins.popup;

  $padding-x: 1rem;
  padding-left: $padding-x;
  padding-right: $padding-x;
}
</style>
