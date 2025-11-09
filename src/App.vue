<script setup>
import { onClickOutside, useParentElement } from '@vueuse/core'
import { computed } from 'vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import DarkModeOverlay from '@/components/DarkModeOverlay.vue'
import ErudaContainer from '@/components/ErudaContainer.vue'
import { useStore } from '@/store'

const store = useStore()
const isDarkMode = computed(() => store.theme.includes('dark'))

const parent = useParentElement()
onClickOutside(parent, store.toggleToolbars)
</script>

<template>
  <AppHeader :active="store.isToolbarsShow" />
  <AppFooter :active="store.isToolbarsShow" />
  <DarkModeOverlay :active="isDarkMode" />
  <ErudaContainer />
</template>
