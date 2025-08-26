<script setup>
import { useStore } from '../store';
import MenuButton from './MenuButton.vue';
import ChordSheetDocument from '../modules/ChordSheetDocument';
import html2canvas from 'html2canvas';

const store = useStore();

const BUTTON_COLOR = '#555';

const captureAsImage = () => {
  const content = document.querySelector('section.content');
  html2canvas(content).then((canvas) => {
    const newWindow = window.open();
    newWindow.document.write(`<img src="${canvas.toDataURL()}" />`);
  });
};

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
        <MenuButton icon="star" name="我的收藏" :color="BUTTON_COLOR" @click="() => { store.togglePopup('collection') }" />
        <MenuButton icon="keyboard" name="快捷鍵" :color="BUTTON_COLOR" @click="() => { store.togglePopup('hotkey') }" />
        <MenuButton icon="file-earmark-image" name="擷取為圖片" :color="BUTTON_COLOR" @click="captureAsImage" />
        <MenuButton icon="youtube" name="搜尋 YouTube" :color="BUTTON_COLOR" @click="searchOnYoutube" />
        <MenuButton icon="github" name="關於 91 Plus" :color="BUTTON_COLOR" @click="goToGithubPage" />
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