<script setup>
import { useStore } from '../store';
import MenuButton from './MenuButton.vue';

const store = useStore();
</script>

<template>
  <Transition name="slide-and-fade">
    <div id="plus91-menu-popup" v-show="store.isPopupShow.menu">
      <div class="menu-popup-container">
        <MenuButton icon="keyboard" name="快捷鍵" color="gray" />
        <MenuButton icon="info" name="使用說明" color="gray" />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import '../styles/mixins.scss';

@include transition-slide-and-fade;

#plus91-menu-popup {
  @include popup;

  .menu-popup-container {
    display: flex;
    justify-content: space-around;
  }
}
</style>