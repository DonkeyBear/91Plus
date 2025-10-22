<script setup>
import { ref, watch } from 'vue'
import BootstrapIcon from '@/components/common/BootstrapIcon.vue'
import ChordChart from '@/components/common/ChordChart.vue'
import PopupBase from '@/components/common/PopupBase.vue'
import { getChordList } from '@/modules/utils'
import { useStore } from '@/store'

const store = useStore()

const bannerText = ref('')
const bannerTextList = [
  '此處的和弦圖示僅供參考！由於技術問題，目前尚無法準確繪製，尤其在把位較常出現錯誤，請注意。',
  '在 91 譜中沒有資料的和弦是畫不出來的呦！',
]

const randomIndex = ref(0)
function refreshBanner() {
  randomIndex.value = Math.floor(Math.random() * bannerTextList.length)
  bannerText.value = bannerTextList[randomIndex.value]
}

// 在開啟這個 Popup 的時候才繪製和弦
const chordList = ref([])
watch(store.isPopupShow, () => {
  if (!store.isPopupShow.chord) {
    return
  }

  refreshBanner()
  chordList.value = getChordList()
})
</script>

<template>
  <PopupBase
    id="plus91-chord-popup"
    v-model="store.isPopupShow.chord"
    :class="{ 'banner-only': !chordList.length }"
  >
    <div class="banner">
      <BootstrapIcon icon="info-circle-fill" color="inherit" size="inherit" />
      <section>{{ bannerText }}</section>
    </div>
    <div class="chord-popup-container">
      <template v-for="chord of chordList" :key="chord">
        <ChordChart :chord="chord" />
      </template>
    </div>
  </PopupBase>
</template>

<style scoped lang="scss">
#plus91-chord-popup {
  .banner {
    display: flex;
    align-items: center;
    background: color-mix(in srgb, var(--toolbar-bg-color) 25%, transparent);
    color: color-mix(in srgb, var(--toolbar-bg-color) 50%, black);
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.25rem;

    section {
      flex-grow: 1;
      margin-left: 0.5rem;
    }
  }

  .chord-popup-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 0.5rem;
    padding-top: 0.4rem;
  }

  &.banner-only {
    // 未顯示和弦，僅顯示 banner 時
    .banner {
      margin-bottom: 0;
      $warn-color: #f6d266;
      background: rgba($warn-color, 0.25);
      color: color-mix(in srgb, $warn-color 50%, black 35%);
    }

    .chord-popup-container {
      padding-top: 0;
    }
  }
}
</style>
