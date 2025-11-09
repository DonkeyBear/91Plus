<script setup>
import { computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
    validator: (options) => {
      return options.every(opt =>
        Object.prototype.hasOwnProperty.call(opt, 'value')
        && Object.prototype.hasOwnProperty.call(opt, 'label'),
      )
    },
  },
})
const modelValue = defineModel()

const activatedIndex = computed(() => {
  return props.options.findIndex(option => option.value === modelValue.value)
})
</script>

<template>
  <div class="radio-buttons-container">
    <div
      v-for="(option, index) of props.options"
      :key="`${option.label}_${option.value}`"
      class="radio-button"
      :class="{ selected: modelValue === option.value }"
    >
      <button @click="modelValue = option.value">
        {{ option.label }}
      </button>
      <div
        v-if="index < props.options.length - 1"
        class="vertical-rule"
        :class="{ selected: index === activatedIndex || index === activatedIndex - 1 }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.radio-buttons-container {
  display: inline-flex;

  .radio-button {
    $border-radius: 50rem;
    $border-color: #c0c0c0;
    $border-color-active: color-mix(in srgb, dodgerblue 80%, black);

    display: flex;

    button {
      font-size: 0.75em;
      padding: 0.1em 0.5em;
      border: 1px solid $border-color;
      color: rgba($color: black, $alpha: 0.75);
      background: none;
      cursor: pointer;
      transition: all linear 0.1s;

      &:hover {
        background: rgba($color: black, $alpha: 0.05);
      }
    }

    &.selected {
      button {
        background: dodgerblue !important;
        border-color: $border-color-active;
        color: white;
      }
    }

    $side-padding-x: 0.65em;

    &:first-child {
      button {
        border-radius: $border-radius 0 0 $border-radius;
        border-right: none;
        padding-left: $side-padding-x;
      }
    }

    &:last-child {
      button {
        border-radius: 0 $border-radius $border-radius 0;
        border-left: none;
        padding-right: $side-padding-x;
      }
    }

    &:not(:first-child):not(:last-child) {
      button {
        border-right: none;
        border-left: none;
      }
    }

    .vertical-rule {
      width: 1px;
      background: $border-color;

      &.selected {
        background: $border-color-active;
      }
    }
  }
}
</style>
