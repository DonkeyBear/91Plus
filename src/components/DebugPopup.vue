<script setup>
import { computed } from 'vue'
import { useStore } from '../store'

const store = useStore()

const displayedLogs = computed(() => {
  return store.logs.map((log) => {
    const { timestamp, level, message } = log
    return `[${timestamp}] [${level.toUpperCase()}] ${JSON.stringify(message)}`
  }).join('\n')
})
</script>

<template>
  <Transition name="slide-and-fade">
    <div v-show="store.isPopupShow.debug" id="plus91-debug-popup">
      <div class="debug-popup-container">
        <pre>{{ displayedLogs }}</pre>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import '../styles/mixins.scss';

@include transition-slide-and-fade;

#plus91-debug-popup {
  @include popup;

  $padding-x: 1rem;
  padding-left: $padding-x;
  padding-right: $padding-x;
  height: 50vh;

  .debug-popup-container {
    height: 100%;
  }

  pre {
    box-sizing: border-box;
    height: 100%;
    margin: 0;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background: rgba($color: black, $alpha: 0.85);
    overflow-x: auto;
  }
}
</style>
