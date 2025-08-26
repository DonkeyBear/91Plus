<script setup>
import { useStore } from '../store';
import ToolbarIcon from './ToolbarIcon.vue';
import SheetPopup from './SheetPopup.vue';
import ChordPopup from './ChordPopup.vue';
import FontSizePopup from './FontSizePopup.vue';
import SettingsPopup from './SettingsPopup.vue';
import MenuPopup from './MenuPopup.vue';
import HotkeyPopup from './HotkeyPopup.vue';
import CollectionPopup from './CollectionPopup.vue';

const store = useStore();

const props = defineProps({
  active: Boolean
});
</script>

<template>
  <Transition name="slide">
    <div id="plus91-footer" v-show="props.active">
      <div class="footer-container">
        <ToolbarIcon
          :icon="store.isCurrentSheetCollected ? 'star-fill' : 'star'"
          text="收藏"
          :class="{ collected: store.isCurrentSheetCollected }"
          @click="store.toggleCollected"
        />
        <ToolbarIcon
          icon="music-note-beamed"
          text="譜面"
          stroke=".05rem"
          :active="store.isPopupShow.sheet"
          @click="store.togglePopup('sheet')"
        />
        <ToolbarIcon
          icon="table"
          text="和弦"
          :active="store.isPopupShow.chord"
          @click="store.togglePopup('chord')"
        />
        <ToolbarIcon
          icon="type"
          text="字型"
          stroke=".05rem"
          :active="store.isPopupShow.font"
          @click="store.togglePopup('font')"
        />
        <ToolbarIcon
          icon="gear-wide-connected"
          text="設定"
          :active="store.isPopupShow.settings"
          @click="store.togglePopup('settings')"
        />
        <ToolbarIcon
          icon="list"
          text="其他"
          stroke=".05rem"
          :active="store.isPopupShow.menu"
          @click="store.togglePopup('menu')"
        />
        <!-- Popups -->
        <SheetPopup />
        <ChordPopup />
        <FontSizePopup />
        <SettingsPopup />
        <MenuPopup />
        <HotkeyPopup />
        <CollectionPopup />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import '../styles/mixins.scss';
@import '../styles/variables.scss';

.collected {
  color: $primary-color;
}

@include transition-slide(down);

#plus91-footer {
  @include toolbar;
  bottom: 0;
}

.footer-container {
  @include toolbar-container;

  @include breakpoint-large {
    border-radius: 1rem 1rem 0 0;
  }

  padding-bottom: .75rem;
  border-top: 1px solid $toolbar-border-color;
}
</style>