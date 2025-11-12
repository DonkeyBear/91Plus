<script setup>
import { useCssVar } from '@vueuse/core'
import { ElOption, ElSelect, ElSwitch } from 'element-plus'
import { watch } from 'vue'
import colors from '@/assets/colors.json'
import themes from '@/assets/themes.json'
import BootstrapIcon from '@/components/common/BootstrapIcon.vue'
import PopupBase from '@/components/common/PopupBase.vue'
import { useStore } from '@/store'

const store = useStore()

const themeColor = useCssVar('--theme-color', document.documentElement)
watch(() => store.themeColor, (newColor) => {
  themeColor.value = newColor
}, { immediate: true })

watch(() => store.theme, (newTheme) => {
  document.documentElement.setAttribute('theme', newTheme)
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
        <ElSelect v-model="store.themeColor">
          <ElOption v-for="item in colors" :key="item.value" :label="item.label" :value="item.value">
            <div class="color-option" style="display: flex; align-items: center;">
              <div
                class="color-swatch" :style="{
                  width: '1em',
                  height: '1em',
                  borderRadius: '0.25em',
                  marginRight: '0.5em',
                  backgroundColor: item.value,
                }"
              />
              <span>{{ item.label }}</span>
            </div>
          </ElOption>
        </ElSelect>
      </div>
      <div class="setting-item">
        <div>
          <BootstrapIcon icon="moon" />
          深色模式
        </div>
        <ElSelect v-model="store.theme">
          <ElOption v-for="item in themes" :key="item.value" :label="item.label" :value="item.value" />
        </ElSelect>
      </div>
      <label class="setting-item">
        <div>
          <BootstrapIcon icon="cloudy" />
          協助測試雲端樂譜
        </div>
        <ElSwitch v-model="store.agreeToArchiveSheet" />
      </label>
      <label class="setting-item">
        <div>
          <BootstrapIcon icon="code-slash" />
          開發者模式
        </div>
        <ElSwitch v-model="store.isDevMode" />
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
    height: 1.25em;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: rgba($color: black, $alpha: 0.8);
    cursor: pointer;

    &:hover {
      background: rgba($color: black, $alpha: 0.05);
    }
  }

  .el-select {
    width: 10em;
  }

  .el-switch {
    height: unset;
  }
}
</style>
