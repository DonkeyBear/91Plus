<script setup>
import { ref } from 'vue'
import ToolbarIcon from './ToolbarIcon.vue'

const props = defineProps({
  active: Boolean,
})

const searchText = ref('')
function search() {
  if (!searchText.value) { return }
  const url = `https://www.91pu.com.tw/plus/search.php?keyword=${searchText.value}`
  window.open(url, '_blank').focus()
  searchText.value = ''
}

function backToPreviousPage() { history.back() }
</script>

<template>
  <Transition name="slide">
    <div v-show="props.active" id="plus91-header">
      <div class="header-container">
        <ToolbarIcon
          icon="chevron-left"
          stroke=".04rem"
          @click="backToPreviousPage"
        />
        <input
          v-model.trim="searchText"
          type="text"
          placeholder="91 Plus"
          @keydown.enter="search"
          @keydown.esc="(event) => { event.target.blur() }"
        >
        <ToolbarIcon
          icon="search"
          stroke=".03rem"
          @click="search()"
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import '../styles/mixins.scss';

@include transition-slide(up);

#plus91-header {
  @include toolbar;
  top: 0;
}

.header-container {
  @include toolbar-container;

  @include breakpoint-large {
    border-radius: 0 0 1rem 1rem;
  }

  border-bottom: 1px solid $toolbar-border-color;

  input {
    flex-grow: 1;
    width: 100%;
    border-radius: 50rem;
    border: 0;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0.35rem 1.25rem;
    background: #fffa;
    color: #0009;
    opacity: 0.5;
    transition: all 0.2s;

    &:focus-visible {
      outline: 0;
      opacity: 1;
    }
  }
}
</style>
