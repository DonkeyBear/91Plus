<script setup>
import { computed } from 'vue';
import { useStore } from '../store';
import AdjustWidget from './AdjustWidget.vue';

const store = useStore();

const getFontSize = computed(() => { return store.originalFontSize + store.fontSizeDelta });
</script>

<template>
  <Transition name="slide-and-fade">
    <div id="plus91-font-popup" v-show="store.isPopupShow.font">
      <div class="font-popup-container">
        <AdjustWidget
          :onclick-left="() => { store.fontSizeDelta-- }"
          :onclick-middle="() => { store.fontSizeDelta = 0 }"
          :onclick-right="() => { store.fontSizeDelta++ }"
          :disabled-left=" getFontSize <= 8 "
          :disabled-right=" getFontSize >= 30 "
        >
          {{ getFontSize }}px
        </AdjustWidget>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import '../styles/mixins.scss';

@include transition-slide-and-fade;

#plus91-font-popup {
  @include popup;
}
</style>