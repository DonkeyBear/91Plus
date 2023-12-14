<script setup>
import { useStore } from '../store';
import ToolbarIcon from './ToolbarIcon.vue';
import SheetPopup from './SheetPopup.vue';
import FontSizePopup from './FontSizePopup.vue';
import SettingsPopup from './SettingsPopup.vue';
import MenuPopup from './MenuPopup.vue';

const store = useStore();

const props = defineProps({
  active: Boolean
});
</script>

<template>
  <Transition name="slide">
    <div id="plus91-footer" v-show="active">
      <div class="footer-container">
        <ToolbarIcon
          icon="music-note-beamed"
          stroke=".05rem"
          :active="store.isPopupShow.sheet"
          @click="store.openPopup('sheet')"
        />
        <ToolbarIcon
          icon="type"
          stroke=".05rem"
          :active="store.isPopupShow.font"
          @click="store.openPopup('font')"
        />
        <ToolbarIcon
          icon="gear-wide-connected"
          :active="store.isPopupShow.settings"
          @click="store.openPopup('settings')"
        />
        <ToolbarIcon
          icon="list"
          stroke=".05rem"
          :active="store.isPopupShow.menu"
          @click="store.openPopup('menu')"
        />
        <!-- Popups -->
        <SheetPopup />
        <FontSizePopup />
        <SettingsPopup />
        <MenuPopup />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import '../styles/mixins.scss';

@include transition-slide(down);

#plus91-footer {
  @include toolbar;
  bottom: 0;
}

.footer-container {
  @include toolbar-container;
  border-radius: 1rem 1rem 0 0;
  padding-bottom: .75rem;
}
</style>