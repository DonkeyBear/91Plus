<script setup>
import ToolbarIcon from './ToolbarIcon.vue';

const props = defineProps({
  icon: String,
  name: String,
  color: String
});
</script>

<template>
  <div class="icon-button">
    <ToolbarIcon :icon="props.icon" :color="props.color" />
    <div class="button-text">{{ props.name }}</div>
  </div>
</template>

<style scoped lang="scss">
.icon-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0 .6rem .4rem;
  border-radius: .25rem;

  &:hover {
    background: rgba($color: black, $alpha: .025);
  }

  .button-text {
    font-size: .5rem;
    color: v-bind(color);
  }
}
</style>