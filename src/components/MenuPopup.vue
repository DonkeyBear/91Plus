<script setup>
import { useStore } from '../store';
import MenuButton from './MenuButton.vue';
import ChordSheetDocument from '../modules/ChordSheetDocument';

const store = useStore();

const searchOnYoutube = () => {
  const chordSheetDocument = new ChordSheetDocument();
  const title = chordSheetDocument.getTitle();
  const artist = chordSheetDocument.getSinger();
  const url = `https://www.youtube.com/results?search_query=${title}+${artist}`;
  window.open(url, '_blank').focus();
};

const goToGithubPage = () => {
  const url = 'https://github.com/DonkeyBear/91Plus/blob/main/README.md';
  window.open(url, '_blank').focus();
};
</script>

<template>
  <Transition name="slide-and-fade">
    <div id="plus91-menu-popup" v-show="store.isPopupShow.menu">
      <div class="menu-popup-container">
        <MenuButton icon="keyboard" name="快捷鍵" color="#555" @click="() => { store.togglePopup('hotkey') }" />
        <MenuButton icon="youtube" name="搜尋 YouTube" color="#555" @click="searchOnYoutube" />
        <MenuButton icon="github" name="關於 91 Plus" color="#555" @click="goToGithubPage" />
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