<script setup>
import { unsafeWindow } from '$'
import { useScriptTag } from '@vueuse/core'
import { useTemplateRef, watch } from 'vue'
import MonkeyStorage from '../modules/MonkeyStorage'
import { useStore } from '../store'

const store = useStore()

const erudaContainer = useTemplateRef('eruda-container')

function initEruda() {
  const erudaEl = document.createElement('div')
  erudaContainer.value.appendChild(erudaEl)
  unsafeWindow.eruda.init({ container: erudaEl })
  unsafeWindow.eruda.get('snippets').clear()
  unsafeWindow.eruda.get('snippets').add('儲存模式', () => {
    // eslint-disable-next-line no-console
    console.log(`[91 Plus] 儲存模式：${MonkeyStorage.getStorageType()}`)
  }, '在控制台顯示目前的儲存模式')
}

watch(() => store.isDevMode, (newVal) => {
  if (newVal) {
    // 開啟開發者模式時載入 eruda
    if (!unsafeWindow.eruda) {
      useScriptTag('https://cdn.jsdelivr.net/npm/eruda/eruda.min.js', initEruda)
    }
    else {
      initEruda()
    }
  }
  else {
    // 關閉開發者模式時移除 eruda
    unsafeWindow.eruda?.destroy()
  }
}, { immediate: true })
</script>

<template>
  <div ref="eruda-container" />
</template>
