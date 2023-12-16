<script setup>
import { useStore } from '../store';
import AdjustWidget from './AdjustWidget.vue';

const store = useStore();
</script>

<template>
  <Transition name="slide-and-fade">
    <div id="plus91-sheet-popup" v-show="store.isPopupShow.sheet">
      <div class="sheet-popup-container">
        <AdjustWidget
          :onclick-left="() => { store.plusTranspose(-1) }"
          :onclick-middle="() => { store.transpose = 0 }"
          :onclick-right="() => { store.plusTranspose(1) }"
        >
          CAPO：<span class="text-capo">{{ store.currentCapo }}</span>
          (<span class="text-key" v-html="store.currentKey"></span>)
        </AdjustWidget>
        <div class="transpose-range-container">
          <input type="range" min="-11" max="11" :value="store.currentCapo" @input="($event) => {
            store.transpose = $event.target.value - store.originalCapo;
          }">
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import '../styles/mixins.scss';

@include transition-slide-and-fade;

#plus91-sheet-popup {
  @include popup;
}

.transpose-range-container {
  margin-top: 1rem;

  input[type="range"] {
    width: 100%;
  }
}
</style>