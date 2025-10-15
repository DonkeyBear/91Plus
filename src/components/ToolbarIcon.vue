<script setup>
import BootstrapIcon from './BootstrapIcon.vue'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: '',
  },
  stroke: {
    type: String,
    default: '0',
  },
  active: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'whitesmoke',
  },
})
</script>

<template>
  <div class="toolbar-icon">
    <BootstrapIcon
      size="1.3rem"
      :icon="props.icon"
      :color="props.color"
      :stroke="props.stroke"
      :active="props.active"
    />
    <div class="toolbar-icon-text">
      {{ props.text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../styles/variables.scss';

.toolbar-icon {
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.toolbar-icon-text {
  color: color-mix(in srgb, v-bind(color) 70%, $toolbar-bg-color);
  font-size: 0.5rem;
  $spacing: 0.15rem;
  letter-spacing: $spacing;
  margin-right: -$spacing; // 用於抵銷 letter-spacing 對最後一個字的影響
}
</style>
