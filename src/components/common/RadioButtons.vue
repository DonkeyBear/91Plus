<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
})
const modelValue = defineModel()
</script>

<template>
  <div class="radio-buttons-container">
    <button
      v-for="option in props.options"
      :key="JSON.stringify(option)"
      :class="{ active: modelValue === option.value }"
      @click="modelValue = option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.radio-buttons-container {
  display: flex;

  button {
    font-size: 0.75em;
    padding: 0.1em 0.4em;
    border: 1px solid darkgray;
    color: rgba($color: black, $alpha: 0.75);
    background: none;
    cursor: pointer;

    &.active {
      background: dodgerblue !important;
      color: white;
    }

    &:hover {
      background: rgba($color: black, $alpha: 0.05);
    }

    $border-radius: 0.25em;

    &:first-child {
      border-radius: $border-radius 0 0 $border-radius;
    }

    &:last-child {
      border-radius: 0 $border-radius $border-radius 0;
    }

    &:not(:last-child) {
      border-right: none;
    }
  }
}
</style>
