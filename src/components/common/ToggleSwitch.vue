<script setup>
const modelValue = defineModel({
  type: Boolean,
  default: false,
})
</script>

<template>
  <label class="toggle-switch">
    <input v-model="modelValue" type="checkbox" hidden>
    <div class="switch-track" :class="{ active: modelValue }">
      <div class="switch-thumb" />
    </div>
  </label>
</template>

<style scoped lang="scss">
$transition-duration: 0.3s;

$thumb-diameter: 1em;
$track-padding: 0.125em;
$track-width: calc($thumb-diameter * 2 + $track-padding * 2);
$track-height: calc($thumb-diameter + $track-padding * 2);

.toggle-switch {
  display: inline-flex;
  cursor: pointer;
}

.switch-track {
  position: relative;
  width: $track-width;
  height: $track-height;
  background: #ccc;
  border-radius: 50rem;
  transition: background $transition-duration;

  &.active {
    background: dodgerblue;

    .switch-thumb {
      transform: translateX(100%);
    }
  }
}

.switch-thumb {
  position: absolute;
  top: $track-padding;
  left: $track-padding;
  width: $thumb-diameter;
  height: $thumb-diameter;
  background: white;
  border-radius: 50%;
  transition: transform $transition-duration;
}
</style>
