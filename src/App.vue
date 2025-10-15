<script setup>
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import DarkModeOverlay from './components/DarkModeOverlay.vue'
import TriggerOverlay from './components/TriggerOverlay.vue'
import { useStore } from './store'

const store = useStore()
</script>

<template>
  <TriggerOverlay @click="store.toggleToolbars" />
  <AppHeader :active="store.isToolbarsShow" />
  <AppFooter :active="store.isToolbarsShow" />
  <DarkModeOverlay :active="store.isDarkMode" />
</template>
