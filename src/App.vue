<script setup>
import { onClickOutside, useParentElement } from '@vueuse/core'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import DarkModeOverlay from './components/DarkModeOverlay.vue'
import { useStore } from './store'

const store = useStore()

const parent = useParentElement()
onClickOutside(parent, store.toggleToolbars)
</script>

<template>
  <AppHeader :active="store.isToolbarsShow" />
  <AppFooter :active="store.isToolbarsShow" />
  <DarkModeOverlay :active="store.isDarkMode" />
</template>
