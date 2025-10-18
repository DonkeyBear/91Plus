<script setup>
import BootstrapIcon from './BootstrapIcon.vue'

const modelValue = defineModel({
  type: Boolean,
  default: false,
})
</script>

<template>
  <div class="checkbox">
    <BootstrapIcon
      v-if="modelValue"
      class="checked"
      icon="check-square-fill"
    />
    <div v-else class="unchecked" />
    <input v-model="modelValue" type="checkbox" hidden>
  </div>
</template>

<style scoped lang="scss">
$size: 1em;

.checked {
  cursor: pointer;
  font-size: $size;
  color: dodgerblue;
}

.unchecked {
  width: $size;
  height: $size;
  border: 1px solid darkgray;
  border-radius: 0.15em;
}
</style>
