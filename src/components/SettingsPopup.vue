<script setup>
import PopupBase from '@/components/common/PopupBase.vue'
import ToggleSwitch from '@/components/common/ToggleSwitch.vue'
import { useStore } from '@/store'

const store = useStore()
</script>

<template>
  <PopupBase id="plus91-settings-popup" v-model="store.isPopupShow.settings">
    <div class="settings-popup-container">
      <label class="setting-item">
        <span>深色模式</span>
        <ToggleSwitch v-model="store.isDarkMode" />
      </label>
      <label class="setting-item">
        <span>協助測試雲端備份樂譜功能</span>
        <ToggleSwitch v-model="store.agreeToArchiveSheet" />
      </label>
      <label class="setting-item">
        <span>開發者模式</span>
        <ToggleSwitch v-model="store.isDevMode" />
      </label>
    </div>
  </PopupBase>
</template>

<style scoped lang="scss">
#plus91-settings-popup {
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
