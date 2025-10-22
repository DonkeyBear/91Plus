<script setup>
import { computed } from 'vue'
import AdjustWidget from '@/components/common/AdjustWidget.vue'
import PopupBase from '@/components/common/PopupBase.vue'
import { useStore } from '@/store'

const store = useStore()

const getFontSize = computed(() => store.originalFontSize + store.fontSizeDelta)
</script>

<template>
  <PopupBase id="plus91-font-popup" v-model="store.isPopupShow.font">
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
  </PopupBase>
</template>
