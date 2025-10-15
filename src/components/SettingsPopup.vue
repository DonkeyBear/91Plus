<script setup>
import { useStore } from '../store'

const store = useStore()
</script>

<template>
  <Transition name="slide-and-fade">
    <div v-show="store.isPopupShow.settings" id="plus91-settings-popup">
      <div class="settings-popup-container">
        <label class="setting-item">
          <span>深色模式</span>
          <input v-model="store.isDarkMode" type="checkbox">
        </label>
        <label class="setting-item">
          <span>協助測試雲端備份樂譜功能</span>
          <input v-model="store.agreeToArchiveSheet" type="checkbox">
        </label>
        <label class="setting-item">
          <span>開發者模式</span>
          <input v-model="store.isDevMode" type="checkbox">
        </label>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import '../styles/mixins.scss';

@include transition-slide-and-fade;

#plus91-settings-popup {
  @include popup;

  $padding-x: 1rem;
  padding-left: $padding-x;
  padding-right: $padding-x;

  .setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
      background: rgba($color: black, $alpha: 0.05);
    }
  }
}
</style>
