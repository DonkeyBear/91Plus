<script setup>
import { ref, watch } from 'vue';
import { useStore } from '../store';
import { getChordList, userAgent } from '../modules/utils';
import ChordChart from './ChordChart.vue';
import BootstrapIcon from './BootstrapIcon.vue';

const store = useStore();

const canShowChord = ref(true);
if (userAgent.browser.name === 'Mobile Safari') {
  canShowChord.value = false;
}

const bannerText = ref('');
const bannerTextList = [
  '此處的和弦圖示僅供參考！由於技術問題，目前尚無法準確繪製，尤其在把位較常出現錯誤，請注意。',
  '在 91 譜中沒有資料的和弦是畫不出來的呦！'
];

const randomIndex = ref(0);
const refreshBanner = () => {
  if (!canShowChord.value) {
    bannerText.value = '很抱歉，由於技術問題，你所使用的瀏覽器目前尚無法繪製出和弦圖，開發者正在試著修正這個問題，敬請期待更新。';
  } else {
    randomIndex.value = Math.floor(Math.random() * bannerTextList.length);
    bannerText.value = bannerTextList[randomIndex.value];
  }
};

// 在開啟這個 Popup 的時候才繪製和弦
const chordList = ref([]);
watch(store.isPopupShow, () => {
  if (!store.isPopupShow.chord) { return }

  refreshBanner();
  chordList.value = getChordList();
});
</script>

<template>
  <Transition name="slide-and-fade">
    <div id="plus91-chord-popup" v-show="store.isPopupShow.chord" :class="{ 'banner-only': !chordList.length }">
      <div class="banner">
        <BootstrapIcon icon="info-circle-fill" color="inherit" size="inherit" />
        <section>{{ bannerText }}</section>
      </div>
      <div class="chord-popup-container">
        <template v-for="chord of chordList" :key="`${chord}_${new Date().getTime()}`">
          <ChordChart :chord="chord" />
        </template>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import '../styles/mixins.scss';

@include transition-slide-and-fade;

#plus91-chord-popup {
  @include popup;

  $padding-x: 1rem;
  padding-left: $padding-x;
  padding-right: $padding-x;

  .banner {
    display: flex;
    align-items: center;
    background: rgba($toolbar-bg-color, .25);
    color: color-mix(in srgb, $toolbar-bg-color 50%, black 50%);
    border-radius: .5rem;
    padding: .5rem .75rem;
    margin-bottom: .25rem;

    section {
      flex-grow: 1;
      margin-left: .5rem;
    }
  }

  .chord-popup-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: .5rem;
    padding-top: .4rem;
  }

  &.banner-only {
    // 未顯示和弦，僅顯示 banner 時
    .banner {
      margin-bottom: 0;
      $warn-color: #f6d266;
      background: rgba($warn-color, .25);
      color: color-mix(in srgb, $warn-color 50%, black 35%);
    }

    .chord-popup-container {
      padding-top: 0;
    }
  }
}
</style>