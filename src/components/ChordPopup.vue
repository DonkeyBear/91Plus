<script setup>
import { ref, watch } from 'vue';
import { useStore } from '../store';
import { getChordList } from '../modules/utils';
import ChordChart from './ChordChart.vue';
import BootstrapIcon from './BootstrapIcon.vue';

const store = useStore();

// 在開啟這個 Popup 的時候才繪製和弦
const chordList = ref([]);
watch(store.isPopupShow, () => {
  if (!store.isPopupShow.chord) { return }

  chordList.value = getChordList();
});
</script>

<template>
  <Transition name="slide-and-fade">
    <div id="plus91-chord-popup" v-show="store.isPopupShow.chord">
      <div class="banner">
        <BootstrapIcon icon="info-circle-fill" color="inherit" size="inherit" />
        <section>此處的和弦圖示僅供參考，尤其把位部分較常出現錯誤，請注意。</section>
      </div>
      <div class="chord-popup-container">
        <template v-for="chord of chordList" :key="`${chord}_${new Date().getTime()}`">
          <ChordChart :chord="chord"></ChordChart>
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
}
</style>