<script setup>
import { switchInstrument } from '../modules/utils'
import { useStore } from '../store'
import AdjustWidget from './AdjustWidget.vue'

const store = useStore()
</script>

<template>
  <Transition name="slide-and-fade">
    <div v-show="store.isPopupShow.sheet" id="plus91-sheet-popup">
      <div class="sheet-popup-container">
        <AdjustWidget
          :onclick-left="() => { store.plusTranspose(-1) }"
          :onclick-middle="() => { store.transpose = 0 }"
          :onclick-right="() => { store.plusTranspose(1) }"
        >
          CAPO：<span class="text-capo">{{ store.currentCapo }}</span>
          (<span class="text-key" v-html="store.currentKey" />)
        </AdjustWidget>
        <div class="transpose-range-container">
          <input
            type="range" min="-11" max="11" :value="store.currentCapo" @input="($event) => {
              store.transpose = $event.target.value - store.originalCapo;
            }"
          >
        </div>
        <div class="instrument-select-container">
          <button class="instrument-select-button" @click="() => { switchInstrument('') }">
            無
          </button>
          <button class="instrument-select-button" @click="() => { switchInstrument('guitar') }">
            吉他
          </button>
          <button class="instrument-select-button" @click="() => { switchInstrument('ukulele') }">
            烏克莉莉
          </button>
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

  input[type='range'] {
    width: 100%;
  }
}

.instrument-select-container {
  display: flex;
  border: 1px solid lightgray;
  border-radius: 0.25rem;
  margin-top: 1rem;
  background: white;

  .instrument-select-button {
    width: calc(100% / 3);
    border: 0;
    border-right: 1px solid lightgray;
    background: transparent;
    color: #666;
    padding: 0.5rem;
    font-size: 0.65rem;
    font-weight: bold;
    cursor: pointer !important;

    &:last-child {
      border: 0;
      border-radius: 0 0.25rem 0.25rem 0;
    }

    &:first-child {
      border-radius: 0.25rem 0 0 0.25rem;
    }

    &:hover {
      background: whitesmoke;
    }
  }
}
</style>
