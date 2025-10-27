<script setup>
import { useCssVar } from '@vueuse/core'
import { watch } from 'vue'
import colors from '@/assets/colors.json'
import BootstrapIcon from '@/components/common/BootstrapIcon.vue'
import ColorSwitcher from '@/components/common/ColorSwitcher.vue'
import PopupBase from '@/components/common/PopupBase.vue'
import ToggleSwitch from '@/components/common/ToggleSwitch.vue'
import { useStore } from '@/store'

const store = useStore()

const themeColor = useCssVar('--theme-color', document.documentElement)
watch(() => store.themeColor, (newColor) => {
  themeColor.value = newColor
}, { immediate: true })
</script>

<template>
  <PopupBase id="plus91-settings-popup" v-model="store.isPopupShow.settings">
    <div class="settings-popup-container">
      <div class="setting-item">
        <div>
          <BootstrapIcon icon="palette" />
          主題色
        </div>
        <ColorSwitcher v-model="store.themeColor" :options="colors" />
      </div>
      <label class="setting-item">
        <div>
          <BootstrapIcon icon="moon" />
          深色模式
        </div>
        <ToggleSwitch v-model="store.isDarkMode" />
      </label>
      <label class="setting-item">
        <div>
          <BootstrapIcon icon="cloudy" />
          協助測試雲端樂譜
        </div>
        <ToggleSwitch v-model="store.agreeToArchiveSheet" />
      </label>
      <label class="setting-item">
        <div>
          <BootstrapIcon icon="code-slash" />
          開發者模式
        </div>
        <ToggleSwitch v-model="store.isDevMode" />
      </label>
    </div>
  </PopupBase>
</template>

<style scoped lang="scss">
#plus91-settings-popup {
  .bi {
    color: darkgray;
    margin-right: 0.25em;
    font-size: 1em;
  }

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
