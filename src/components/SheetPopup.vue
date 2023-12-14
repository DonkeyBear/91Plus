<script setup>
import { useStore } from '../store';
import BootstrapIcon from './BootstrapIcon.vue';
import ToolbarIcon from './ToolbarIcon.vue';

const store = useStore();
</script>

<template>
  <Transition name="slide-and-fade">
    <div id="plus91-sheet-popup" v-show="store.isPopupShow.sheet">
      <div class="sheet-popup-container">
        <div class="transpose-button-group">
          <button class="capo-button decrease" @click="() => { store.plusTranspose(-1) }">
            <BootstrapIcon icon="caret-left-fill" color="#444" />
          </button>
          <button class="capo-button info" @click="() => { store.transpose = 0 }">
            CAPO：<span class="text-capo">{{ store.currentCapo }}</span>
            (<span class="text-key" v-html="store.currentKey"></span>)
          </button>
          <button class="capo-button increase" @click="() => { store.plusTranspose(1) }">
            <BootstrapIcon icon="caret-right-fill" color="#444" />
          </button>
        </div>
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
  input[type="range"] {
    width: 100%;
  }
}

.transpose-button-group {
  display: flex;
  margin-bottom: 1rem;


  .capo-button {
    $button-padding: 1rem;
    border: 0;
    background: transparent;

    &.info {
      flex-grow: 1;
      color: #444;
    }

    &.increase {
      padding-left: $button-padding;
    }

    &.decrease {
      padding-right: $button-padding;
    }
  }
}
</style>