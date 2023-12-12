<script setup>
import { useStore } from '../store';
import ToolbarIcon from './ToolbarIcon.vue';

const store = useStore();
</script>

<template>
  <Transition name="slide-and-fade">
    <div id="plus91-font-popup" v-show="store.isPopupShow.font">
      <div class="font-popup-container">
        <div class="font-button-group">
          <button class="capo-button decrease" @click="() => { store.fontSizeDelta-- }">
            <ToolbarIcon icon="arrow_left" color="black" />
          </button>
          <button class="capo-button info" @click="() => { store.fontSizeDelta = 0 }">
            {{ store.originalFontSize + store.fontSizeDelta }}px
          </button>
          <button class="capo-button increase" @click="() => { store.fontSizeDelta++ }">
            <ToolbarIcon icon="arrow_right" color="black" />
          </button>
        </div>
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

.font-button-group {
  display: flex;

  .capo-button {
    $button-padding: 1rem;
    border: 0;
    background: transparent;

    &.info {
      flex-grow: 1;
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