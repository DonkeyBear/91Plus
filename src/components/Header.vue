<script setup>
import { ref } from 'vue';
import ToolbarIcon from './ToolbarIcon.vue';

const props = defineProps({
  active: Boolean
});

const searchText = ref('');
const search = () => {
  if (!searchText.value) { return }
  const url = `https://www.91pu.com.tw/plus/search.php?keyword=${searchText.value}`;
  window.open(url, '_blank').focus();
};

const backToPreviousPage = () => { history.back() };
</script>

<template>
  <Transition name="slide">
    <div id="plus91-header" v-show="props.active">
      <div class="header-container">
        <ToolbarIcon
          icon="chevron-left"
          stroke=".04rem"
          @click="backToPreviousPage"
        />
        <input
          type="text"
          placeholder="91 Plus"
          v-model.trim="searchText"
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
  border-radius: 0 0 1rem 1rem;
  border: 1px solid $toolbar-border-color;
  border-top: 0;

  input {
    flex-grow: 1;
    width: 100%;
    border-radius: 50rem;
    border: 0;
    font-size: .8rem;
    font-weight: bold;
    padding: .35rem 1.25rem;
    background: #fffa;
    color: #0009;
    opacity: .5;
    transition: all .2s;

    &:focus-visible {
      outline: 0;
      opacity: 1;
    }
  }
}
</style>