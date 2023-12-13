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
}

const goToGithubPage = () => {
  const url = 'https://github.com/DonkeyBear/91Plus/blob/main/README.md';
  window.open(url, '_blank').focus();
}
</script>

<template>
  <Transition name="slide-and-fade">
    <div id="plus91-menu-popup" v-show="store.isPopupShow.menu">
      <div class="menu-popup-container">
        <!-- <MenuButton icon="keyboard" name="快捷鍵" color="gray" /> -->
        <MenuButton icon="video_library" name="搜尋 YouTube" color="gray" @click="searchOnYoutube" />
        <MenuButton icon="info" name="關於 91 Plus" color="gray" @click="goToGithubPage" />
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