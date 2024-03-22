<script setup>
import BootstrapIcon from './BootstrapIcon.vue';

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  stroke: {
    type: String,
    default: '0'
  },
  active: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'whitesmoke'
  }
});
</script>

<template>
  <div class="toolbar-icon">
    <BootstrapIcon :icon="props.icon" :color="props.color" size="1.3rem" :stroke="props.stroke"
      :active="props.active" />
  </div>
</template>

<style scoped lang="scss">
.toolbar-icon {
  cursor: pointer;
  padding: 0.25rem 0.75rem;
}
</style>