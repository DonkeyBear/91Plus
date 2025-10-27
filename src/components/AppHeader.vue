<script setup>
import { ref } from 'vue'
import ToolbarIcon from '@/components/common/ToolbarIcon.vue'

const props = defineProps({
  active: Boolean,
})

const isSearchInputFocused = ref(false)

const searchText = ref('')
function search() {
  if (!searchText.value) {
    return
  }
  const url = `https://www.91pu.com.tw/plus/search.php?keyword=${searchText.value}`
  window.open(url, '_blank').focus()
  searchText.value = ''
}

function backToPreviousPage() {
  history.back()
}
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
        <form @submit.prevent="search">
          <div class="search-container">
            <input
              v-model.trim="searchText"
              type="text"
              placeholder="搜尋樂譜 —— 91 Plus"
              @keydown.esc.stop="(event) => { event.target.blur() }"
              @focus="isSearchInputFocused = true"
              @blur="isSearchInputFocused = false"
            >
            <ToolbarIcon
              v-if="searchText"
              class="clear-input"
              icon="x"
              :color="isSearchInputFocused ? '#0007' : '#fffa'"
              @click="() => { searchText = '' }"
            />
          </div>
        </form>
        <ToolbarIcon
          icon="search"
          stroke=".03rem"
          @click="search"
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@use '@/styles/mixins.scss';
@use '@/styles/transitions.scss';

@include transitions.slide(up);

#plus91-header {
  @include mixins.toolbar;
  top: 0;
}

.header-container {
  @include mixins.toolbar-container;

  @include mixins.breakpoint-large {
    border-radius: 0 0 1rem 1rem;
  }

  border-bottom: 1px solid var(--toolbar-border-color);

  form,
  .search-container {
    display: flex;
    flex: 1;
    height: 100%;
  }

  .search-container {
    position: relative;
    .clear-input {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  input {
    flex: 1;
    border-radius: 50rem;
    border: 0;
    font-size: 0.8rem;
    font-weight: bold;
    $padding-x: 1.25rem;
    padding-left: $padding-x;
    padding-right: $padding-x;
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
