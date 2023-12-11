<script setup>
import TriggerOverlay from './components/TriggerOverlay.vue';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import DarkModeOverlay from './components/DarkModeOverlay.vue';
import { useStore } from './store';

const store = useStore();
</script>

<template>
  <TriggerOverlay @click="store.toggleToolbars" />
  <Header :active="store.isToolbarsShow" />
  <Footer :active="store.isToolbarsShow" />
  <DarkModeOverlay :active="store.isDarkMode" />
</template>