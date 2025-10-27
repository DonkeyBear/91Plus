<script setup>
import BootstrapIcon from '@/components/common/BootstrapIcon.vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
    validator: (options) => {
      return options.every(opt => typeof opt === 'string')
    },
  },
})
const modelValue = defineModel()
</script>

<template>
  <div class="color-switcher-container">
    <div
      v-for="option of props.options"
      :key="option"
      class="color-switcher-option"
      :style="{
        background: `color-mix(in srgb, ${option} 75%, white)`,
        borderColor: `color-mix(in srgb, ${option} 80%, white)`,
      }"
      @click="() => modelValue = option"
    >
      <BootstrapIcon
        v-if="modelValue === option"
        icon="check"
        :color="`color-mix(in srgb, ${option} 25%, white)`"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.color-switcher-container {
  display: flex;
  .color-switcher-option {
    // $border-radius: 0.35em;
    $border-radius: 50rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25em;
    height: 1em;
    cursor: pointer;
    border-style: solid;
    border-width: 0;
    border-top-width: 1px;
    border-bottom-width: 1px;

    &:first-child {
      border-radius: $border-radius 0 0 $border-radius;
      border-left-width: 1px;
      width: 1.3em;
    }

    &:last-child {
      border-radius: 0 $border-radius $border-radius 0;
      border-right-width: 1px;
      width: 1.3em;
    }
  }
}
</style>
