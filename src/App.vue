<script setup>
import { onClickOutside, useParentElement } from '@vueuse/core'
import { ElConfigProvider } from 'element-plus'
import { computed } from 'vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import DarkModeOverlay from '@/components/DarkModeOverlay.vue'
import ErudaContainer from '@/components/ErudaContainer.vue'
import { useStore } from '@/store'

const store = useStore()
const isDarkMode = computed(() => store.theme.includes('dark'))

const parent = useParentElement()
onClickOutside(parent, (e) => {
  const isElementPlus = e.target.closest('[id^="el-"]')
  if (isElementPlus) {
    return
  }
  store.toggleToolbars()
})
</script>

<template>
  <ElConfigProvider size="small">
    <AppHeader :active="store.isToolbarsShow" />
    <AppFooter :active="store.isToolbarsShow" />
    <DarkModeOverlay :active="isDarkMode" />
    <ErudaContainer />
  </ElConfigProvider>
</template>
