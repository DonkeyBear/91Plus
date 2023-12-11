<script setup>
import { useStore } from '../store';

const store = useStore();
</script>

<template>
  <Transition name="slide-and-fade">
    <div id="plus91-settings-popup" v-show="store.isPopupShow.settings">
      <div class="settings-popup-container">
        <label class="setting-item">
          <span>深色模式</span>
          <input type="checkbox" v-model="store.isDarkMode">
        </label>
        <label class="setting-item">
          <span>協助測試雲端備份樂譜功能</span>
          <input type="checkbox" v-model="store.agreeToArchiveSheet">
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
    padding: .5rem 1rem;
    border-radius: .5rem;
    cursor: pointer;

    &:hover {
      background: rgba($color: black, $alpha: .05);
    }
  }
}
</style>