<script setup>
import { unsafeWindow } from '$'
import { useScriptTag, watchImmediate } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import MonkeyStorage from '@/modules/MonkeyStorage'
import { useStore } from '@/store'

const store = useStore()

const thisWindow = unsafeWindow ?? window
const erudaContainer = useTemplateRef('eruda-container')

function initEruda() {
  const erudaEl = document.createElement('div')
  erudaContainer.value.appendChild(erudaEl)
  thisWindow.eruda.init({ container: erudaEl })
  thisWindow.eruda.get('snippets').clear()
  thisWindow.eruda.get('snippets').add('儲存模式', () => {
    // eslint-disable-next-line no-console
    console.log(`[91 Plus] 儲存模式：${MonkeyStorage.getStorageType()}`)
  }, '在控制台顯示目前的儲存模式')
}

function handleEruda(isDevMode) {
  if (isDevMode) {
    // 開啟開發者模式時載入 eruda
    if (!thisWindow.eruda) {
      useScriptTag('https://cdn.jsdelivr.net/npm/eruda/eruda.min.js', initEruda)
    }
    else {
      initEruda()
    }
  }
  else {
    // 關閉開發者模式時移除 eruda
    thisWindow.eruda?.destroy()
  }
}

watchImmediate(() => store.isDevMode, handleEruda)
</script>

<template>
  <div ref="eruda-container" />
</template>
