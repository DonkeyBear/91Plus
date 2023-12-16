<script setup>
import BootstrapIcon from './BootstrapIcon.vue';

const props = defineProps({
  iconLeft: {
    type: String,
    default: 'caret-left-fill'
  },
  iconRight: {
    type: String,
    default: 'caret-right-fill'
  },
  color: {
    type: String,
    default: '#444'
  },
  size: {
    type: String,
    default: '1.25rem'
  },
  onclickLeft: Function,
  onclickMiddle: Function,
  onclickRight: Function
});
</script>

<template>
  <div class="adjust-widget">
    <button class="adjust-button adjust-button-left" @click="onclickLeft">
      <BootstrapIcon :icon="iconLeft" :color="color" :size="size" />
    </button>
    <button class="adjust-button adjust-button-middle" @click="onclickMiddle">
      <slot></slot>
    </button>
    <button class="adjust-button adjust-button-right" @click="onclickRight">
      <BootstrapIcon :icon="iconRight" :color="color" :size="size" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.adjust-widget {
  display: flex;

  .adjust-button {
    $button-padding: 1rem;
    border: 0;
    border-radius: .25rem;
    background: transparent;
    transition: color .1s;

    &:hover {
      background: rgba($color: black, $alpha: .025);
    }

    &.adjust-button-middle {
      flex-grow: 1;
      color: v-bind(color);
      font-size: calc(v-bind(size) * .75);
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