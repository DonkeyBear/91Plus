<script setup>
import html2canvas from 'html2canvas'
import MenuButton from '@/components/common/MenuButton.vue'
import PopupBase from '@/components/common/PopupBase.vue'
import ChordSheetDocument from '@/modules/ChordSheetDocument'
import { useStore } from '@/store'

const store = useStore()

const BUTTON_COLOR = '#555'

function captureAsImage() {
  const content = document.querySelector('section.content')
  html2canvas(content).then((canvas) => {
    const newWindow = window.open()
    newWindow.document.write(`<img src="${canvas.toDataURL()}" />`)
  })
}

function searchOnYoutube() {
  const chordSheetDocument = new ChordSheetDocument()
  const title = chordSheetDocument.getTitle()
  const artist = chordSheetDocument.getSinger()
  const url = `https://www.youtube.com/results?search_query=${title}+${artist}`
  window.open(url, '_blank').focus()
}

function goToGithubPage() {
  const url = 'https://github.com/DonkeyBear/91Plus/blob/main/README.md'
  window.open(url, '_blank').focus()
}
</script>

<template>
  <PopupBase id="plus91-menu-popup" v-model="store.isPopupShow.menu">
    <div class="menu-popup-container">
      <MenuButton icon="keyboard" name="快捷鍵" :color="BUTTON_COLOR" @click="() => { store.togglePopup('hotkey') }" />
      <MenuButton icon="file-earmark-image" name="擷取為圖片" :color="BUTTON_COLOR" @click="captureAsImage" />
      <MenuButton icon="youtube" name="搜尋 YouTube" :color="BUTTON_COLOR" @click="searchOnYoutube" />
      <MenuButton icon="github" name="關於 91 Plus" :color="BUTTON_COLOR" @click="goToGithubPage" />
    </div>
  </PopupBase>
</template>

<style scoped lang="scss">
#plus91-menu-popup {
  .menu-popup-container {
    display: flex;
    justify-content: space-around;
  }
}
</style>
