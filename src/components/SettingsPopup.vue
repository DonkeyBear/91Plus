<script setup>
import CheckBox from '@/components/common/CheckBox.vue'
import { useStore } from '@/store'

const store = useStore()
</script>

<template>
  <Transition name="slide-and-fade">
    <div v-show="store.isPopupShow.settings" id="plus91-settings-popup">
      <div class="settings-popup-container">
        <label class="setting-item">
          <span>深色模式</span>
          <CheckBox v-model="store.isDarkMode" />
        </label>
        <label class="setting-item">
          <span>協助測試雲端備份樂譜功能</span>
          <CheckBox v-model="store.agreeToArchiveSheet" />
        </label>
        <label class="setting-item">
          <span>開發者模式</span>
          <CheckBox v-model="store.isDevMode" />
        </label>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';

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
    color: rgba($color: black, $alpha: 0.8);
    cursor: pointer;

    &:hover {
      background: rgba($color: black, $alpha: 0.05);
    }
  }
}
</style>
