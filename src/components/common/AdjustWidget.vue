<script setup>
import BootstrapIcon from '@/components/common/BootstrapIcon.vue'

const props = defineProps({
  iconLeft: {
    type: String,
    default: 'caret-left-fill',
  },
  iconRight: {
    type: String,
    default: 'caret-right-fill',
  },
  disabledLeft: {
    type: Boolean,
    default: false,
  },
  disabledMiddle: {
    type: Boolean,
    default: false,
  },
  disabledRight: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '#444',
  },
  size: {
    type: String,
    default: '1.25rem',
  },
  onclickLeft: Function,
  onclickMiddle: Function,
  onclickRight: Function,
})
</script>

<template>
  <div class="adjust-widget">
    <button
      class="adjust-button adjust-button-left"
      :disabled="props.disabledLeft"
      @click="props.onclickLeft"
    >
      <BootstrapIcon :icon="props.iconLeft" :color="props.color" :size="props.size" />
    </button>
    <button
      class="adjust-button adjust-button-middle"
      :disabled="props.disabledMiddle"
      @click="props.onclickMiddle"
    >
      <slot />
    </button>
    <button
      class="adjust-button adjust-button-right"
      :disabled="props.disabledRight"
      @click="props.onclickRight"
    >
      <BootstrapIcon :icon="props.iconRight" :color="props.color" :size="props.size" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.adjust-widget {
  display: flex;

  .adjust-button {
    $button-padding: 1rem;
    border: 0;
    border-radius: 0.25rem;
    background: transparent;

    &:hover {
      background: rgba($color: black, $alpha: 0.025);
    }

    &:not(:disabled) {
      cursor: pointer;
    }

    &:disabled {
      opacity: 0.25;
    }

    &.adjust-button-middle {
      flex-grow: 1;
      color: v-bind(color);
      font-size: calc(v-bind(size) * 0.75);
      font-weight: bold;
    }

    &.adjust-button-left {
      padding-right: $button-padding;
    }

    &.adjust-button-right {
      padding-left: $button-padding;
    }
  }
}
</style>
